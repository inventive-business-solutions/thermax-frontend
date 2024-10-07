import { GetProps, Input } from "antd"
import { Control, Controller } from "react-hook-form"

interface PasswordProps extends GetProps<typeof Input.Password> {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  placeholder?: string
}

export default function CustomPasswordInput({ control, name, label, placeholder, ...props }: PasswordProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="text-sm font-semibold">
            {label}
          </label>
          <Input.Password {...field} {...props} placeholder={placeholder} status={fieldState.error && "error"} />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
