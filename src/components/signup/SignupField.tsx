import type { ComponentProps } from 'react'

type SignupFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  id: string
  label: string
  hint?: string
}

function SignupField({ id, label, hint, ...inputProps }: SignupFieldProps) {
  return (
    <label className="signup-field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} {...inputProps} />
      {hint && <small>{hint}</small>}
    </label>
  )
}

export default SignupField
