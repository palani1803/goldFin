import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import LiveRatePage from './pages/LiveRatePage'
import GoldLoanPage from './pages/GoldLoanPage'
import BranchesPage from './pages/BranchesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { AdminLoginPage, AdminLayout } from './pages/admin'
import { LanguageProvider } from './i18n'

type PageType = 'home' | 'live-rate' | 'gold-loan' | 'branches' | 'about' | 'contact' | 'admin-login' | 'admin'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash === '#admin') {
        // Check if admin is authenticated
        const token = localStorage.getItem('adminToken')
        return token ? 'admin' : 'admin-login'
      }
      if (hash === '#admin-login') return 'admin-login'
      if (hash === '#contact') return 'contact'
      if (hash === '#about') return 'about'
      if (hash === '#branches') return 'branches'
      if (hash === '#gold-loan') return 'gold-loan'
      if (hash === '#live-rate') return 'live-rate'
    }
    return 'home'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#admin') {
        const token = localStorage.getItem('adminToken')
        setCurrentPage(token ? 'admin' : 'admin-login')
      } else if (hash === '#admin-login') {
        setCurrentPage('admin-login')
      } else if (hash === '#contact') {
        setCurrentPage('contact')
      } else if (hash === '#about') {
        setCurrentPage('about')
      } else if (hash === '#branches') {
        setCurrentPage('branches')
      } else if (hash === '#gold-loan') {
        setCurrentPage('gold-loan')
      } else if (hash === '#live-rate') {
        setCurrentPage('live-rate')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (page: PageType) => {
    setCurrentPage(page)
    window.location.hash = page === 'home' ? '#home' : `#${page}`
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
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={() => navigateTo('contact')}
          />
        ) : currentPage === 'about' ? (
          <AboutPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={() => navigateTo('contact')}
          />
        ) : currentPage === 'branches' ? (
          <BranchesPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={() => navigateTo('contact')}
          />
        ) : currentPage === 'gold-loan' ? (
          <GoldLoanPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={() => navigateTo('contact')}
          />
        ) : currentPage === 'live-rate' ? (
          <LiveRatePage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={() => navigateTo('contact')}
            onNavigateTo={(page) => navigateTo(page as any)}
          />
        ) : (
          <HomePage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={() => navigateTo('contact')}
          />
        )}
      </div>
    </LanguageProvider>
  )
}

export default App
