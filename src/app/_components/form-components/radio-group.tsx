import { ForwardedRef, forwardRef } from "react";

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
} & Omit<React.HTMLProps<HTMLInputElement>, "type">;

const Radio = forwardRef(function RadioInput(
  { label, ...props }: RadioProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <label className="label justify-start">
      <input ref={ref} type="radio" className="radio" {...props} />
      <span className="ml-2">{label}</span>
    </label>
  );
});

type RadioGroupProps = {
  name: string;
  align?: "horizontal" | "vertical";
  options: RadioProps[];
};

const RadioGroup = ({ name, align, options }: RadioGroupProps) => {
  return (
    <div className={align == "horizontal" ? "flex" : ""}>
      {options.map((option, index) => (
        <Radio key={index} name={name} {...option} />
      ))}
    </div>
  );
};

export default RadioGroup;
