import type { Opportunity } from '../opportunities/opportunities'

export const homeOpportunities: Opportunity[] = [
  {
    id: 'home-de-jordaan-hygienist',
    role: 'dentalHygienist',
    clinic: 'Tandartspraktijk De Jordaan',
    area: 'Amsterdam-West',
    coordinates: { latitude: 52.374, longitude: 4.881 },
    type: 'temporary',
    time: {
      nl: 'Morgen · 08:30 – 17:00',
      en: 'Tomorrow · 08:30 – 17:00',
      es: 'Mañana · 08:30 – 17:00',
    },
    rate: { nl: '€ 55 – 65 / uur', en: '€ 55 – 65 / hour', es: '€ 55 – 65 / hora' },
    color: 'mint',
    initials: 'DJ',
  },
  {
    id: 'home-studio-dental-assistant',
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
      nl: '€ 2.650 – 3.250 / mnd',
      en: '€ 2,650 – 3,250 / month',
      es: '€ 2.650 – 3.250 / mes',
    },
    color: 'peach',
    initials: 'SD',
  },
  {
    id: 'home-kleine-wetering-dentist',
    role: 'dentist',
    clinic: 'De Kleine Wetering',
    area: 'Amsterdam-Zuid',
    coordinates: { latitude: 52.353, longitude: 4.89 },
    type: 'temporary',
    time: {
      nl: 'Vrijdag · 09:00 – 18:00',
      en: 'Friday · 09:00 – 18:00',
      es: 'Viernes · 09:00 – 18:00',
    },
    rate: { nl: '€ 600 – 700 / dag', en: '€ 600 – 700 / day', es: '€ 600 – 700 / día' },
    color: 'lavender',
    initials: 'KW',
  },
]
