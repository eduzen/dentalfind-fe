import type { Coordinates } from '../../services/location'

export type Language = 'en' | 'nl' | 'es'

export type OpportunityRole = 'dentalHygienist' | 'dentalAssistant' | 'dentist'

export type Opportunity = {
  id: string
  role: OpportunityRole
  clinic: string
  area: string
  coordinates: Coordinates
  type: 'temporary' | 'permanent'
  time: Record<Language, string>
  rate: Record<Language, string>
  color: string
  initials: string
}

export const opportunities: Opportunity[] = [
  {
    id: 'de-jordaan-hygienist',
    role: 'dentalHygienist',
    clinic: 'Tandartspraktijk De Jordaan',
    area: 'Amsterdam-West',
    coordinates: { latitude: 52.374, longitude: 4.881 },
    type: 'temporary',
    time: { nl: '08:30 – 17:00', en: '08:30 – 17:00', es: '08:30 – 17:00' },
    rate: { nl: '€ 55 – 65 / uur', en: '€ 55 – 65 / hour', es: '€ 55 – 65 / hora' },
    color: 'mint',
    initials: 'DJ',
  },
  {
    id: 'studio-dental-assistant',
    role: 'dentalAssistant',
    clinic: 'Studio Dental Noord',
    area: 'Amsterdam-Noord',
    coordinates: { latitude: 52.401, longitude: 4.919 },
    type: 'permanent',
    time: {
      nl: '32 – 40 uur per week',
      en: '32 – 40 hours per week',
      es: '32 – 40 horas por semana',
    },
    rate: {
      nl: '€ 2.650 – 3.250 / maand',
      en: '€ 2,650 – 3,250 / month',
      es: '€ 2.650 – 3.250 / mes',
    },
    color: 'peach',
    initials: 'SD',
  },
  {
    id: 'kleine-wetering-dentist',
    role: 'dentist',
    clinic: 'De Kleine Wetering',
    area: 'Amsterdam-Zuid',
    coordinates: { latitude: 52.353, longitude: 4.89 },
    type: 'temporary',
    time: { nl: '09:00 – 18:00', en: '09:00 – 18:00', es: '09:00 – 18:00' },
    rate: { nl: '€ 600 – 700 / dag', en: '€ 600 – 700 / day', es: '€ 600 – 700 / día' },
    color: 'lavender',
    initials: 'KW',
  },
]

export const opportunityCopy = {
  en: {
    roles: {
      dentalHygienist: 'Dental hygienist',
      dentalAssistant: 'Dental assistant',
      dentist: 'Dentist',
    },
    eyebrow: 'YOUR NEXT STEP IN DENTAL CARE',
    title: 'Find work that feels right.',
    intro:
      'Explore dental practices, flexible shifts and permanent roles. Find a place where you can make a difference.',
    demo: 'Demo listings — these opportunities are examples, not live vacancies.',
    search: 'Role, practice or keyword',
    location: 'City or area',
    type: 'Employment type',
    all: 'All opportunities',
    temporary: 'Temporary',
    permanent: 'Permanent',
    saved: 'Saved only',
    save: 'Save opportunity',
    unsave: 'Remove saved opportunity',
    view: 'Join to connect',
    results: 'opportunities found',
    empty: 'No opportunities match your search.',
    hint: 'Try a different keyword, location or employment type.',
    reset: 'Clear filters',
  },
  nl: {
    roles: {
      dentalHygienist: 'Mondhygiënist',
      dentalAssistant: 'Tandartsassistent',
      dentist: 'Tandarts',
    },
    eyebrow: 'JOUW VOLGENDE STAP IN DE MONDZORG',
    title: 'Vind werk dat bij je past.',
    intro:
      'Ontdek tandartspraktijken, flexibele diensten en vaste banen. Vind een plek waar jij het verschil maakt.',
    demo: 'Demo-aanbod — deze kansen zijn voorbeelden, geen actuele vacatures.',
    search: 'Functie, praktijk of trefwoord',
    location: 'Stad of regio',
    type: 'Dienstverband',
    all: 'Alle kansen',
    temporary: 'Waarneming',
    permanent: 'Vaste baan',
    saved: 'Alleen bewaard',
    save: 'Bewaar vacature',
    unsave: 'Verwijder bewaarde vacature',
    view: 'Meld je aan om te verbinden',
    results: 'kansen gevonden',
    empty: 'Geen kansen gevonden voor je zoekopdracht.',
    hint: 'Probeer een ander trefwoord, een andere locatie of een ander dienstverband.',
    reset: 'Wis filters',
  },
  es: {
    roles: {
      dentalHygienist: 'Higienista dental',
      dentalAssistant: 'Auxiliar dental',
      dentist: 'Dentista',
    },
    eyebrow: 'TU PRÓXIMO PASO EN SALUD DENTAL',
    title: 'Encuentra un trabajo a tu medida.',
    intro:
      'Explora clínicas dentales, turnos flexibles y puestos fijos. Encuentra un lugar donde marcar la diferencia.',
    demo: 'Ofertas de demostración: son ejemplos, no vacantes reales.',
    search: 'Puesto, clínica o palabra clave',
    location: 'Ciudad o zona',
    type: 'Tipo de contrato',
    all: 'Todas las oportunidades',
    temporary: 'Temporal',
    permanent: 'Fijo',
    saved: 'Solo guardadas',
    save: 'Guardar oferta',
    unsave: 'Eliminar oferta guardada',
    view: 'Regístrate para conectar',
    results: 'oportunidades encontradas',
    empty: 'No hay ofertas que coincidan con tu búsqueda.',
    hint: 'Prueba otra palabra clave, ubicación o tipo de contrato.',
    reset: 'Borrar filtros',
  },
}

export function filterOpportunities(
  items: Opportunity[],
  query: string,
  location: string,
  type: string,
  language: Language,
) {
  const copy = opportunityCopy[language]

  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

  return items.filter(
    (item) =>
      normalize(`${copy.roles[item.role]} ${item.clinic} ${item.area} ${copy[item.type]}`).includes(
        normalize(query),
      ) &&
      normalize(item.area).includes(normalize(location)) &&
      (type === 'all' || item.type === type),
  )
}
