import type { LinkProps } from "next/link";
import Link from "next/link";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonClassName =
  "rounded-full border-2 border-sky-500 bg-white px-4 py-2 transition-all hover:bg-sky-100 duration-200 m-1";

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`${ButtonClassName} ${className}`} {...props}>
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
    <Link {...props} className={`${ButtonClassName} ${className}`}>
      {children}
    </Link>
  );
}
Button.Link = LinkButton;

export default Button;
