import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'
import type { SavedOpportunitiesState } from '../../hooks/useSavedOpportunities'

export type SearchMode = 'work' | 'staff'

export type HomePageState = SavedOpportunitiesState & {
  mode: SearchMode
  setMode: Dispatch<SetStateAction<SearchMode>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}

export const HomePageStateContext = createContext<HomePageState | null>(null)

export function useHomePageState(): HomePageState {
  const state = useContext(HomePageStateContext)
  if (!state) throw new Error('HomePage must be rendered within HomePageStateProvider')
  return state
}
