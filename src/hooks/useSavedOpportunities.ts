import { useState } from 'react'

export type SavedOpportunitiesState = {
  saved: string[]
  toggleSaved: (id: string) => void
}

export function toggleSavedOpportunity(saved: readonly string[], id: string): string[] {
  return saved.includes(id) ? saved.filter((savedId) => savedId !== id) : [...saved, id]
}

export function useSavedOpportunities(): SavedOpportunitiesState {
  const [saved, setSaved] = useState<string[]>([])

  function toggleSaved(id: string): void {
    setSaved((current) => toggleSavedOpportunity(current, id))
  }

  return { saved, toggleSaved }
}
