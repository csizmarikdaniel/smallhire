import type { LinkProps } from "next/link";
import Link from "next/link";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

type LinkButtonProps = LinkProps & {
  className?: string;
  children?: React.ReactNode;
};
function LinkButton({ children, className, ...props }: LinkButtonProps) {
  return (
    <Link {...props} className={`btn ${className}`}>
      {children}
    </Link>
  );
}
Button.Link = LinkButton;

export default Button;
