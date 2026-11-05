import { useState, type ReactElement, type ReactNode } from 'react'
import { useSavedOpportunities } from '../../hooks/useSavedOpportunities'
import { HomePageStateContext, type HomePageState, type SearchMode } from './useHomePageState'

type HomePageStateProviderProps = {
  children: ReactNode
}

// Mounted above the routes so homepage state survives navigation.
export function HomePageStateProvider({ children }: HomePageStateProviderProps): ReactElement {
  const [mode, setMode] = useState<SearchMode>('work')
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Amsterdam')
  const { saved, toggleSaved } = useSavedOpportunities()
  const state: HomePageState = {
    mode,
    setMode,
    query,
    setQuery,
    location,
    setLocation,
    saved,
    toggleSaved,
  }
  return <HomePageStateContext.Provider value={state}>{children}</HomePageStateContext.Provider>
}
