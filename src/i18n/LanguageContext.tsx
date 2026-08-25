import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Language, type TranslationKey } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey) => string
  isTamil: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('goldfin_lang') as Language
      if (saved === 'ta' || saved === 'en') return saved
    }
    // Default to Tamil for Tamil end-users
    return 'ta'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('goldfin_lang', language)
      document.documentElement.lang = language
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ta' ? 'en' : 'ta'))
  }

  const t = (key: TranslationKey): string => {
    const langDict = translations[language] || translations.ta
    return langDict[key] || translations.en[key] || String(key)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isTamil: language === 'ta',
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
