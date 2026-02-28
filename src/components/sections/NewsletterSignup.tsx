export default function NewsletterSignup() {
    return (
        <section className="relative py-12 md:py-16 overflow-hidden bg-sage-700">
            {/* Topographic contour lines */}
            <svg
                className="pointer-events-none absolute inset-0 w-full h-full"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 1200 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Contour line group — flowing organic curves */}
                <g
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-sage-400"
                    opacity="0.18"
                >
                    {/* Outer contours — large sweeping curves */}
                    <path d="M-100,320 Q150,280 350,300 T700,260 T1050,290 T1400,250" />
                    <path d="M-100,290 Q200,240 400,270 T750,220 T1100,260 T1400,210" />
                    <path d="M-100,260 Q180,200 420,240 T780,180 T1080,230 T1400,170" />

                    {/* Mid contours */}
                    <path d="M-100,230 Q220,170 450,210 T800,150 T1120,200 T1400,140" />
                    <path d="M-100,200 Q250,140 480,185 T820,120 T1100,170 T1400,110" />
                    <path d="M-100,170 Q200,110 460,155 T790,90 T1080,145 T1400,80" />

                    {/* Inner contours — tighter curves */}
                    <path d="M-100,140 Q280,80 500,130 T830,65 T1130,120 T1400,55" />
                    <path d="M-100,110 Q300,50 520,100 T850,40 T1150,95 T1400,30" />
                </g>

                {/* Second cluster offset — creates depth */}
                <g
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="text-sage-300"
                    opacity="0.1"
                >
                    <path d="M-50,350 Q300,310 500,340 T900,290 T1300,330" />
                    <path d="M-50,80 Q250,30 500,70 T850,20 T1300,60" />
                    <path d="M100,380 Q350,340 550,365 T950,320 T1300,355" />
                    <path d="M100,50 Q300,10 550,45 T900,-5 T1300,35" />
                </g>
            </svg>

            {/* Subtle radial glow behind text */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(58, 77, 45, 1) 0%, rgba(58, 77, 45, 0.95) 30%, transparent 65%)",
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-white">
                    Never Miss a Sale
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                    Subscribe to get notified whenever we post a new sale.
                    You&apos;ll receive sale dates, location details — so you
                    can plan ahead and never miss the good stuff.
                </p>
                <div className="mt-8">
                    <a
                        href="https://estatesales.org/subscriber/company/add/23935"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-sans font-semibold text-sm transition-colors duration-200 min-h-11 min-w-11 bg-white text-[#3a4d2d] hover:bg-white/85 active:bg-white/75"
                    >
                        Get Subscribed
                    </a>
                </div>
            </div>
        </section>
    );
}
