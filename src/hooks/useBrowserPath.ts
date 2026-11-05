import { useCallback, useEffect, useState } from 'react'

export type NavigateOptions = {
  replace?: boolean
}

export type BrowserNavigate = (path: string, options?: NavigateOptions) => void

export function useBrowserPath() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    function syncPath() {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  const navigate = useCallback((path: string, options: NavigateOptions = {}) => {
    if (window.location.pathname !== path || window.location.hash) {
      if (options.replace) window.history.replaceState(null, '', path)
      else window.history.pushState(null, '', path)
      setPathname(window.location.pathname)
      window.scrollTo(0, 0)
    }
  }, [])

  return { pathname, navigate }
}
