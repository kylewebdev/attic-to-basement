import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700",
  secondary:
    "border-2 border-sage-500 text-sage-300 hover:bg-sage-50 active:bg-sage-100",
  ghost:
    "text-sage-300 hover:text-sage-400 hover:bg-sage-50",
};

export default function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const styles = [
    "inline-flex items-center justify-center",
    "px-6 py-3 rounded-lg",
    "font-sans font-semibold text-sm",
    "transition-colors duration-200",
    "min-h-11 min-w-11", // 44px touch target
    variantStyles[variant],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
