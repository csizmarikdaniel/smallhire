import { type ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef(function InputInput(
  { label, error, className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <label className={twMerge("form-control", className)}>
      <div className={twMerge(label ? "label" : "hidden", "pb-1")}>
        <span className="label-text text-lg">{label}</span>
      </div>
      <input
        ref={ref}
        {...props}
        className="input rounded-xl border-2 border-sky-700 focus:border-sky-700 focus:outline-none"
      />
      {error && <span className="label text-red-500">{error}</span>}
    </label>
  );
});

export default Input;
