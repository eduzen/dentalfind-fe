import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { Language } from '../components/opportunities/opportunities'

type LanguageState = {
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
}

const LANGUAGE_STORAGE_KEY = 'dentalfind-language-v2'

function getInitialLanguage(): Language {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (storedLanguage === 'nl' || storedLanguage === 'en' || storedLanguage === 'es') {
      return storedLanguage
    }
  } catch {
    // Fall back to English when browser storage is unavailable.
  }

  return 'en'
}

export function useLanguage(): LanguageState {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Keep the selected language for this session if browser storage is unavailable.
    }
  }, [language])

  return { language, setLanguage }
}
