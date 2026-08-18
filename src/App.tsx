import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import LiveRatePage from './pages/LiveRatePage'
import GoldLoanPage from './pages/GoldLoanPage'
import AboutPage from './pages/AboutPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'live-rate' | 'gold-loan' | 'about'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#about') return 'about'
      if (window.location.hash === '#gold-loan') return 'gold-loan'
      if (window.location.hash === '#live-rate') return 'live-rate'
    }
    return 'home'
  })

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setCurrentPage('about')
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

  const navigateTo = (page: 'home' | 'live-rate' | 'gold-loan' | 'about') => {
    setCurrentPage(page)
    if (page === 'about') window.location.hash = '#about'
    else if (page === 'gold-loan') window.location.hash = '#gold-loan'
    else if (page === 'live-rate') window.location.hash = '#live-rate'
    else window.location.hash = '#home'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="w-full min-h-screen bg-[#121212]">
      {currentPage === 'about' ? (
        <AboutPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateLiveRate={() => navigateTo('live-rate')}
          onNavigateGoldLoan={() => navigateTo('gold-loan')}
        />
      ) : currentPage === 'gold-loan' ? (
        <GoldLoanPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateLiveRate={() => navigateTo('live-rate')}
          onNavigateGoldLoan={() => navigateTo('gold-loan')}
        />
      ) : currentPage === 'live-rate' ? (
        <LiveRatePage
          onNavigateHome={() => navigateTo('home')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateGoldLoan={() => navigateTo('gold-loan')}
          onNavigateTo={(page) => navigateTo(page as any)}
        />
      ) : (
        <HomePage
          onNavigateHome={() => navigateTo('home')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateLiveRate={() => navigateTo('live-rate')}
          onNavigateGoldLoan={() => navigateTo('gold-loan')}
        />
      )}
    </div>
  )
}

export default App
