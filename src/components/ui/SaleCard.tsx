import type { Sale } from "@/lib/data/sales";

interface SaleCardProps {
    sale: Sale;
}

export default function SaleCard({ sale }: SaleCardProps) {
    return (
        <div className="sale-card-glow relative overflow-hidden rounded-xl bg-bg-card border border-sage-500/20 p-6">
            {/* Decorative gradient + dot pattern on the right */}
            <div
                className="pointer-events-none absolute inset-y-0 right-0 w-1/2"
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sage-50" />
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "14px 14px",
                    }}
                />
            </div>

            {/* Card content */}
            <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-xl text-text-heading">
                        {sale.title}
                    </h3>
                </div>
                <p className="text-sage-300 font-semibold text-sm mb-1">
                    {sale.dates}
                </p>
                <p className="text-text-secondary text-sm mb-4">{sale.area}</p>
                {sale.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {sale.categories.map((cat) => (
                            <span
                                key={cat}
                                className="text-xs bg-sage-50/30 text-sage-300 px-2 py-1 rounded-full border border-sage-200/30"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                )}
                {(sale.externalUrlNet || sale.externalUrlOrg) && (
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {sale.externalUrlNet && (
                            <a
                                href={sale.externalUrlNet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 border-sage-500 text-sage-300 hover:bg-bg-alt active:bg-sage-100 font-sans font-semibold text-sm transition-colors duration-200"
                            >
                                Photos on EstateSales.NET
                            </a>
                        )}
                        {sale.externalUrlOrg && (
                            <a
                                href={sale.externalUrlOrg}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 border-sage-500 text-sage-300 hover:bg-bg-alt active:bg-sage-100 font-sans font-semibold text-sm transition-colors duration-200"
                            >
                                Photos on EstateSales.ORG
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
