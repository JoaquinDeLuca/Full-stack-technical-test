import { FieldValues, UseFormRegister, FieldPath } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Props<T extends FieldValues> {
  label: string;
  name: FieldPath<T>;
  type: string;
  description?: string;
  register: UseFormRegister<T>;
  errors: any;
  required: boolean;
  minLength?: number;
  maxLength: number;
  pattern?: {
    value: RegExp;
    message: string;
  };
}

export function Input<T extends FieldValues>({
  label,
  name,
  type,
  description,
  register,
  errors,
  required,
  minLength = 2,
  maxLength,
  pattern
}: Props<T>) {
  return (
    <>
      <div>
        <label htmlFor={name} className="block text-gray-800 font-semibold text-sm">
          {label}
        </label>
        <div className="mt-2">
          <input
            type={type}
            {...register(name, {
              required: {
                value: required,
                message: "Este campo es obligatorio.",
              },
              minLength: {
                value: minLength,
                message: `Ingrese al menos ${minLength} caracteres.`,
              },
              maxLength: {
                value: maxLength,
                message: `Ingrese un máximo de ${maxLength} caracteres.`,
              },
              ...(pattern && {
                pattern: {
                  value: pattern.value,
                  message: pattern.message,
                },
              }),
            })}
            className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
          />
        </div>
        {description && <label className="pt-1 block text-gray-500 text-sm">{description}</label>}
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="pt-1 text-red-600 text-sm">{message}</p>
        )}
      />
    </>
  );
}
