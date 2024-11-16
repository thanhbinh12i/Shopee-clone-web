import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

export default function Input({ type, errorMessage, placeholder, className, name, register, rules, autoComplete,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <>
      <div className={className}>
        <input
          type={type}
          className={classNameInput}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...registerResult}
        />
        <div className={classNameError}>{errorMessage}</div>
      </div>
    </>
  )
}