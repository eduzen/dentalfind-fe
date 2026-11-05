import { useState, type FormEvent, type ReactElement } from 'react'
import { z } from 'zod'
import type { SignupLanguage } from '../signup/signupCopy'
import { loginCopy } from './loginCopy'

type LoginFormProps = {
  language: SignupLanguage
  isSubmitting: boolean
  onSubmit: (credentials: LoginCredentials) => void
}

type LoginCredentials = {
  email: string
  password: string
}

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

function LoginForm({ language, isSubmitting, onSubmit }: LoginFormProps): ReactElement {
  const copy = loginCopy[language]
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const result = loginSchema.safeParse({
      email: data.get('email'),
      password: data.get('password'),
    })

    if (!result.success) {
      setError(copy.error)
      return
    }

    setError('')
    onSubmit(result.data)
  }

  return (
    <div className="signup-form-view">
      <div className="signup-panel-heading">
        <h3>{copy.title}</h3>
        <p>{copy.hint}</p>
      </div>
      <form className="signup-form login-form" onSubmit={handleSubmit} noValidate>
        <div className="signup-fields-grid">
          <label className="signup-field" htmlFor="login-email">
            <span>{copy.email}</span>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jij@voorbeeld.nl"
              required
            />
          </label>
          <label className="signup-field" htmlFor="login-password">
            <span>{copy.password}</span>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button-dark signup-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? copy.submitting : copy.submit}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
