import type { LinkProps } from "next/link";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonClassName =
  "rounded-xl border-2 border-sky-700 bg-sky-700 px-4 py-4 m-1 text-white font-semibold text-lg";

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={twMerge(ButtonClassName, className)} {...props}>
      {children}
    </button>
  );
}

type LinkButtonProps = LinkProps & {
  className?: string;
  children?: React.ReactNode;
};
function LinkButton({ children, className, ...props }: LinkButtonProps) {
  return (
    <Link {...props} className={twMerge(ButtonClassName, className)}>
      {children}
    </Link>
  );
}
Button.Link = LinkButton;

export default Button;
