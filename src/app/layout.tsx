import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CityCruze — Every Journey. Your Way.",
  description: "Discover self-drive cars for your next journey in Hyderabad.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
