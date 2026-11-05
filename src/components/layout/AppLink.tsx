import type { ComponentPropsWithoutRef, MouseEvent, ReactElement } from 'react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'

type AppLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'onClick' | 'href'> & {
  href: string
  navigate: BrowserNavigate
  onNavigate?: () => void
}

export default function AppLink({ navigate, onNavigate, ...props }: AppLinkProps): ReactElement {
  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return
    if (props.target && props.target !== '_self') return
    if (props.download !== undefined && props.download !== false) return

    const link = event.currentTarget
    if (link.origin !== window.location.origin) return
    // The path-only router does not handle query strings or hash navigation.
    if (link.search || link.hash) return

    event.preventDefault()
    onNavigate?.()
    navigate(link.pathname)
  }

  return <a {...props} onClick={handleClick} />
}
