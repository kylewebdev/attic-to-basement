import { Libre_Baskerville, Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { getLocalBusinessSchema } from "@/lib/schema";
import type { Metadata } from "next";

const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-libre-baskerville",
    display: "swap",
});

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    variable: "--font-nunito-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "ABE Liquidators | Estate Sales & Liquidation Services",
        template: "%s",
    },
    description:
        "Full-service estate sales, buyouts, cleanouts, and appraisals across Northern California.",
    metadataBase: new URL("https://abeliquidators.com"),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${libreBaskerville.variable} ${nunitoSans.variable}`}
        >
            <body>
                <JsonLd data={getLocalBusinessSchema()} />
                <SmoothScroll>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </SmoothScroll>
            </body>
        </html>
    );
}
