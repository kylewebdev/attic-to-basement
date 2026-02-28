import { Libre_Baskerville, Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ThemeScript from "@/components/layout/ThemeScript";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import JsonLd from "@/components/seo/JsonLd";
import { getLocalBusinessSchema } from "@/lib/schema";
import {
    GoogleTagManagerHead,
    GoogleTagManagerBody,
} from "@/components/layout/GoogleTagManager";
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
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "48x48" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
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
            suppressHydrationWarning
        >
            <head>
                <ThemeScript />
            </head>
            <body>
                <ThemeProvider>
                    <GoogleTagManagerBody />
                    <JsonLd data={getLocalBusinessSchema()} />
                    <SmoothScroll>
                        <Header />
                        <main id="main-content">{children}</main>
                        <Footer />
                    </SmoothScroll>
                    <GoogleTagManagerHead />
                </ThemeProvider>
            </body>
        </html>
    );
}
