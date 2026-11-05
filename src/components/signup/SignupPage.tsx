import { useEffect, useMemo, useState, type MouseEvent, type ReactElement } from 'react'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import {
  createMockSignup,
  type PracticeSignupProfile,
  type ProfessionalSignupProfile,
  type SignupCredentials,
  type SignupInput,
  type SignupRole,
} from '../../services/mockSignupApi'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import AccountCredentialsForm from './AccountCredentialsForm'
import SignupChoice from './SignupChoice'
import PracticeSignupForm from './PracticeSignupForm'
import ProfessionalSignupForm from './ProfessionalSignupForm'
import { signupCopy, type SignupLanguage } from './signupCopy'
import './signup.css'

type SignupPageProps = {
  language: SignupLanguage
  onLanguageChange: (language: SignupLanguage) => void
  pathname: string
  navigate: BrowserNavigate
}

type SignupStep = 'choice' | 'credentials' | 'profile'
type SignupStatus = 'idle' | 'submitting' | 'success' | 'error'
type SignupRoute = { role: SignupRole | null; step: SignupStep } | null

function getSignupRoute(pathname: string): SignupRoute {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  if (normalizedPath === '/sign-up') {
    return { role: null, step: 'choice' }
  }

  const match = normalizedPath.match(/^\/sign-up\/(work|practice)(?:\/(profile))?$/)
  if (!match) return null

  return {
    role: match[1] === 'work' ? 'professional' : 'practice',
    step: match[2] ? 'profile' : 'credentials',
  }
}

function rolePath(role: SignupRole, step: 'credentials' | 'profile'): string {
  const roleSlug = role === 'professional' ? 'work' : 'practice'
  return `/sign-up/${roleSlug}${step === 'profile' ? '/profile' : ''}`
}

function SignupPage({
  language,
  onLanguageChange,
  pathname,
  navigate,
}: SignupPageProps): ReactElement {
  const copy = signupCopy[language]
  const route = useMemo(() => getSignupRoute(pathname), [pathname])
  const [credentials, setCredentials] = useState<SignupCredentials | null>(null)
  const [status, setStatus] = useState<SignupStatus>('idle')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const step = route?.step === 'profile' && !credentials ? 'credentials' : route?.step

  useEffect(() => {
    if (!route) {
      navigate('/sign-up', { replace: true })
      return
    }

    if (route.step === 'profile' && !credentials && route.role) {
      navigate(rolePath(route.role, 'credentials'), { replace: true })
      return
    }

    let canonicalPath = '/sign-up'
    if (route.role) {
      const step = route.step === 'profile' ? 'profile' : 'credentials'
      canonicalPath = rolePath(route.role, step)
    }

    if (pathname !== canonicalPath) navigate(canonicalPath, { replace: true })
  }, [credentials, navigate, pathname, route])

  useEffect(() => {
    setStatus('idle')
    setSubmittedEmail('')
  }, [pathname])

  function chooseRole(role: SignupRole) {
    setCredentials(null)
    setStatus('idle')
    setSubmittedEmail('')
    navigate(rolePath(role, 'credentials'))
  }

  function continueToProfile(nextCredentials: SignupCredentials) {
    if (!route?.role) return
    setCredentials(nextCredentials)
    setStatus('idle')
    navigate(rolePath(route.role, 'profile'))
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

  function startOver() {
    setCredentials(null)
    setStatus('idle')
    setSubmittedEmail('')
    navigate('/sign-up')
  }

  function backToCredentials() {
    if (route?.role) navigate(rolePath(route.role, 'credentials'))
  }

  function navigateHome(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    navigate('/')
  }

  function renderSignupStep(): ReactElement | null {
    if (step === 'choice') {
      return <SignupChoice copy={copy} onChoose={chooseRole} />
    }

    if (step === 'credentials' && route?.role) {
      return (
        <AccountCredentialsForm
          copy={copy}
          initialValues={credentials ?? { email: '', password: '' }}
          onBack={startOver}
          onContinue={continueToProfile}
        />
      )
    }

    if (step !== 'profile' || !credentials) return null

    if (route?.role === 'professional') {
      return (
        <ProfessionalSignupForm
          copy={copy}
          email={credentials.email}
          isSubmitting={status === 'submitting'}
          onBack={backToCredentials}
          onSubmit={submitProfessionalProfile}
        />
      )
    }

    if (route?.role === 'practice') {
      return (
        <PracticeSignupForm
          copy={copy}
          email={credentials.email}
          isSubmitting={status === 'submitting'}
          onBack={backToCredentials}
          onSubmit={submitPracticeProfile}
        />
      )
    }

    return null
  }

  return (
    <main className="signup-page">
      <header className="signup-nav">
        <div className="container signup-nav-inner">
          <a className="brand" href="/" onClick={navigateHome} aria-label={copy.homeLabel}>
            <span className="brand-mark">
              <span />
            </span>
            dentalfind<span className="brand-dot">.</span>
          </a>
          <div className="signup-nav-actions">
            <a className="signup-page-home" href="/" onClick={navigateHome}>
              {copy.pageBack}
            </a>
            <select
              className="language-select"
              aria-label={copy.languageLabel}
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as SignupLanguage)}
            >
              <option value="nl">NL</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </div>
      </header>
      <section className="signup-section">
        <div className="container signup-layout">
          <div className="signup-intro">
            <span className="eyebrow">{copy.eyebrow}</span>
            <h1>{copy.heading}</h1>
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
                {renderSignupStep()}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignupPage
