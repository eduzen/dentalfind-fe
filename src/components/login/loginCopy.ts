import type { SignupLanguage } from '../signup/signupCopy'

type LoginCopy = {
  eyebrow: string
  heading: string
  intro: string
  reassurance: string
  title: string
  hint: string
  email: string
  password: string
  submit: string
  submitting: string
  noAccount: string
  signUp: string
  back: string
  successTitle: string
  successMessage: string
  error: string
}

export const loginCopy: Record<SignupLanguage, LoginCopy> = {
  nl: {
    eyebrow: 'FIJN DAT JE ER WEER BENT',
    heading: 'Welkom terug.',
    intro: 'Log in op je Dentalfind-account en ga verder met jouw volgende stap in de mondzorg.',
    reassurance: 'Je gegevens zijn veilig bij ons.',
    title: 'Inloggen',
    hint: 'Vul je e-mailadres en wachtwoord in.',
    email: 'E-mailadres',
    password: 'Wachtwoord',
    submit: 'Inloggen',
    submitting: 'Bezig met inloggen…',
    noAccount: 'Nog geen account?',
    signUp: 'Meld je gratis aan',
    back: 'Terug naar Dentalfind',
    successTitle: 'Inlogformulier verzonden',
    successMessage: 'Dit is een demo. Inloggen is nog niet gekoppeld aan een accountservice.',
    error: 'Vul een geldig e-mailadres en je wachtwoord in.',
  },
  en: {
    eyebrow: 'GOOD TO HAVE YOU BACK',
    heading: 'Welcome back.',
    intro: 'Log in to your Dentalfind account and continue with your next step in dental care.',
    reassurance: 'Your information is safe with us.',
    title: 'Log in',
    hint: 'Enter your email address and password.',
    email: 'Email address',
    password: 'Password',
    submit: 'Log in',
    submitting: 'Logging in…',
    noAccount: "Don't have an account yet?",
    signUp: 'Join for free',
    back: 'Back to Dentalfind',
    successTitle: 'Login form submitted',
    successMessage: 'This is a demo. Login is not yet connected to an account service.',
    error: 'Enter a valid email address and your password.',
  },
  es: {
    eyebrow: 'NOS ALEGRA VERTE DE NUEVO',
    heading: 'Te damos la bienvenida.',
    intro: 'Inicia sesión en tu cuenta de Dentalfind y continúa tu próximo paso en salud dental.',
    reassurance: 'Tus datos están seguros con nosotros.',
    title: 'Iniciar sesión',
    hint: 'Introduce tu correo electrónico y contraseña.',
    email: 'Correo electrónico',
    password: 'Contraseña',
    submit: 'Iniciar sesión',
    submitting: 'Iniciando sesión…',
    noAccount: '¿Aún no tienes una cuenta?',
    signUp: 'Regístrate gratis',
    back: 'Volver a Dentalfind',
    successTitle: 'Formulario enviado',
    successMessage:
      'Esto es una demostración. El inicio de sesión aún no está conectado a un servicio.',
    error: 'Introduce un correo electrónico válido y tu contraseña.',
  },
}
