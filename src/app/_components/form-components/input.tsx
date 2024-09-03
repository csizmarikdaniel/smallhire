import { type ForwardedRef, forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef(function InputInput(
  { label, error, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text text-lg">{label}</span>
      </div>
      <input ref={ref} {...props} className="input input-bordered" />
      {error && <span className="label text-red-500">{error}</span>}
    </label>
  );
});

export default Input;
