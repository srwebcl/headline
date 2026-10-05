import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";

type Variant = "solid" | "outline" | "text";

const base =
  "group inline-flex items-center gap-3 whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.12em] transition-[background-color,color,border-color,transform] duration-300 ease-out active:translate-y-px";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-accent-fg px-7 py-4 hover:bg-fg hover:text-bg",
  outline: "border border-fg/80 text-fg px-7 py-[15px] hover:bg-fg hover:text-bg",
  text: "text-fg py-2 border-b border-line hover:border-accent hover:text-accent",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRight
        aria-hidden
        size={16}
        weight="regular"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </Link>
  );
}
