import { createSign, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VehicleInput = {
  brand: string;
  model: string;
  ageYears: number;
  colour: string;
  registrationNumber: string;
};

type ApplicationInput = {
  fullName: string;
  mobile: string;
  businessName: string;
  area: string;
  vehicles: VehicleInput[];
};

function isText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;
}

function base64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

async function getGoogleAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) throw new Error("GOOGLE_SHEETS_NOT_CONFIGURED");

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: issuedAt,
    exp: issuedAt + 3600,
  }));
  const unsigned = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const assertion = `${unsigned}.${signer.sign(privateKey, "base64url")}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("GOOGLE_AUTH_FAILED");
  const token = await response.json() as { access_token?: string };
  if (!token.access_token) throw new Error("GOOGLE_AUTH_FAILED");
  return token.access_token;
}

function validateApplication(value: unknown): ApplicationInput | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;
  if (!isText(candidate.fullName, 120) || !isText(candidate.mobile, 24) || !/^\+?[0-9 ()-]{10,20}$/.test(candidate.mobile.trim())) return null;
  if (!isText(candidate.businessName, 160) || !isText(candidate.area, 120)) return null;
  if (!Array.isArray(candidate.vehicles) || candidate.vehicles.length < 1 || candidate.vehicles.length > 20) return null;

  const vehicles: VehicleInput[] = [];
  for (const item of candidate.vehicles) {
    if (!item || typeof item !== "object") return null;
    const vehicle = item as Record<string, unknown>;
    if (!isText(vehicle.brand, 80) || !isText(vehicle.model, 100) || !isText(vehicle.colour, 40)) return null;
    if (!Number.isInteger(vehicle.ageYears) || Number(vehicle.ageYears) < 0 || Number(vehicle.ageYears) > 40) return null;
    if (!isText(vehicle.registrationNumber, 24) || !/^[A-Z0-9 -]{6,24}$/i.test(vehicle.registrationNumber.trim())) return null;
    vehicles.push({
      brand: vehicle.brand.trim(),
      model: vehicle.model.trim(),
      ageYears: Number(vehicle.ageYears),
      colour: vehicle.colour.trim(),
      registrationNumber: vehicle.registrationNumber.trim().replace(/\s+/g, " ").toUpperCase(),
    });
  }
  const registrationNumbers = vehicles.map((vehicle) => vehicle.registrationNumber);
  if (new Set(registrationNumbers).size !== registrationNumbers.length) return null;
  return {
    fullName: candidate.fullName.trim(),
    mobile: candidate.mobile.trim(),
    businessName: candidate.businessName.trim(),
    area: candidate.area.trim().split(",")[0].trim(),
    vehicles,
  };
}

export async function POST(request: Request) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    return NextResponse.json({ message: "Fleet partner submissions are not configured yet." }, { status: 503 });
  }

  let application: ApplicationInput | null;
  try {
    application = validateApplication(await request.json());
  } catch {
    return NextResponse.json({ message: "Please submit valid partner and vehicle details." }, { status: 400 });
  }
  if (!application) return NextResponse.json({ message: "Please submit valid partner and vehicle details." }, { status: 400 });

  try {
    const applicationId = randomUUID();
    const submittedAt = new Date().toISOString();
    const values = application.vehicles.map((vehicle) => [
      applicationId,
      submittedAt,
      application.fullName,
      application.mobile,
      application.businessName,
      "Hyderabad",
      application.area,
      vehicle.brand,
      vehicle.model,
      vehicle.ageYears,
      vehicle.colour,
      vehicle.registrationNumber,
      "PENDING_REVIEW",
    ]);
    const tab = process.env.GOOGLE_SHEETS_TAB || "Partner Applications";
    const range = encodeURIComponent(`${tab}!A:M`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${await getGoogleAccessToken()}`, "Content-Type": "application/json" },
      body: JSON.stringify({ majorDimension: "ROWS", values }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("SHEETS_APPEND_FAILED");
    return NextResponse.json({ message: "Partner application received.", applicationId }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "GOOGLE_SHEETS_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Fleet partner submissions are not configured yet." }, { status: 503 });
    }
    return NextResponse.json({ message: "We could not save your application right now. Please try again." }, { status: 502 });
  }
}
