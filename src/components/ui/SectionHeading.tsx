interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="font-serif text-3xl md:text-4xl text-stone-200">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-stone-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
