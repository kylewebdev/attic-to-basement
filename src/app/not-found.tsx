import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Page Not Found | ABE Liquidators",
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-warm-white">
            <div className="max-w-lg mx-auto px-4 text-center py-20">
                <p className="text-8xl font-serif text-sage-200 mb-4">404</p>
                <h1 className="font-serif text-3xl md:text-4xl text-stone-200 mb-4">
                    Page not found
                </h1>
                <p className="text-stone-400 mb-10 leading-relaxed">
                    The page you are looking for may have been moved or no
                    longer exists. Let us help you find what you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href="/" variant="primary">
                        Back to Home
                    </Button>
                    <Button href="/contact" variant="secondary">
                        Contact Us
                    </Button>
                </div>
            </div>
        </div>
    );
}
