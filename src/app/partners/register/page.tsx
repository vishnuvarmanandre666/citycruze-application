"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

type PartnerDetails = {
  fullName: string;
  mobile: string;
  businessName: string;
  area: string;
};

type VehicleDetails = {
  id: number;
  brand: string;
  model: string;
  age: string;
  colour: string;
  registration: string;
};

const emptyVehicle = (id: number): VehicleDetails => ({
  id,
  brand: "",
  model: "",
  age: "",
  colour: "",
  registration: "",
});

export default function PartnerRegistrationPage() {
  const [partner, setPartner] = useState<PartnerDetails>({ fullName: "", mobile: "", businessName: "", area: "" });
  const [vehicles, setVehicles] = useState<VehicleDetails[]>([emptyVehicle(1)]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  function updatePartner(field: keyof PartnerDetails, value: string) {
    setPartner((current) => ({ ...current, [field]: value }));
  }

  function updateVehicle(id: number, field: keyof Omit<VehicleDetails, "id">, value: string) {
    setVehicles((current) => current.map((vehicle) => vehicle.id === id ? { ...vehicle, [field]: value } : vehicle));
  }

  function addVehicle() {
    setVehicles((current) => [...current, emptyVehicle(Math.max(...current.map((vehicle) => vehicle.id)) + 1)]);
  }

  function removeVehicle(id: number) {
    setVehicles((current) => current.length > 1 ? current.filter((vehicle) => vehicle.id !== id) : current);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviewOpen(true);
    requestAnimationFrame(() => document.getElementById("registration-review")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function submitApplication() {
    setSubmitting(true);
    setSubmissionError("");
    try {
      const response = await fetch("/api/fleet-partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: partner.fullName,
          mobile: partner.mobile,
          businessName: partner.businessName,
          area: partner.area,
          vehicles: vehicles.map(({ brand, model, age, colour, registration }) => ({ brand, model, ageYears: Number(age), colour, registrationNumber: registration })),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not submit your application. Please try again.");
      setApplicationId(result.applicationId);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "Could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }


  return <main className="partner-registration">
    <nav className="nav wrap registration-nav">
      <Link className="brand" href="/" aria-label="CityCruze home"><span className="brand-mark">C</span><span>CITY<span className="orange">CRUZE</span><small>EVERY JOURNEY. YOUR WAY.</small></span></Link>
      <Link className="nav-cta" href="/#partner">Back to CityCruze <span>↗</span></Link>
    </nav>

    <header className="registration-heading wrap">
      <div className="eyebrow dark"><i /> FLEET PARTNER ONBOARDING</div>
      <h1>Bring your fleet<br />to <em>CityCruze.</em></h1>
      <p>Share your business details once, then add each vehicle you want to list.</p>
    </header>

    <form className="registration-form wrap" onSubmit={handleSubmit}>
      <section className="registration-card" aria-labelledby="partner-details-heading">
        <div className="registration-section-heading"><span className="registration-step">01</span><div><h2 id="partner-details-heading">Partner details</h2><p>Entered once for your fleet.</p></div></div>
        <div className="registration-fields">
          <label>Full Name<input autoComplete="name" required value={partner.fullName} onChange={(event) => updatePartner("fullName", event.target.value)} placeholder="Your full name" /></label>
          <label>Mobile Number<input autoComplete="tel" type="tel" inputMode="tel" required value={partner.mobile} onChange={(event) => updatePartner("mobile", event.target.value)} placeholder="e.g. +91 98765 43210" /></label>
          <label>Business Name<input autoComplete="organization" required value={partner.businessName} onChange={(event) => updatePartner("businessName", event.target.value)} placeholder="Registered or trading name" /></label>
          <label>Fleet Partner Area<input required value={partner.area} onChange={(event) => updatePartner("area", event.target.value)} placeholder="e.g. Banjara Hills, Hyderabad" /></label>
        </div>
      </section>

      <section className="registration-card vehicles-card" aria-labelledby="vehicle-details-heading">
        <div className="registration-section-heading"><span className="registration-step">02</span><div><h2 id="vehicle-details-heading">Vehicle details</h2><p>Add the information for each car in your fleet.</p></div></div>
        <div className="vehicle-forms">
          {vehicles.map((vehicle, index) => <fieldset className="vehicle-form" key={vehicle.id}>
            <legend><span>Vehicle {String(index + 1).padStart(2, "0")}</span>{vehicles.length > 1 && <button className="remove-vehicle" type="button" onClick={() => removeVehicle(vehicle.id)} aria-label={`Remove vehicle ${index + 1}`}>Remove</button>}</legend>
            <div className="registration-fields">
              <label>Vehicle Brand<input required value={vehicle.brand} onChange={(event) => updateVehicle(vehicle.id, "brand", event.target.value)} placeholder="e.g. Hyundai" /></label>
              <label>Vehicle Model<input required value={vehicle.model} onChange={(event) => updateVehicle(vehicle.id, "model", event.target.value)} placeholder="e.g. Creta" /></label>
              <label>Vehicle Age (Years)<input required type="number" min="0" step="1" value={vehicle.age} onChange={(event) => updateVehicle(vehicle.id, "age", event.target.value)} placeholder="e.g. 3" /></label>
              <label>Vehicle Colour<input required value={vehicle.colour} onChange={(event) => updateVehicle(vehicle.id, "colour", event.target.value)} placeholder="e.g. White" /></label>
              <label className="registration-number-field">Vehicle Registration Number<input required autoCapitalize="characters" value={vehicle.registration} onChange={(event) => updateVehicle(vehicle.id, "registration", event.target.value.toUpperCase())} placeholder="e.g. TS 08 AB 1234" /></label>
            </div>
          </fieldset>)}
        </div>
        <button className="add-vehicle-button" type="button" onClick={addVehicle}><span aria-hidden="true">+</span> Add Another Vehicle</button>
      </section>

      <div className="registration-actions"><p>Your partner and vehicle details will be added to our fleet application sheet.</p><button className="registration-submit" type="submit">Review registration <span aria-hidden="true">→</span></button></div>
    </form>

    {reviewOpen && <section className="registration-review wrap" id="registration-review" aria-live="polite">
      <div className="eyebrow dark"><i /> {applicationId ? "APPLICATION RECEIVED" : "FINAL REVIEW"}</div>
      <h2>{applicationId ? "Thanks for applying." : "Review your details"}</h2>
      <p className="review-note">{applicationId ? `Your application has been added to the fleet sheet. Reference: ${applicationId}` : "Check your details before sending your partner application."}</p>
      <div className="review-grid"><div><span>PARTNER</span><strong>{partner.fullName}</strong><p>{partner.businessName} · {partner.mobile}</p><p>{partner.area}</p></div><div><span>VEHICLES</span><strong>{vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"}</strong>{vehicles.map((vehicle, index) => <p key={vehicle.id}>{String(index + 1).padStart(2, "0")} · {vehicle.brand} {vehicle.model} · {vehicle.registration}</p>)}</div></div>
      {submissionError && <p className="review-note" role="alert">{submissionError}</p>}
      {!applicationId && <div className="registration-actions"><button type="button" className="edit-registration" onClick={() => { setReviewOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit details</button><button type="button" className="registration-submit" disabled={submitting} onClick={submitApplication}>{submitting ? "Saving…" : "Submit application"} <span aria-hidden="true">→</span></button></div>}
    </section>}
  </main>;
}
