import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ProfessionalSignupProfile } from '../../services/mockSignupApi'
import SignupField from './SignupField'
import type { SignupCopy } from './signupCopy'

type ProfessionalSignupFormProps = {
  copy: SignupCopy
  email: string
  isSubmitting: boolean
  onBack: () => void
  onSubmit: (profile: ProfessionalSignupProfile) => void
}

function ProfessionalSignupForm({
  copy,
  email,
  isSubmitting,
  onBack,
  onSubmit,
}: ProfessionalSignupFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit({
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
      profession: String(formData.get('profession')),
      city: String(formData.get('city')),
    })
  }

  return (
    <div className="signup-form-view">
      <button className="signup-back" type="button" onClick={onBack}>
        <ArrowLeft size={15} />
        {copy.backToCredentials}
      </button>
      <div className="signup-panel-heading">
        <span className="signup-step">03 / 03</span>
        <h3>{copy.workFormTitle}</h3>
      </div>
      <p className="signup-account-email">
        <span>{copy.accountEmail}:</span> <strong>{email}</strong>
      </p>
      <form className="signup-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <div className="signup-fields-grid">
          <SignupField
            id="professional-first-name"
            name="firstName"
            label={copy.fields.firstName}
            placeholder={copy.placeholders.firstName}
            autoComplete="given-name"
            required
          />
          <SignupField
            id="professional-last-name"
            name="lastName"
            label={copy.fields.lastName}
            placeholder={copy.placeholders.lastName}
            autoComplete="family-name"
            required
          />
          <label className="signup-field" htmlFor="professional-profession">
            <span>{copy.fields.profession}</span>
            <select
              id="professional-profession"
              name="profession"
              className="signup-select"
              defaultValue=""
              required
            >
              <option value="" disabled>
                {copy.placeholders.profession}
              </option>
              {copy.professions.map((profession) => (
                <option key={profession} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </label>
          <SignupField
            id="professional-city"
            name="city"
            label={copy.fields.city}
            placeholder={copy.placeholders.city}
            autoComplete="address-level2"
            required
          />
        </div>
        <label className="signup-consent">
          <input type="checkbox" name="consent" required />
          <span>{copy.consent}</span>
        </label>
        <button className="button button-dark signup-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? copy.submitting : copy.submit}
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  )
}

export default ProfessionalSignupForm
