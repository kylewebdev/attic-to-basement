interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  rating,
}: TestimonialCardProps) {
  return (
    <blockquote className="rounded-xl bg-bg-card border border-border-default p-6">
      {rating && (
        <div className="flex gap-1 mb-3" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={i < rating ? "text-gold-400" : "text-border-default"}
              aria-hidden="true"
            >
              ★
            </span>
          ))}
        </div>
      )}
      <p className="text-text-body leading-relaxed italic mb-4">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="text-sm text-text-secondary">
        <cite className="not-italic font-semibold text-text-heading">{name}</cite>
        {" — "}
        {location}
      </footer>
    </blockquote>
  );
}
