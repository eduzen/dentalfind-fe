import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { SignupCredentials } from '../../services/mockSignupApi'
import SignupField from './SignupField'
import type { SignupCopy } from './signupCopy'

type AccountCredentialsFormProps = {
  copy: SignupCopy
  initialValues: SignupCredentials
  onBack: () => void
  onContinue: (credentials: SignupCredentials) => void
}

function AccountCredentialsForm({
  copy,
  initialValues,
  onBack,
  onContinue,
}: AccountCredentialsFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onContinue({
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    })
  }

  return (
    <div className="signup-form-view">
      <button className="signup-back" type="button" onClick={onBack}>
        <ArrowLeft size={15} />
        {copy.backToChoice}
      </button>
      <div className="signup-panel-heading">
        <span className="signup-step">02 / 03</span>
        <h3>{copy.credentialsTitle}</h3>
        <p>{copy.credentialsHint}</p>
      </div>
      <form className="signup-form signup-credentials-form" onSubmit={handleSubmit}>
        <div className="signup-fields-grid">
          <SignupField
            id="signup-email"
            name="email"
            label={copy.fields.email}
            placeholder={copy.placeholders.email}
            type="email"
            autoComplete="email"
            defaultValue={initialValues.email}
            required
          />
          <SignupField
            id="signup-password"
            name="password"
            label={copy.fields.password}
            type="password"
            autoComplete="new-password"
            minLength={8}
            hint={copy.passwordHint}
            defaultValue={initialValues.password}
            required
          />
        </div>
        <button className="button button-dark signup-submit" type="submit">
          {copy.continue}
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  )
}

export default AccountCredentialsForm
