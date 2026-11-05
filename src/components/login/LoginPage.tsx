import { useState, type MouseEvent, type ReactElement } from 'react'
import { ShieldCheck } from 'lucide-react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import type { SignupLanguage } from '../signup/signupCopy'
import { loginCopy } from './loginCopy'
import LoginForm from './LoginForm'
import '../signup/signup.css'
import './login.css'

type LoginPageProps = {
  language: SignupLanguage
  onLanguageChange: (language: SignupLanguage) => void
  navigate: BrowserNavigate
}

type LoginCredentials = { email: string; password: string }

function LoginPage({ language, onLanguageChange, navigate }: LoginPageProps): ReactElement {
  const copy = loginCopy[language]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(_credentials: LoginCredentials): Promise<void> {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  function navigateHome(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    navigate('/')
  }

  function navigateSignup(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    navigate('/sign-up')
  }

  function submitLogin(credentials: LoginCredentials): void {
    void handleSubmit(credentials)
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
              {copy.back}
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
        <div className="container signup-layout login-layout">
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
            {submitted ? (
              <div className="signup-success" role="status">
                <h3>{copy.successTitle}</h3>
                <p>{copy.successMessage}</p>
              </div>
            ) : (
              <LoginForm language={language} isSubmitting={isSubmitting} onSubmit={submitLogin} />
            )}
            <p className="login-signup-prompt">
              {copy.noAccount}{' '}
              <a href="/sign-up" onClick={navigateSignup}>
                {copy.signUp}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
