import type { Sale } from "@/lib/data/sales";

interface SaleCardProps {
  sale: Sale;
}

export default function SaleCard({ sale }: SaleCardProps) {
  return (
    <div className="rounded-xl bg-warm-50 border border-warm-100 p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-serif text-xl text-stone-800">{sale.title}</h3>
      </div>
      <p className="text-sage-600 font-semibold text-sm mb-1">{sale.dates}</p>
      <p className="text-stone-500 text-sm mb-4">{sale.area}</p>
      {sale.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {sale.categories.map((cat) => (
            <span key={cat} className="text-xs bg-sage-50 text-sage-600 px-2 py-1 rounded-full border border-sage-100">
              {cat}
            </span>
          ))}
        </div>
      )}
      {sale.externalUrl && (
        <a href={sale.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-sage-600 hover:text-sage-700 font-semibold transition-colors">
          View on EstateSales.net
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
}
