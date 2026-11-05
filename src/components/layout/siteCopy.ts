import type { Language } from '../opportunities/opportunities'

type SiteTranslation = {
  jobs: string
  how: string
  practices: string
  login: string
  join: string
  footerTagline: string
  homeLabel: string
  languageLabel: string
  menuLabel: string
}

export const siteCopy: Record<Language, SiteTranslation> = {
  nl: {
    jobs: 'Vacatures',
    how: 'Hoe het werkt',
    practices: 'Voor praktijken',
    login: 'Inloggen',
    join: 'Gratis aanmelden',
    footerTagline: 'Een plek voor iedereen in de mondzorg.',
    homeLabel: 'Dentalfind startpagina',
    languageLabel: 'Taal',
    menuLabel: 'Menu',
  },
  en: {
    jobs: 'Opportunities',
    how: 'How it works',
    practices: 'For practices',
    login: 'Log in',
    join: 'Join for free',
    footerTagline: 'A place for everyone in dental care.',
    homeLabel: 'Dentalfind home',
    languageLabel: 'Language',
    menuLabel: 'Menu',
  },
  es: {
    jobs: 'Oportunidades',
    how: 'Cómo funciona',
    practices: 'Para clínicas',
    login: 'Iniciar sesión',
    join: 'Regístrate gratis',
    footerTagline: 'Un lugar para todos los profesionales de la salud dental.',
    homeLabel: 'Inicio de Dentalfind',
    languageLabel: 'Idioma',
    menuLabel: 'Menú',
  },
}
