import type { LinkProps } from "next/link";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonClassName = (size?: "sm" | "md" | "lg") =>
  twMerge(
    "rounded-xl border-2 border-sky-700 bg-sky-700 m-1 text-white font-semibold",
    size === "lg"
      ? "px-4 py-4 text-lg"
      : size === "sm"
        ? "px-2 text-sm rounded-lg"
        : "px-4 py-2 text-md",
  );

export function Button({ size, children, className, ...props }: ButtonProps) {
  return (
    <button className={twMerge(ButtonClassName(size), className)} {...props}>
      {children}
    </button>
  );
}

type LinkButtonProps = LinkProps & {
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
};
function LinkButton({ size, children, className, ...props }: LinkButtonProps) {
  return (
    <Link {...props} className={twMerge(ButtonClassName(size), className)}>
      {children}
    </Link>
  );
}
Button.Link = LinkButton;

export default Button;
