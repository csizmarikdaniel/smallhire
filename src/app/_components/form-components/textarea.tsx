import { type ForwardedRef, forwardRef } from "react";

export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
  };

const TextArea = forwardRef(function TextAreaInput(
  { label, error, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text text-lg">{label}</span>
      </div>
      <textarea
        ref={ref}
        {...props}
        className="textarea border-2 border-sky-500 focus:border-sky-700 focus:outline-none"
      />
      {error && <span className="label text-red-500">{error}</span>}
    </label>
  );
});

export default TextArea;
