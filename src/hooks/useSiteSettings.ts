import { useState, useEffect, useCallback } from 'react'

export interface SiteSettings {
  siteName: string
  bankPartnerName?: string
  tagline: string
  logoUrl: string
  logoType: 'icon' | 'image' | 'both'
  whatsappNumber: string
  contactPhone: string
  contactEmail: string
  headquartersAddress: string
  operatingHours: string
  goldDutyFactor: number
  goldGstPercent: number
  maxLoanLtvPercent: number
  demoAdminEmail?: string
  demoAdminPassword?: string
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Mahes Bankers',
  bankPartnerName: 'RBI-Approved Scheduled Commercial Banks',
  tagline: 'Live Rates & Gold Loans',
  logoUrl: '',
  logoType: 'icon',
  whatsappNumber: '9092548347',
  contactPhone: '+91 90925 48347',
  contactEmail: 'contact@mahesbankers.com',
  headquartersAddress: 'No. 42/B, Kamarajar Road, Near Old Bus Stand, Sivakasi, Tamil Nadu',
  operatingHours: 'Mon–Sat: 9:00 AM – 6:30 PM',
  goldDutyFactor: 1.135,
  goldGstPercent: 3,
  maxLoanLtvPercent: 75,
  demoAdminEmail: 'admin@mahesbankers.com',
  demoAdminPassword: 'admin123',
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('goldFin_site_settings')
        if (cached) {
          const parsed = JSON.parse(cached)
          if (parsed.siteName === 'GoldFin' || parsed.siteName === 'Mahesh Bankers') {
            parsed.siteName = 'Mahes Bankers'
          }
          return parsed
        }
      } catch {}
    }
    return DEFAULT_SITE_SETTINGS
  })
  const [loading, setLoading] = useState(false)

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings')
      const json = await res.json()
      if (json.success && json.data) {
        setSettings(json.data)
        localStorage.setItem('goldFin_site_settings', JSON.stringify(json.data))
      }
    } catch {
      // Use fallback/cached settings
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()

    const handleSettingsUpdate = (e: CustomEvent) => {
      if (e.detail) {
        setSettings(e.detail)
      } else {
        fetchSettings()
      }
    }

    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === 'goldFin_site_settings') {
        fetchSettings()
      }
    }

    window.addEventListener('settingsUpdated' as any, handleSettingsUpdate)
    window.addEventListener('storage', handleStorageUpdate)

    return () => {
      window.removeEventListener('settingsUpdated' as any, handleSettingsUpdate)
      window.removeEventListener('storage', handleStorageUpdate)
    }
  }, [fetchSettings])

  return { settings, loading, refetch: fetchSettings }
}
