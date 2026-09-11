import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import LiveRatePage from './pages/LiveRatePage'
import GoldLoanPage from './pages/GoldLoanPage'
import BranchesPage from './pages/BranchesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { AdminLoginPage, AdminLayout } from './pages/admin'
import { LanguageProvider } from './i18n'
import { WhatsAppFloat } from './components'
import { useSiteSettings } from './hooks/useSiteSettings'

type PageType = 'home' | 'live-rate' | 'gold-loan' | 'branches' | 'about' | 'contact' | 'admin-login' | 'admin'

function App() {
  const { settings } = useSiteSettings()

  useEffect(() => {
    if (settings.siteName) {
      document.title = `${settings.siteName} - ${settings.tagline || 'Live Rates & Gold Loans'}`
    }
    const iconUrl = settings.logoUrl || '/mahesbankers.png'
    const linkEl = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null
    if (linkEl) {
      linkEl.href = iconUrl
    }
  }, [settings.siteName, settings.tagline, settings.logoUrl])

  const [selectedBranchCity, setSelectedBranchCity] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path === '/contact') {
        const params = new URLSearchParams(window.location.search)
        return params.get('city') || params.get('branch') || localStorage.getItem('selectedContactBranch') || null
      }
    }
    return null
  })

  // Helper to extract page and clean up any legacy hash (e.g. #branches -> /branches)
  const resolvePageFromLocation = (): PageType => {
    if (typeof window === 'undefined') return 'home'

    // If a hash exists (e.g. /#branches, #about), strip '#' and replace URL with clean pathname
    if (window.location.hash) {
      const rawHash = window.location.hash.replace(/^#\/?/, '')
      const [hashRoute, hashQuery] = rawHash.split('?')
      const cleanHash = hashRoute.toLowerCase()
      const search = window.location.search || (hashQuery ? `?${hashQuery}` : '')

      if (cleanHash === 'branches' || cleanHash === 'branch') {
        window.history.replaceState(null, '', `/branches${search}`)
        return 'branches'
      }
      if (cleanHash === 'live-rate' || cleanHash === 'live-rates' || cleanHash === 'liverate') {
        window.history.replaceState(null, '', `/live-rate${search}`)
        return 'live-rate'
      }
      if (cleanHash === 'gold-loan' || cleanHash === 'goldloan') {
        window.history.replaceState(null, '', `/gold-loan${search}`)
        return 'gold-loan'
      }
      if (cleanHash === 'about' || cleanHash === 'about-us') {
        window.history.replaceState(null, '', `/about${search}`)
        return 'about'
      }
      if (cleanHash === 'contact' || cleanHash === 'contact-us') {
        window.history.replaceState(null, '', `/contact${search}`)
        return 'contact'
      }
      if (cleanHash === 'admin') {
        const token = localStorage.getItem('adminToken')
        window.history.replaceState(null, '', '/admin')
        return token ? 'admin' : 'admin-login'
      }
      if (cleanHash === 'admin-login') {
        window.history.replaceState(null, '', '/admin-login')
        return 'admin-login'
      }
      // Clean generic or empty hash to root
      window.history.replaceState(null, '', `/${search}`)
    }

    // Clean pathname routing
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/'
    if (path === '/admin') {
      const token = localStorage.getItem('adminToken')
      return token ? 'admin' : 'admin-login'
    }
    if (path === '/admin-login') return 'admin-login'
    if (path === '/contact' || path === '/contact-us') return 'contact'
    if (path === '/about' || path === '/about-us') return 'about'
    if (path === '/branches' || path === '/branch') return 'branches'
    if (path === '/gold-loan' || path === '/goldloan') return 'gold-loan'
    if (path === '/live-rate' || path === '/live-rates' || path === '/liverate') return 'live-rate'

    return 'home'
  }

  const [currentPage, setCurrentPage] = useState<PageType>(() => resolvePageFromLocation())

  useEffect(() => {
    // Immediately ensure URL is clean on mount (converts any /#branches to /branches)
    const page = resolvePageFromLocation()
    setCurrentPage(page)

    const handleLocationChange = () => {
      const newPage = resolvePageFromLocation()
      const params = new URLSearchParams(window.location.search)
      const branchCity = params.get('city') || params.get('branch')
      if (branchCity) {
        setSelectedBranchCity(branchCity)
        localStorage.setItem('selectedContactBranch', branchCity)
      }
      setCurrentPage(newPage)
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const navigateTo = (page: PageType, branchCity?: string) => {
    if (branchCity) {
      setSelectedBranchCity(branchCity)
      localStorage.setItem('selectedContactBranch', branchCity)
      const url = page === 'contact' ? `/contact?city=${encodeURIComponent(branchCity)}` : `/${page}`
      window.history.pushState(null, '', url)
    } else {
      window.history.pushState(null, '', page === 'home' ? '/' : `/${page}`)
    }
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Admin Login Page — standalone, no Navbar/Footer
  if (currentPage === 'admin-login') {
    return (
      <AdminLoginPage
        onLoginSuccess={() => navigateTo('admin')}
        onNavigateHome={() => navigateTo('home')}
      />
    )
  }

  // Admin Panel — standalone layout with sidebar
  if (currentPage === 'admin') {
    return (
      <AdminLayout
        onLogout={() => navigateTo('admin-login')}
        onNavigateHome={() => navigateTo('home')}
      />
    )
  }

  // Public pages wrapped in LanguageProvider
  return (
    <LanguageProvider>
      <div className="w-full min-h-screen bg-[#F8FAFC]">
        {currentPage === 'contact' ? (
          <ContactPage
            initialCity={selectedBranchCity}
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        ) : currentPage === 'about' ? (
          <AboutPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        ) : currentPage === 'branches' ? (
          <BranchesPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        ) : currentPage === 'gold-loan' ? (
          <GoldLoanPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        ) : currentPage === 'live-rate' ? (
          <LiveRatePage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
            onNavigateTo={(page) => navigateTo(page as any)}
          />
        ) : (
          <HomePage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        )}

        {/* Global WhatsApp Floating Desk on Customer Pages */}
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  )
}

export default App
