import Button from "@/components/ui/Button";

type ColorScheme = "estate-sales" | "estate-liquidation" | "appraisals" | "our-promise" | "reviews";

interface HeroProps {
  title: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  colorScheme?: ColorScheme;
}

const colorSchemes: Record<ColorScheme, {
  gradient: string;
  blobs: Array<{ color: string; size: number; top?: string; bottom?: string; left?: string; right?: string; borderRadius: string }>;
}> = {
  "estate-sales": {
    gradient: "linear-gradient(135deg, var(--color-warm-white) 0%, var(--color-sage-50) 100%)",
    blobs: [
      { color: "var(--color-sage-200)", size: 380, top: "-80px", right: "-60px", borderRadius: "60% 40% 50% 70% / 50% 60% 40% 60%" },
      { color: "var(--color-warm-200)", size: 280, bottom: "-40px", left: "-50px", borderRadius: "40% 60% 70% 30% / 60% 40% 50% 60%" },
      { color: "var(--color-sage-100)", size: 200, top: "20%", left: "60%", borderRadius: "50% 60% 40% 70% / 40% 50% 60% 50%" },
    ],
  },
  "estate-liquidation": {
    gradient: "linear-gradient(150deg, var(--color-warm-white) 0%, var(--color-warm-100) 100%)",
    blobs: [
      { color: "var(--color-sage-100)", size: 350, top: "-70px", left: "-80px", borderRadius: "50% 60% 40% 70% / 60% 40% 60% 50%" },
      { color: "var(--color-gold-400)", size: 240, bottom: "-50px", right: "-40px", borderRadius: "60% 40% 50% 60% / 50% 60% 40% 70%" },
    ],
  },
  appraisals: {
    gradient: "linear-gradient(160deg, var(--color-warm-50) 0%, var(--color-sage-50) 100%)",
    blobs: [
      { color: "var(--color-sage-300)", size: 320, top: "-60px", right: "-70px", borderRadius: "45% 55% 60% 40% / 55% 45% 50% 60%" },
      { color: "var(--color-warm-200)", size: 300, bottom: "-80px", left: "-60px", borderRadius: "55% 45% 40% 60% / 50% 60% 55% 45%" },
      { color: "var(--color-sage-100)", size: 180, top: "30%", right: "20%", borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%" },
    ],
  },
  "our-promise": {
    gradient: "linear-gradient(140deg, var(--color-warm-white) 0%, var(--color-warm-50) 100%)",
    blobs: [
      { color: "var(--color-sage-200)", size: 360, bottom: "-60px", right: "-80px", borderRadius: "50% 60% 45% 55% / 55% 45% 60% 50%" },
      { color: "var(--color-warm-100)", size: 300, top: "-50px", left: "-40px", borderRadius: "45% 55% 50% 60% / 60% 40% 55% 45%" },
    ],
  },
  reviews: {
    gradient: "linear-gradient(130deg, var(--color-sage-50) 0%, var(--color-warm-white) 100%)",
    blobs: [
      { color: "var(--color-sage-100)", size: 340, top: "-70px", left: "-60px", borderRadius: "55% 45% 60% 40% / 45% 55% 40% 60%" },
      { color: "var(--color-gold-400)", size: 200, bottom: "-40px", right: "-50px", borderRadius: "40% 60% 45% 55% / 60% 40% 55% 45%" },
    ],
  },
};

function getBlobOpacity(color: string): number {
  if (color.includes("gold-400")) return 0.08;
  if (color.includes("sage-300")) return 0.15;
  if (color.includes("sage-200")) return 0.25;
  if (color.includes("sage-100")) return 0.2;
  if (color.includes("warm-200")) return 0.2;
  if (color.includes("warm-100")) return 0.25;
  return 0.2;
}

export default function Hero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  colorScheme,
}: HeroProps) {
  const scheme = colorScheme ? colorSchemes[colorScheme] : null;

  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-warm-white overflow-hidden"
      style={scheme ? { background: scheme.gradient } : undefined}
    >
      {scheme && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {scheme.blobs.map((blob, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: blob.size,
                height: blob.size,
                top: blob.top,
                bottom: blob.bottom,
                left: blob.left,
                right: blob.right,
                borderRadius: blob.borderRadius,
                backgroundColor: blob.color,
                opacity: getBlobOpacity(blob.color),
                filter: "blur(40px)",
              }}
            />
          ))}
        </div>
      )}
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {(primaryCTA || secondaryCTA) && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Button href={primaryCTA.href} variant="primary">
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button href={secondaryCTA.href} variant="secondary">
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
