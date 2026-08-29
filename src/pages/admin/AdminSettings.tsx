import { useState, useEffect, useRef } from 'react'
import {
  Settings,
  Image as ImageIcon,
  Phone,
  Lock,
  Save,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Coins,
  ShieldCheck,
  Eye,
  EyeOff,
  Trash2,
} from 'lucide-react'

interface SiteSettingsData {
  siteName: string
  bankPartnerName: string
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

const DEFAULT_SETTINGS: SiteSettingsData = {
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

type SettingsTab = 'branding' | 'contact' | 'security'

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('branding')
  const [formData, setFormData] = useState<SiteSettingsData>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [warningMsg, setWarningMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings()
  }, [])

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings')
      const json = await res.json()
      if (json.success && json.data) {
        setFormData({
          siteName: json.data.siteName || 'Mahes Bankers',
          bankPartnerName: json.data.bankPartnerName || 'RBI-Approved Scheduled Commercial Banks',
          tagline: json.data.tagline || 'Live Rates & Gold Loans',
          logoUrl: json.data.logoUrl || '',
          logoType: json.data.logoType || (json.data.logoUrl ? 'image' : 'icon'),
          whatsappNumber: json.data.whatsappNumber || '9092548347',
          contactPhone: json.data.contactPhone || '+91 90925 48347',
          contactEmail: json.data.contactEmail || 'contact@mahesbankers.com',
          headquartersAddress: json.data.headquartersAddress || '',
          operatingHours: json.data.operatingHours || 'Mon–Sat: 9:00 AM – 6:30 PM',
          goldDutyFactor: json.data.goldDutyFactor ?? 1.135,
          goldGstPercent: json.data.goldGstPercent ?? 3,
          maxLoanLtvPercent: json.data.maxLoanLtvPercent ?? 75,
          demoAdminEmail: json.data.demoAdminEmail || 'admin@mahesbankers.com',
          demoAdminPassword: json.data.demoAdminPassword || 'admin123',
        })
      }
    } catch (err: any) {
      console.error('Failed to load settings:', err)
      setErrorMsg('Could not connect to settings server')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof SiteSettingsData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear warning when user types
    if (warningMsg) setWarningMsg('')
  }

  // Handle Logo Upload from local file (any image format, strictly under 1MB)
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setWarningMsg('')
    setErrorMsg('')
    setSuccessMsg('')

    // Enforce 1MB (1,048,576 bytes)
    const MAX_SIZE_BYTES = 1048576
    if (file.size > MAX_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
      setWarningMsg(`⚠️ Warning: Logo image size (${fileSizeMB} MB) exceeds the 1MB limit. Please upload an image under 1MB.`)
      if (fileInputRef.current) fileInputRef.current.value = ''
      scrollToTop()
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Url = event.target?.result as string
      setFormData((prev) => ({
        ...prev,
        logoUrl: base64Url,
        logoType: 'image',
      }))
      setSuccessMsg(`Logo file "${file.name}" (${(file.size / 1024).toFixed(1)} KB) loaded successfully! Click "Save Settings" to apply.`)
    }
    reader.onerror = () => {
      setErrorMsg('Failed to process the selected image file. Please try another image.')
    }
    reader.readAsDataURL(file)
  }

  // Validate Requirements Before Saving
  const validateFormRequirements = (): string | null => {
    // 1. Company Name validation
    if (!formData.siteName || !formData.siteName.trim()) {
      return '⚠️ Company / Brand Name is required. Please enter a valid name.'
    }

    // 2. WhatsApp Number validation
    const cleanWA = (formData.whatsappNumber || '').replace(/[^0-9]/g, '')
    if (!cleanWA || cleanWA.length < 10) {
      return '⚠️ WhatsApp Support Number must contain at least 10 valid digits (e.g. 9092548347).'
    }

    // 3. Contact Phone validation
    if (!formData.contactPhone || !formData.contactPhone.trim()) {
      return '⚠️ Primary Hotline Phone is required.'
    }

    // 4. Email format validation (if provided)
    if (formData.contactEmail && formData.contactEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.contactEmail.trim())) {
        return '⚠️ Please enter a valid email address format (e.g. contact@mahesbankers.com).'
      }
    }

    return null
  }

  // Save Settings to Backend & MongoDB
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    setSuccessMsg('')
    setWarningMsg('')
    setErrorMsg('')

    // Check requirement validations
    const validationWarning = validateFormRequirements()
    if (validationWarning) {
      setWarningMsg(validationWarning)
      scrollToTop()
      return
    }

    setSaving(true)
    const token = localStorage.getItem('adminToken')

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify(formData),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        setSuccessMsg('✅ Settings saved successfully! Changes are now live across the website.')
        localStorage.setItem('goldFin_site_settings', JSON.stringify(json.data))
        window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: json.data }))
        window.dispatchEvent(new StorageEvent('storage', { key: 'goldFin_site_settings' }))
        scrollToTop()
      } else {
        setErrorMsg(json.message || 'Failed to save settings to server')
        scrollToTop()
      }
    } catch (err: any) {
      console.error('Settings save error:', err)
      setErrorMsg(err.message || 'Network error saving settings. Please check your connection.')
      scrollToTop()
    } finally {
      setSaving(false)
    }
  }

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (!currentPassword) {
      setPasswordError('Please enter your current password')
      return
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }

    setPasswordSaving(true)
    const token = localStorage.getItem('adminToken')

    try {
      const res = await fetch('/api/settings/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        const updatedPassword = json.data?.demoAdminPassword || newPassword
        const updatedEmail = json.data?.demoAdminEmail || formData.demoAdminEmail || 'admin@mahesbankers.com'

        setPasswordSuccess(`Password updated successfully! Login page demo credentials have also been updated to "${updatedPassword}".`)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')

        setFormData((prev) => ({
          ...prev,
          demoAdminPassword: updatedPassword,
          demoAdminEmail: updatedEmail,
        }))

        try {
          const cached = localStorage.getItem('goldFin_site_settings')
          const parsed = cached ? JSON.parse(cached) : {}
          parsed.demoAdminPassword = updatedPassword
          parsed.demoAdminEmail = updatedEmail
          localStorage.setItem('goldFin_site_settings', JSON.stringify(parsed))
        } catch { }

        window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: { ...formData, demoAdminPassword: updatedPassword, demoAdminEmail: updatedEmail } }))
        window.dispatchEvent(new StorageEvent('storage', { key: 'goldFin_site_settings' }))
      } else {
        setPasswordError(json.message || 'Failed to change password')
      }
    } catch (err: any) {
      setPasswordError(err.message || 'Error updating password')
    } finally {
      setPasswordSaving(false)
    }
  }

  const tabs = [
    { id: 'branding' as SettingsTab, label: 'Logo & Brand', icon: <ImageIcon size={18} /> },
    { id: 'contact' as SettingsTab, label: 'Contact & WhatsApp', icon: <Phone size={18} /> },
    { id: 'security' as SettingsTab, label: 'Security & Password', icon: <Lock size={18} /> },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw size={32} className="text-orange-500 animate-spin" />
          <span className="text-slate-400 text-sm font-semibold">Loading system settings...</span>
        </div>
      </div>
    )
  }

  return (
    <div ref={topRef} className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Settings size={26} className="text-orange-600" />
            System & Brand Settings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Customize your company logo, site branding, and WhatsApp support hotline.
          </p>
        </div>

        <button
          onClick={() => handleSaveSettings()}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white text-sm font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer border-0 disabled:opacity-50 active:scale-95"
        >
          {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Warning Alert */}
      {warningMsg && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-sm shadow-xs animate-in fade-in slide-in-from-top-2">
          <AlertTriangle size={20} className="shrink-0 text-amber-600 mt-0.5" />
          <div className="flex-1 font-semibold leading-relaxed">
            {warningMsg}
          </div>
          <button
            onClick={() => setWarningMsg('')}
            className="text-amber-600 hover:text-amber-900 text-xs font-bold border-0 bg-transparent cursor-pointer p-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Success Alert */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 text-sm shadow-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={20} className="shrink-0 text-emerald-600 mt-0.5" />
          <div className="flex-1 font-semibold leading-relaxed">
            {successMsg}
          </div>
          <button
            onClick={() => setSuccessMsg('')}
            className="text-emerald-600 hover:text-emerald-900 text-xs font-bold border-0 bg-transparent cursor-pointer p-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 text-sm shadow-xs animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} className="shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1 font-semibold leading-relaxed">
            {errorMsg}
          </div>
          <button
            onClick={() => setErrorMsg('')}
            className="text-rose-600 hover:text-rose-900 text-xs font-bold border-0 bg-transparent cursor-pointer p-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              setWarningMsg('')
              setSuccessMsg('')
              setErrorMsg('')
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-bold transition-all border-0 cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-orange-600 border-b-2 border-orange-500 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Logo & Brand Identity */}
      {activeTab === 'branding' && (
        <div className="p-7 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ImageIcon size={18} className="text-orange-600" />
              Logo & Brand Configuration
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Upload your company logo and customize your brand name displayed across the website.
            </p>
          </div>

          {/* Logo Upload Box & Current Preview */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Company Logo
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Current Active Logo Thumbnail */}
              <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-2.5 shrink-0 overflow-hidden shadow-xs">
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt="Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#EA580C] flex items-center justify-center text-white shadow-md">
                    <Coins size={26} />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.jpeg,.jpg,.png,.svg,.webp,.gif,.ico,.avif,.bmp,.tiff"
                  onChange={handleLogoFileUpload}
                  className="hidden"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white text-xs font-bold transition-all cursor-pointer border-0 shadow-sm shadow-orange-500/20 active:scale-95"
                  >
                    <Upload size={14} />
                    <span>Upload Logo File (JPEG, PNG, JPG, SVG)</span>
                  </button>

                  {formData.logoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange('logoUrl', '')
                        handleInputChange('logoType', 'icon')
                        setSuccessMsg('Reverted to default logo icon. Click "Save Logo & Brand Changes" to apply.')
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Trash2 size={14} />
                      <span>Reset to Default</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Accepts <strong>JPEG</strong>, <strong>JPG</strong>, <strong>PNG</strong>, <strong>SVG</strong>, <strong>WebP</strong>. Maximum file size: <strong>1MB</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Company / Brand Name */}
          <div className="pt-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Company / Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:border-orange-500 outline-none transition-colors"
              placeholder="e.g. Mahes Bankers"
            />
            <p className="text-[11px] text-slate-500 mt-1.5">
              This name will be displayed in the header, footer, and browser page title across the customer application.
            </p>
          </div>

          {/* Tab 1 Save Action Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => handleSaveSettings()}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer border-0 disabled:opacity-50 active:scale-95"
            >
              {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{saving ? 'Saving Logo & Brand...' : 'Save Logo & Brand Changes'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Contact & WhatsApp */}
      {activeTab === 'contact' && (
        <div className="p-7 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Phone size={18} className="text-orange-600" />
              Contact & WhatsApp Support Configuration
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Configure your primary customer support contacts and WhatsApp floating widget number.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* WhatsApp Floating Desk Number */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800">
                  WhatsApp Support Number <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Floating Widget
                </span>
              </div>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white border border-emerald-300 text-sm font-bold text-emerald-900 focus:border-emerald-500 outline-none transition-colors"
                placeholder="9092548347"
              />
              <p className="text-[11px] text-emerald-700 font-medium">
                Powers the floating WhatsApp chat widget in the bottom-right corner.
              </p>
            </div>

            {/* Hotline Phone */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Primary Hotline Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:border-orange-500 outline-none transition-colors"
                placeholder="+91 90925 48347"
              />
              <p className="text-[11px] text-slate-500">
                Displayed in the Footer, Contact Page, and Branches.
              </p>
            </div>

            {/* Support Email */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Official Support Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:border-orange-500 outline-none transition-colors"
                placeholder="contact@mahesbankers.com"
              />
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Business Operating Hours
              </label>
              <input
                type="text"
                value={formData.operatingHours}
                onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:border-orange-500 outline-none transition-colors"
                placeholder="Mon–Sat: 9:00 AM – 6:30 PM"
              />
            </div>

            {/* Headquarters Address */}
            <div className="md:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Headquarters Physical Address
              </label>
              <textarea
                rows={2}
                value={formData.headquartersAddress}
                onChange={(e) => handleInputChange('headquartersAddress', e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:border-orange-500 outline-none transition-colors resize-none"
                placeholder="No. 42/B, Kamarajar Road, Near Old Bus Stand, Sivakasi, Tamil Nadu"
              />
            </div>
          </div>

          {/* Tab 2 Save Action Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => handleSaveSettings()}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer border-0 disabled:opacity-50 active:scale-95"
            >
              {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{saving ? 'Saving Contact Details...' : 'Save Contact Details'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Security & Password */}
      {activeTab === 'security' && (
        <div className="p-7 rounded-2xl bg-white border border-slate-200 space-y-6 max-w-2xl shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck size={18} className="text-orange-600" />
              Admin Security & Password
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Update your administrator login password to keep your system protected.
            </p>
          </div>

          {/* Current Demo Credentials Display */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider flex items-center gap-1.5">
                <Coins size={14} /> Active Login Demo Credentials
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold">
                Live Synced
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-orange-200 flex items-center justify-between shadow-2xs">
                <span className="text-slate-500">Email:</span>
                <span className="text-orange-700 font-bold">{formData.demoAdminEmail || 'admin@mahesbankers.com'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-orange-200 flex items-center justify-between shadow-2xs">
                <span className="text-slate-500">Password:</span>
                <span className="text-orange-700 font-bold">{formData.demoAdminPassword || 'admin123'}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              💡 Updating your password below will immediately sync and update the demo credentials on the Admin Login portal.
            </p>
          </div>

          {passwordSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2.5 text-xs font-bold shadow-xs">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          {passwordError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2.5 text-xs font-bold shadow-xs">
              <AlertCircle size={16} className="text-rose-600" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPw ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-11 px-4 pr-11 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 border-0 bg-transparent cursor-pointer"
                >
                  {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                New Password (Min 6 characters)
              </label>
              <div className="relative">
                <input
                  type={showNewPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-11 px-4 pr-11 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  placeholder="Enter new strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 border-0 bg-transparent cursor-pointer"
                >
                  {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-orange-500 outline-none transition-colors"
                placeholder="Re-enter new password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={passwordSaving}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white text-xs font-bold transition-all cursor-pointer border-0 shadow-sm shadow-orange-500/20 disabled:opacity-50 active:scale-95"
            >
              {passwordSaving ? <RefreshCw size={14} className="animate-spin" /> : <Lock size={14} />}
              <span>{passwordSaving ? 'Updating Password...' : 'Change Password'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
