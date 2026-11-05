import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { PracticeSignupProfile } from '../../services/mockSignupApi'
import SignupField from './SignupField'
import type { SignupCopy } from './signupCopy'

type PracticeSignupFormProps = {
  copy: SignupCopy
  email: string
  isSubmitting: boolean
  onBack: () => void
  onSubmit: (profile: PracticeSignupProfile) => void
}

function PracticeSignupForm({
  copy,
  email,
  isSubmitting,
  onBack,
  onSubmit,
}: PracticeSignupFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit({
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
      practiceName: String(formData.get('practiceName')),
      city: String(formData.get('city')),
      phone: String(formData.get('phone')),
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
        <h3>{copy.practiceFormTitle}</h3>
      </div>
      <p className="signup-account-email">
        <span>{copy.accountEmail}:</span> <strong>{email}</strong>
      </p>
      <form className="signup-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <div className="signup-fields-grid">
          <SignupField
            id="practice-first-name"
            name="firstName"
            label={copy.fields.firstName}
            placeholder={copy.placeholders.firstName}
            autoComplete="given-name"
            required
          />
          <SignupField
            id="practice-last-name"
            name="lastName"
            label={copy.fields.lastName}
            placeholder={copy.placeholders.lastName}
            autoComplete="family-name"
            required
          />
          <SignupField
            className="signup-field-wide"
            id="practice-name"
            name="practiceName"
            label={copy.fields.practiceName}
            placeholder={copy.placeholders.practiceName}
            autoComplete="organization"
            required
          />
          <SignupField
            id="practice-city"
            name="city"
            label={copy.fields.city}
            placeholder={copy.placeholders.city}
            autoComplete="address-level2"
            required
          />
          <SignupField
            id="practice-phone"
            name="phone"
            label={copy.fields.phone}
            placeholder={copy.placeholders.phone}
            type="tel"
            autoComplete="tel"
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

export default PracticeSignupForm
