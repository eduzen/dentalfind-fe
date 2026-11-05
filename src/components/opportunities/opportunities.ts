export type Language = 'en' | 'nl' | 'es'

export type Opportunity = {
  id: string
  role: string
  clinic: string
  area: string
  type: 'temporary' | 'permanent'
  time: string
  rate: string
  color: string
  initials: string
}

export const opportunities: Opportunity[] = [
  {
    id: 'de-jordaan-hygienist',
    role: 'Mondhygiënist',
    clinic: 'Tandartspraktijk De Jordaan',
    area: 'Amsterdam-West',
    type: 'temporary',
    time: '08:30 – 17:00',
    rate: '€ 55 – 65 / h',
    color: 'mint',
    initials: 'DJ',
  },
  {
    id: 'studio-dental-assistant',
    role: 'Tandartsassistent',
    clinic: 'Studio Dental Noord',
    area: 'Amsterdam-Noord',
    type: 'permanent',
    time: '32 – 40 h / week',
    rate: '€ 2.650 – 3.250 / month',
    color: 'peach',
    initials: 'SD',
  },
  {
    id: 'kleine-wetering-dentist',
    role: 'Tandarts',
    clinic: 'De Kleine Wetering',
    area: 'Amsterdam-Zuid',
    type: 'temporary',
    time: '09:00 – 18:00',
    rate: '€ 600 – 700 / day',
    color: 'lavender',
    initials: 'KW',
  },
]

export const opportunityCopy = {
  en: {
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
) {
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

  return items.filter(
    (item) =>
      normalize(`${item.role} ${item.clinic} ${item.area}`).includes(normalize(query)) &&
      normalize(item.area).includes(normalize(location)) &&
      (type === 'all' || item.type === type),
  )
}
