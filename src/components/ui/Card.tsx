import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function Card({ title, description, href, icon }: CardProps) {
  const content = (
    <div className="rounded-xl bg-warm-50 border border-warm-100 p-6 h-full">
      {icon && <div className="mb-4 text-sage-500">{icon}</div>}
      <h3 className="font-serif text-xl text-stone-200 mb-2">{title}</h3>
      <p className="text-stone-400 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:shadow-md transition-shadow duration-200">
        {content}
      </Link>
    );
  }

  return content;
}
