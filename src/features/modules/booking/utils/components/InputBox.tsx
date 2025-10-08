import { useField } from "formik";

interface IInputBoxInterface {
  label?: string;
  placeholder?: string;
  type?: string;
  name: string;   // make required
  className?: string;
}

export const InputBox: React.FC<IInputBoxInterface> = ({
  label,
  placeholder = "Enter text...",
  type = "text",
  name,
  className
}) => {
  const [field, meta] = useField(name);

  return (
    <div
      className={`${
        className ? className : "grid grid-cols-[120px_1fr]"
      } items-start w-full max-w-md`}
    >
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-app-small font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="w-full">
        <input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          className={`
            w-full
            px-4
            py-2
            border
            rounded-md
            focus:shadow-app-input
            focus:outline-none
            transition
            placeholder:text-sm
            text-sm
            sm:text-app-base
            ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}
          `}
        />
        {meta.touched && meta.error && (
          <p className="mt-1 text-xs text-red-500">{meta.error}</p>
        )}
      </div>
    </div>
  );
};
