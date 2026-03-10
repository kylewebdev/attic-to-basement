import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function Card({ title, description, href, icon }: CardProps) {
  const content = (
    <div className="rounded-xl bg-bg-card border border-border-default p-6 h-full">
      {icon && <div className="mb-4 text-sage-500">{icon}</div>}
      <h3 className="font-serif text-xl text-text-heading mb-2">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block rounded-xl hover:shadow-md focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 transition-shadow duration-200">
        {content}
      </Link>
    );
  }

  return content;
}
