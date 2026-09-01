import { Instrument_Sans, Parkinsans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";
import "./site.css";

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Mobilité durable pour entreprises et salariés — BeeToGreen",
  description:
    "BeeToGreen — Marketplace mobilité durable. Vélos d'entreprise, forfait mobilité durable, solutions clés en main.",
  openGraph: {
    title: "BeeToGreen — Sustainable mobility marketplace",
    description:
      "Company bikes, sustainable mobility allowance, and turnkey solutions for employers and employees.",
    url: "https://beetogreen.com",
    siteName: "BeeToGreen",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="top" className={`${parkinsans.variable} ${instrumentSans.variable}`}>
      <body>
        <AppProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
