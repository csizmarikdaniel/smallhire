import { type ForwardedRef, forwardRef } from "react";

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
} & Omit<React.HTMLProps<HTMLInputElement>, "type">;

const Radio = forwardRef(function RadioInput(
  { label, ...props }: RadioProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <label className="label justify-start">
      <input
        ref={ref}
        type="radio"
        className="radio checked:bg-sky-700"
        {...props}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
});

export default Radio;
