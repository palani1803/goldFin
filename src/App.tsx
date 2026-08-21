import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import LiveRatePage from './pages/LiveRatePage'
import GoldLoanPage from './pages/GoldLoanPage'
import BranchesPage from './pages/BranchesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'live-rate' | 'gold-loan' | 'branches' | 'about' | 'contact'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#contact') return 'contact'
      if (window.location.hash === '#about') return 'about'
      if (window.location.hash === '#branches') return 'branches'
      if (window.location.hash === '#gold-loan') return 'gold-loan'
      if (window.location.hash === '#live-rate') return 'live-rate'
    }
    return 'home'
  })

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setCurrentPage('contact')
      } else if (window.location.hash === '#about') {
        setCurrentPage('about')
      } else if (window.location.hash === '#branches') {
        setCurrentPage('branches')
      } else if (window.location.hash === '#gold-loan') {
        setCurrentPage('gold-loan')
      } else if (window.location.hash === '#live-rate') {
        setCurrentPage('live-rate')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (page: 'home' | 'live-rate' | 'gold-loan' | 'branches' | 'about' | 'contact') => {
    setCurrentPage(page)
    if (page === 'contact') window.location.hash = '#contact'
    else if (page === 'about') window.location.hash = '#about'
    else if (page === 'branches') window.location.hash = '#branches'
    else if (page === 'gold-loan') window.location.hash = '#gold-loan'
    else if (page === 'live-rate') window.location.hash = '#live-rate'
    else window.location.hash = '#home'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
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
  )
}

export default App
