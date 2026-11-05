export type SignupLanguage = 'nl' | 'en' | 'es'

export type SignupCopy = {
  eyebrow: string
  heading: string
  intro: string
  reassurance: string
  chooseTitle: string
  chooseHint: string
  workTitle: string
  workDescription: string
  practiceTitle: string
  practiceDescription: string
  workAction: string
  practiceAction: string
  pageBack: string
  backToChoice: string
  backToCredentials: string
  credentialsTitle: string
  credentialsHint: string
  accountEmail: string
  continue: string
  workFormTitle: string
  practiceFormTitle: string
  fields: {
    firstName: string
    lastName: string
    email: string
    password: string
    profession: string
    city: string
    practiceName: string
    phone: string
  }
  placeholders: {
    firstName: string
    lastName: string
    email: string
    profession: string
    city: string
    practiceName: string
    phone: string
  }
  professions: string[]
  passwordHint: string
  consent: string
  submit: string
  submitting: string
  successTitle: string
  successIntro: string
  successNote: string
  startOver: string
  error: string
}

export const signupCopy: Record<SignupLanguage, SignupCopy> = {
  nl: {
    eyebrow: 'JOUW VOLGENDE STAP IN DE MONDZORG',
    heading: 'Aanmelden bij Dentalfind.',
    intro:
      'Meld je gratis aan. Kies eerst wat je zoekt, begin met je e-mailadres en wachtwoord en vul je profiel daarna aan.',
    reassurance: 'Gratis aanmelden, zonder verplichtingen.',
    chooseTitle: 'Waar ben je naar op zoek?',
    chooseHint: 'Kies de route die bij je past.',
    workTitle: 'Ik zoek werk',
    workDescription: 'Ik ben mondzorgprofessional en zoek passende vacatures.',
    practiceTitle: 'Ik zoek personeel',
    practiceDescription: 'Ik vertegenwoordig een praktijk en zoek personeel.',
    workAction: 'Verder als mondzorgprofessional',
    practiceAction: 'Verder als praktijk',
    pageBack: 'Terug naar Dentalfind',
    backToChoice: 'Andere route kiezen',
    backToCredentials: 'Terug naar je accountgegevens',
    credentialsTitle: 'Maak je account aan',
    credentialsHint: 'Begin met je e-mailadres en wachtwoord. Je profielgegevens vul je hierna in.',
    accountEmail: 'Account e-mailadres',
    continue: 'Verder',
    workFormTitle: 'Jouw professionele profiel',
    practiceFormTitle: 'Jouw praktijkprofiel',
    fields: {
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      email: 'E-mailadres',
      password: 'Wachtwoord',
      profession: 'Mijn beroep',
      city: 'Plaats of regio',
      practiceName: 'Naam van de praktijk',
      phone: 'Telefoonnummer (optioneel)',
    },
    placeholders: {
      firstName: 'Bijv. Sam',
      lastName: 'Bijv. de Vries',
      email: 'jij@voorbeeld.nl',
      profession: 'Kies je beroep',
      city: 'Bijv. Amsterdam',
      practiceName: 'Bijv. Tandartspraktijk De Jordaan',
      phone: '+31 6 12345678',
    },
    professions: ['Tandarts', 'Mondhygiënist', 'Tandartsassistent', 'Preventieassistent', 'Anders'],
    passwordHint: 'Minimaal 8 tekens.',
    consent: 'Door verder te gaan ga je akkoord met de voorwaarden en privacyverklaring.',
    submit: 'Maak mijn profiel aan',
    submitting: 'Even geduld…',
    successTitle: 'Je demo-aanmelding is gelukt!',
    successIntro: 'We hebben je gegevens ontvangen voor',
    successNote:
      'Dit is nog een prototype: er is geen account aangemaakt en er is geen e-mail verstuurd.',
    startOver: 'Opnieuw beginnen',
    error: 'Aanmelden lukte niet. Probeer het nog eens.',
  },
  en: {
    eyebrow: 'YOUR NEXT STEP IN DENTAL CARE',
    heading: 'Join Dentalfind.',
    intro:
      'Sign up for free. Choose what you are looking for, start with your email and password, and complete your profile next.',
    reassurance: 'Free to join, with no obligation.',
    chooseTitle: 'What are you looking for?',
    chooseHint: 'Choose the path that fits you.',
    workTitle: 'I’m looking for work',
    workDescription: 'I’m a dental professional looking for opportunities.',
    practiceTitle: 'I’m looking for staff',
    practiceDescription: 'I represent a practice looking for staff.',
    workAction: 'Continue as a dental professional',
    practiceAction: 'Continue as a practice',
    pageBack: 'Back to Dentalfind',
    backToChoice: 'Choose a different path',
    backToCredentials: 'Back to account details',
    credentialsTitle: 'Create your account',
    credentialsHint: 'Start with your email and password. You can add your profile details next.',
    accountEmail: 'Account email',
    continue: 'Continue',
    workFormTitle: 'Your professional profile',
    practiceFormTitle: 'Your practice profile',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      password: 'Password',
      profession: 'My profession',
      city: 'City or region',
      practiceName: 'Practice name',
      phone: 'Phone number (optional)',
    },
    placeholders: {
      firstName: 'e.g. Sam',
      lastName: 'e.g. Taylor',
      email: 'you@example.com',
      profession: 'Choose your profession',
      city: 'e.g. Amsterdam',
      practiceName: 'e.g. Dental Practice De Jordaan',
      phone: '+31 6 12345678',
    },
    professions: [
      'Dentist',
      'Dental hygienist',
      'Dental assistant',
      'Prevention assistant',
      'Other',
    ],
    passwordHint: 'At least 8 characters.',
    consent: 'By continuing, you agree to the terms and privacy policy.',
    submit: 'Create my profile',
    submitting: 'Please wait…',
    successTitle: 'Your demo signup was successful!',
    successIntro: 'We received your details for',
    successNote: 'This is still a prototype: no account was created and no email was sent.',
    startOver: 'Start over',
    error: 'Signup failed. Please try again.',
  },
  es: {
    eyebrow: 'TU PRÓXIMO PASO EN SALUD DENTAL',
    heading: 'Únete a Dentalfind.',
    intro:
      'Regístrate gratis. Elige lo que buscas, empieza con tu correo y contraseña y completa tu perfil después.',
    reassurance: 'Registro gratis y sin compromiso.',
    chooseTitle: '¿Qué estás buscando?',
    chooseHint: 'Elige la opción que mejor encaje contigo.',
    workTitle: 'Busco trabajo',
    workDescription: 'Soy profesional dental y busco oportunidades.',
    practiceTitle: 'Busco personal',
    practiceDescription: 'Represento una clínica que busca personal.',
    workAction: 'Continuar como profesional dental',
    practiceAction: 'Continuar como clínica',
    pageBack: 'Volver a Dentalfind',
    backToChoice: 'Elegir otra opción',
    backToCredentials: 'Volver a los datos de la cuenta',
    credentialsTitle: 'Crea tu cuenta',
    credentialsHint: 'Empieza con tu correo y contraseña. Después podrás completar tu perfil.',
    accountEmail: 'Correo de la cuenta',
    continue: 'Continuar',
    workFormTitle: 'Tu perfil profesional',
    practiceFormTitle: 'El perfil de tu clínica',
    fields: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electrónico',
      password: 'Contraseña',
      profession: 'Mi profesión',
      city: 'Ciudad o región',
      practiceName: 'Nombre de la clínica',
      phone: 'Teléfono (opcional)',
    },
    placeholders: {
      firstName: 'Por ejemplo, Sam',
      lastName: 'Por ejemplo, García',
      email: 'tu@ejemplo.com',
      profession: 'Elige tu profesión',
      city: 'Por ejemplo, Ámsterdam',
      practiceName: 'Por ejemplo, Clínica Dental De Jordaan',
      phone: '+31 6 12345678',
    },
    professions: [
      'Dentista',
      'Higienista dental',
      'Auxiliar dental',
      'Asistente de prevención',
      'Otro',
    ],
    passwordHint: 'Al menos 8 caracteres.',
    consent: 'Al continuar, aceptas las condiciones y la política de privacidad.',
    submit: 'Crear mi perfil',
    submitting: 'Un momento…',
    successTitle: '¡Tu registro de prueba se ha completado!',
    successIntro: 'Hemos recibido tus datos para',
    successNote:
      'Esto sigue siendo un prototipo: no se creó ninguna cuenta ni se envió ningún correo.',
    startOver: 'Empezar de nuevo',
    error: 'No se pudo completar el registro. Inténtalo de nuevo.',
  },
}
