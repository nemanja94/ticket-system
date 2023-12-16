import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Otac i sin",
  description: "Pocetna strana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="layoutContainer">{children}</main>
      </body>
    </html>
  );
}
