import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal CRM - Legal Practice Management",
  description: "Premium CRM for lawyers and small legal firms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
