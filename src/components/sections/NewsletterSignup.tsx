export default function NewsletterSignup() {
    return (
        <section className="py-12 md:py-16 bg-bg-alt">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-text-heading">
                    Never Miss a Sale
                </h2>
                <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
                    Get notified about upcoming estate sales, interesting finds,
                    and sale day details.
                </p>
                <div className="mt-8">
                    <a
                        href="https://estatesales.org/subscriber/company/add/23935"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-sans font-semibold text-sm transition-colors duration-200 min-h-11 min-w-11 bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700"
                    >
                        Subscribe on EstateSales.org
                    </a>
                </div>
            </div>
        </section>
    );
}
