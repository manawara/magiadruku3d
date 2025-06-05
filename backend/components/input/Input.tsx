import { InputHTMLAttributes } from "react";

type InputType = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  type,
  name,
  placeholder,
  children,
  label,
  ...rest
}: InputType) => {
  return (
    <div className={`relative top-0 left-0 w-full group`}>
      <label htmlFor={name} className="text-sm pb-1 block">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className="outline-none px-4 py-2 text-sm font-thin rounded-sm placeholder:text-gray-500 text-gray-700 border-gray-100 w-full border"
        {...rest}
      />
      {children && (
        <div className="absolute top-1/2 -translate-y-1/2 right-2 group-focus-within:scale-110 duration-300 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

export default Input;
