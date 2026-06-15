import Link from "next/link";
import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "default" | "ghost";
type ButtonSize = "default" | "sm";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type AsLinkProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href">;
type AsButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

type GeniButtonProps = AsLinkProps | AsButtonProps;

function getStyles(variant: ButtonVariant, size: ButtonSize): React.CSSProperties {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    borderRadius: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: variant === "primary" ? 500 : 400,
    whiteSpace: "nowrap",
    transition: "all 0.18s ease",
    cursor: "pointer",
    textDecoration: "none",
    padding: size === "sm" ? "8px 12px" : "12px 18px",
    fontSize: size === "sm" ? "12.5px" : "14px",
  };

  if (variant === "primary") {
    return { ...base, background: "var(--accent)", color: "#0a0a0a", border: "1px solid var(--accent)" };
  }
  if (variant === "ghost") {
    return { ...base, background: "transparent", color: "var(--fg-dim)", border: "1px solid transparent", padding: size === "sm" ? "8px 0" : "12px 0" };
  }
  return { ...base, background: "transparent", color: "var(--fg)", border: "1px solid var(--line-strong)" };
}

export function GeniButton(props: GeniButtonProps) {
  const { variant = "default", size = "default", children, className, href, ...rest } = props;
  const styles = getStyles(variant, size);

  if (href !== undefined) {
    return (
      <Link href={href} style={styles} className={`geni-btn geni-btn--${variant} ${className ?? ""}`} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button style={styles} className={`geni-btn geni-btn--${variant} ${className ?? ""}`} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
