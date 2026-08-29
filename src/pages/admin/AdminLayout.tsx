import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Coins, Building2, Settings as SettingsIcon, LogOut, Menu, X,
  ChevronRight, Shield
} from 'lucide-react'
import AdminDashboard from './AdminDashboard'
import AdminGoldRates from './AdminGoldRates'
import AdminBranches from './AdminBranches'
import AdminSettings from './AdminSettings'
import { useSiteSettings } from '../../hooks/useSiteSettings'

type AdminPage = 'dashboard' | 'gold-rates' | 'branches' | 'settings'

interface AdminLayoutProps {
  onLogout: () => void
  onNavigateHome: () => void
}

export default function AdminLayout({ onLogout, onNavigateHome }: AdminLayoutProps) {
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahesh Bankers'
  const [activePage, setActivePage] = useState<AdminPage>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adminName, setAdminName] = useState('')

  useEffect(() => {
    const name = localStorage.getItem('adminName')
    if (name && !name.toLowerCase().includes('goldfin')) {
      setAdminName(name)
    } else {
      setAdminName(`${companyName} Admin`)
    }
  }, [companyName])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminName')
    localStorage.removeItem('adminEmail')
    onLogout()
  }

  const navItems: { id: AdminPage; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'gold-rates', label: 'Gold Rates', icon: <Coins size={20} /> },
    { id: 'branches', label: 'Branches', icon: <Building2 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
  ]

  const renderPage = () => {
    switch (activePage) {
      case 'gold-rates':
        return <AdminGoldRates />
      case 'branches':
        return <AdminBranches />
      case 'settings':
        return <AdminSettings />
      default:
        return <AdminDashboard onNavigateTo={setActivePage} />
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Permanently fixed and non-moving */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 flex flex-col bg-white border-r border-orange-100 shadow-sm transition-transform duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{
          width: '272px',
          minWidth: '272px',
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-[72px] px-6 shrink-0 border-b border-orange-100/80">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 bg-transparent border-0 cursor-pointer group p-0"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-500/25 bg-gradient-to-tr from-[#FF6B00] to-[#EA580C]">
              <Coins size={22} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors truncate max-w-[150px]">
                {settings.siteName || 'Mahesh Bankers'}
              </span>
              <span className="text-[10px] font-black tracking-wider text-orange-600 uppercase">
                ADMIN PORTAL
              </span>
            </div>
          </button>
          <button
            className="md:hidden p-1.5 rounded-lg bg-orange-50 text-slate-500 hover:text-slate-900 border border-orange-200 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3.5 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePage === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 text-orange-600 border-orange-200/90 shadow-xs'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/60 border-transparent'
                }`}
              >
                <span className={isActive ? 'text-orange-600' : 'text-slate-400 group-hover:text-orange-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight size={16} className="ml-auto text-orange-500" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer — Admin Profile */}
        <div className="px-3.5 pb-4 shrink-0">
          <div className="rounded-2xl p-3.5 bg-gradient-to-br from-orange-50/80 via-amber-50/50 to-orange-100/30 border border-orange-200/70 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-orange-600 bg-orange-500/15 border border-orange-300/60 shadow-xs">
                <Shield size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-slate-900 truncate">{adminName}</p>
                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 h-8.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/80 cursor-pointer transition-all active:scale-95"
            >
              <LogOut size={13} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full md:pl-[272px] overflow-x-hidden bg-slate-50/60">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-[72px] px-6 shrink-0 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-orange-50 border border-orange-200 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-lg font-black text-slate-900 capitalize">
                {activePage === 'gold-rates' ? 'Gold Rates' : activePage}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {activePage === 'dashboard' && 'Overview of your shop & customer operations'}
                {activePage === 'gold-rates' && 'Manage your shop gold rates & live valuations'}
                {activePage === 'branches' && 'Manage your 4 official regional branch locations'}
                {activePage === 'settings' && 'Manage brand logo, name & contact hotlines'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700">System Online</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#F8FAFC]">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
