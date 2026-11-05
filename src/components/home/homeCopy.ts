import type { Language } from '../opportunities/opportunities'

type Translation = {
  eyebrow: string
  headline1: string
  headline2: string
  headline3: string
  lead: string
  work: string
  staff: string
  next: string
  good: string
  all: string
  search: string
  popular: string
  new: string
  fitting: string
  socialProofCount: string
  socialProofCaption: string
  imageAlt: string
  photoTitle: string
  photoCaption: string
  opportunitiesTitle: string
  opportunitiesCaption: string
  matchTitle: string
  matchCaption: string
  workTab: string
  staffTab: string
  workAvailability: string
  staffAvailability: string
  roleSearchPlaceholder: string
  staffSearchPlaceholder: string
  locationLabel: string
  allOpportunities: string
  allRoles: string
  emptyState: string
  trustSafeTitle: string
  trustSafeDescription: string
  trustControlTitle: string
  trustControlDescription: string
  trustQuickTitle: string
  trustQuickDescription: string
}

export const homeCopy: Record<Language, Translation> = {
  nl: {
    eyebrow: 'HET PLATFORM VOOR MONDZORG',
    headline1: 'De juiste match.',
    headline2: 'Een gezonde',
    headline3: 'glimlach verder.',
    lead: 'Vind werk dat bij je past, of de professional die jouw praktijk compleet maakt. De mondzorg begint hier.',
    work: 'Bekijk vacatures',
    staff: 'Personeel zoeken',
    next: 'Jouw volgende stap',
    good: 'Goed werk voelt goed.',
    all: 'Bekijk alle kansen',
    search: 'Zoek kansen',
    popular: 'Populair:',
    new: 'NIEUW OP DENTALFIND',
    fitting: 'Kansen die bij je passen',
    socialProofCount: '1.200+ mondzorgprofessionals',
    socialProofCaption: 'vinden hun plek via Dentalfind',
    imageAlt: 'Tandarts en patiënt in een moderne praktijk',
    photoTitle: 'Werk met een glimlach',
    photoCaption: 'Jouw volgende stap begint hier',
    opportunitiesTitle: 'Nieuwe kansen',
    opportunitiesCaption: 'Elke dag vers aanbod',
    matchTitle: 'Een match die klopt',
    matchCaption: 'Voor jou én de praktijk',
    workTab: 'Ik zoek werk',
    staffTab: 'Ik zoek personeel',
    workAvailability: '38 actuele kansen',
    staffAvailability: '124 professionals beschikbaar',
    roleSearchPlaceholder: 'Functie, praktijk of trefwoord',
    staffSearchPlaceholder: 'Zoek op functie of specialisme',
    locationLabel: 'Locatie',
    allOpportunities: 'Alle kansen',
    allRoles: 'Alle functies',
    emptyState: 'Geen kansen gevonden. Probeer een andere zoekterm.',
    trustSafeTitle: 'Veilig & betrouwbaar',
    trustSafeDescription: 'Geverifieerde praktijken',
    trustControlTitle: 'Jij houdt de regie',
    trustControlDescription: 'Transparant van begin tot eind',
    trustQuickTitle: 'Snel geregeld',
    trustQuickDescription: 'In een paar minuten aangemeld',
  },
  en: {
    eyebrow: 'THE DENTAL CARE PLATFORM',
    headline1: 'The right match.',
    headline2: 'A brighter',
    headline3: 'smile starts here.',
    lead: 'Find work that fits you, or the professional who completes your practice. Your next step in dental care starts here.',
    work: 'Browse jobs',
    staff: 'Find staff',
    next: 'YOUR NEXT STEP',
    good: 'Good work feels good.',
    all: 'Explore all opportunities',
    search: 'Search opportunities',
    popular: 'Popular:',
    new: 'NEW ON DENTALFIND',
    fitting: 'Opportunities picked for you',
    socialProofCount: '1,200+ dental professionals',
    socialProofCaption: 'find their place through Dentalfind',
    imageAlt: 'Dentist and patient in a modern practice',
    photoTitle: 'Work with a smile',
    photoCaption: 'Your next step starts here',
    opportunitiesTitle: 'New opportunities',
    opportunitiesCaption: 'Fresh opportunities every day',
    matchTitle: 'A match that feels right',
    matchCaption: 'For you and your practice',
    workTab: 'I’m looking for work',
    staffTab: 'I’m looking for staff',
    workAvailability: '38 current opportunities',
    staffAvailability: '124 professionals available',
    roleSearchPlaceholder: 'Role, practice or keyword',
    staffSearchPlaceholder: 'Search by role or specialty',
    locationLabel: 'Location',
    allOpportunities: 'All opportunities',
    allRoles: 'All roles',
    emptyState: 'No opportunities found. Try another search.',
    trustSafeTitle: 'Safe and trusted',
    trustSafeDescription: 'Verified practices',
    trustControlTitle: 'You stay in control',
    trustControlDescription: 'Clear from start to finish',
    trustQuickTitle: 'Quick and easy',
    trustQuickDescription: 'Sign up in just a few minutes',
  },
  es: {
    eyebrow: 'LA PLATAFORMA DE SALUD DENTAL',
    headline1: 'La conexión ideal.',
    headline2: 'Una sonrisa',
    headline3: 'empieza aquí.',
    lead: 'Encuentra un trabajo a tu medida o al profesional que completa tu clínica. Tu próximo paso en salud dental empieza aquí.',
    work: 'Ver ofertas',
    staff: 'Buscar personal',
    next: 'TU PRÓXIMO PASO',
    good: 'Un buen trabajo sienta bien.',
    all: 'Ver oportunidades',
    search: 'Buscar oportunidades',
    popular: 'Popular:',
    new: 'NOVEDADES EN DENTALFIND',
    fitting: 'Oportunidades para ti',
    socialProofCount: 'Más de 1.200 profesionales dentales',
    socialProofCaption: 'encuentran su sitio en Dentalfind',
    imageAlt: 'Dentista y paciente en una clínica moderna',
    photoTitle: 'Trabaja con una sonrisa',
    photoCaption: 'Tu próximo paso empieza aquí',
    opportunitiesTitle: 'Nuevas oportunidades',
    opportunitiesCaption: 'Ofertas nuevas cada día',
    matchTitle: 'Una conexión ideal',
    matchCaption: 'Para ti y tu clínica',
    workTab: 'Busco trabajo',
    staffTab: 'Busco personal',
    workAvailability: '38 oportunidades activas',
    staffAvailability: '124 profesionales disponibles',
    roleSearchPlaceholder: 'Puesto, clínica o palabra clave',
    staffSearchPlaceholder: 'Busca por puesto o especialidad',
    locationLabel: 'Ubicación',
    allOpportunities: 'Todas las oportunidades',
    allRoles: 'Todos los puestos',
    emptyState: 'No hay oportunidades. Prueba otra búsqueda.',
    trustSafeTitle: 'Seguro y confiable',
    trustSafeDescription: 'Clínicas verificadas',
    trustControlTitle: 'Tú tienes el control',
    trustControlDescription: 'Claridad de principio a fin',
    trustQuickTitle: 'Listo en un momento',
    trustQuickDescription: 'Regístrate en solo unos minutos',
  },
}
