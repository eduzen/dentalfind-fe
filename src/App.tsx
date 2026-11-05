import { useEffect, type ReactElement } from 'react'
import './App.css'
import HomePage from './components/home/HomePage'
import { HomePageStateProvider } from './components/home/HomePageStateProvider'
import HowItWorksPage from './components/how-it-works/HowItWorksPage'
import PublicLayout from './components/layout/PublicLayout'
import LoginPage from './components/login/LoginPage'
import OpportunitiesPage from './components/opportunities/OpportunitiesPage'
import SignupPage from './components/signup/SignupPage'
import { useBrowserPath } from './hooks/useBrowserPath'
import { useLanguage } from './hooks/useLanguage'

function AppRoutes(): ReactElement {
  const { language, setLanguage } = useLanguage()
  const { pathname, navigate } = useBrowserPath()

  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return

    const frame = window.requestAnimationFrame(() =>
      document.getElementById(targetId)?.scrollIntoView(),
    )
    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  if (pathname === '/login') {
    return <LoginPage language={language} onLanguageChange={setLanguage} navigate={navigate} />
  }

  if (pathname === '/sign-up' || pathname.startsWith('/sign-up/')) {
    return (
      <SignupPage
        language={language}
        onLanguageChange={setLanguage}
        pathname={pathname}
        navigate={navigate}
      />
    )
  }

  let page: ReactElement
  switch (pathname) {
    case '/opportunities':
      page = <OpportunitiesPage language={language} navigate={navigate} />
      break
    case '/how-it-works':
      page = <HowItWorksPage language={language} navigate={navigate} />
      break
    default:
      // Preserve the existing homepage fallback for unknown paths.
      page = <HomePage language={language} navigate={navigate} />
  }

  return (
    <PublicLayout
      language={language}
      onLanguageChange={setLanguage}
      pathname={pathname}
      navigate={navigate}
    >
      {page}
    </PublicLayout>
  )
}

export default function App(): ReactElement {
  return (
    <HomePageStateProvider>
      <AppRoutes />
    </HomePageStateProvider>
  )
}
