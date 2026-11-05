import { useState } from 'react'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import {
  createMockSignup,
  type PracticeSignupProfile,
  type ProfessionalSignupProfile,
  type SignupCredentials,
  type SignupInput,
  type SignupRole,
} from '../../services/mockSignupApi'
import AccountCredentialsForm from './AccountCredentialsForm'
import SignupChoice from './SignupChoice'
import PracticeSignupForm from './PracticeSignupForm'
import ProfessionalSignupForm from './ProfessionalSignupForm'
import { signupCopy, type SignupLanguage } from './signupCopy'
import './signup.css'

type SignupPageProps = {
  language: SignupLanguage
}

type SignupStep = 'choice' | 'credentials' | 'profile'
type SignupStatus = 'idle' | 'submitting' | 'success' | 'error'

function SignupPage({ language }: SignupPageProps) {
  const copy = signupCopy[language]
  const [step, setStep] = useState<SignupStep>('choice')
  const [role, setRole] = useState<SignupRole | null>(null)
  const [credentials, setCredentials] = useState<SignupCredentials | null>(null)
  const [status, setStatus] = useState<SignupStatus>('idle')
  const [submittedEmail, setSubmittedEmail] = useState('')

  function chooseRole(nextRole: SignupRole) {
    setRole(nextRole)
    setStep('credentials')
  }

  function continueToProfile(nextCredentials: SignupCredentials) {
    setCredentials(nextCredentials)
    setStatus('idle')
    setStep('profile')
  }

  async function handleSignup(input: SignupInput) {
    setStatus('submitting')
    try {
      const result = await createMockSignup(input)
      setSubmittedEmail(result.email)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function submitProfessionalProfile(profile: ProfessionalSignupProfile) {
    if (credentials) void handleSignup({ ...credentials, ...profile, role: 'professional' })
  }

  function submitPracticeProfile(profile: PracticeSignupProfile) {
    if (credentials) void handleSignup({ ...credentials, ...profile, role: 'practice' })
  }

  function backToCredentials() {
    setStatus('idle')
    setStep('credentials')
  }

  function startOver() {
    setStep('choice')
    setRole(null)
    setCredentials(null)
    setStatus('idle')
    setSubmittedEmail('')
  }

  return (
    <section className="signup-section" id="aanmelden">
      <div className="container signup-layout">
        <div className="signup-intro">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2>{copy.heading}</h2>
          <p>{copy.intro}</p>
          <div className="signup-reassurance">
            <ShieldCheck size={18} />
            <span>{copy.reassurance}</span>
          </div>
        </div>
        <div className="signup-panel">
          {status === 'success' ? (
            <div className="signup-success" role="status">
              <span className="signup-success-icon">
                <CheckCircle2 size={28} />
              </span>
              <h3>{copy.successTitle}</h3>
              <p>
                {copy.successIntro} <strong>{submittedEmail}</strong>.
              </p>
              <p className="signup-mock-note">{copy.successNote}</p>
              <button className="signup-back" type="button" onClick={startOver}>
                {copy.startOver}
              </button>
            </div>
          ) : (
            <>
              {status === 'error' && (
                <p className="signup-error" role="alert">
                  {copy.error}
                </p>
              )}
              {step === 'choice' ? (
                <SignupChoice copy={copy} onChoose={chooseRole} />
              ) : step === 'credentials' && role ? (
                <AccountCredentialsForm
                  copy={copy}
                  initialValues={credentials ?? { email: '', password: '' }}
                  onBack={startOver}
                  onContinue={continueToProfile}
                />
              ) : step === 'profile' && role === 'professional' && credentials ? (
                <ProfessionalSignupForm
                  copy={copy}
                  email={credentials.email}
                  isSubmitting={status === 'submitting'}
                  onBack={backToCredentials}
                  onSubmit={submitProfessionalProfile}
                />
              ) : step === 'profile' && role === 'practice' && credentials ? (
                <PracticeSignupForm
                  copy={copy}
                  email={credentials.email}
                  isSubmitting={status === 'submitting'}
                  onBack={backToCredentials}
                  onSubmit={submitPracticeProfile}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default SignupPage
