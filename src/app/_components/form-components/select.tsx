import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  name: string;
  options: { label: string; value: string }[];
  error?: string;
};

const Select = forwardRef(function SelectField(
  { label, name, error, options, ...props }: SelectProps,
  ref: React.Ref<HTMLSelectElement>,
) {
  return (
    <label className="form-control">
      {label && (
        <div className="label">
          <span className="label-text text-lg">{label}</span>
        </div>
      )}
      <select
        ref={ref}
        name={name}
        {...props}
        className="select select-bordered"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="label text-red-500">{error}</span>}
    </label>
  );
});

export default Select;
