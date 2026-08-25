import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Coins, Building2, LogOut, Menu, X,
  ChevronRight, Shield
} from 'lucide-react'
import AdminDashboard from './AdminDashboard'
import AdminGoldRates from './AdminGoldRates'
import AdminBranches from './AdminBranches'

type AdminPage = 'dashboard' | 'gold-rates' | 'branches'

interface AdminLayoutProps {
  onLogout: () => void
  onNavigateHome: () => void
}

export default function AdminLayout({ onLogout, onNavigateHome }: AdminLayoutProps) {
  const [activePage, setActivePage] = useState<AdminPage>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adminName, setAdminName] = useState('Admin')

  useEffect(() => {
    const name = localStorage.getItem('adminName')
    if (name) setAdminName(name)
  }, [])

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
  ]

  const renderPage = () => {
    switch (activePage) {
      case 'gold-rates':
        return <AdminGoldRates />
      case 'branches':
        return <AdminBranches />
      default:
        return <AdminDashboard onNavigateTo={setActivePage} />
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0F172A' }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col transition-transform duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{
          width: '272px',
          minWidth: '272px',
          background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Sidebar Header */}
        <div
          className="flex items-center justify-between h-[72px] px-6 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 bg-transparent border-0 cursor-pointer group p-0"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)' }}
            >
              <Coins size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-white group-hover:text-orange-400 transition-colors">
                GoldFin
              </span>
              <span className="text-[10px] font-bold tracking-wider text-orange-400/70">
                ADMIN PANEL
              </span>
            </div>
          </button>
          <button
            className="md:hidden p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white border-0 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-0 cursor-pointer ${
                activePage === item.id
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              style={
                activePage === item.id
                  ? {
                      background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(234,88,12,0.1) 100%)',
                      boxShadow: '0 2px 12px rgba(249,115,22,0.15)',
                      border: '1px solid rgba(249,115,22,0.2)',
                    }
                  : { background: 'transparent' }
              }
            >
              <span className={activePage === item.id ? 'text-orange-400' : ''}>{item.icon}</span>
              <span>{item.label}</span>
              {activePage === item.id && (
                <ChevronRight size={16} className="ml-auto text-orange-400/60" />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer — Admin Profile */}
        <div className="px-4 pb-4 shrink-0">
          <div
            className="rounded-xl p-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-orange-400"
                style={{ background: 'rgba(249,115,22,0.12)' }}
              >
                <Shield size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{adminName}</p>
                <p className="text-[11px] text-slate-500">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 h-9 rounded-lg text-xs font-bold text-red-400 border-0 cursor-pointer transition-all hover:bg-red-500/10"
              style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239,68,68,0.12)' }}
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header Bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between h-[72px] px-6 shrink-0 backdrop-blur-xl"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white border-0 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-white capitalize">
                {activePage === 'gold-rates' ? 'Gold Rates' : activePage}
              </h2>
              <p className="text-xs text-slate-500">
                {activePage === 'dashboard' && 'Overview of your business'}
                {activePage === 'gold-rates' && 'Manage your shop gold & silver rates'}
                {activePage === 'branches' && 'Manage your branch locations'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400">System Online</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto" style={{ background: '#0B1120' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
