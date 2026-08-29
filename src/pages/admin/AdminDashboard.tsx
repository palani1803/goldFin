import { useState, useEffect } from 'react'
import { Coins, Building2, TrendingUp, ArrowRight, RefreshCw, Settings as SettingsIcon } from 'lucide-react'
import { useSiteSettings } from '../../hooks/useSiteSettings'

interface AdminDashboardProps {
  onNavigateTo: (page: 'dashboard' | 'gold-rates' | 'branches' | 'settings') => void
}

interface DashboardStats {
  totalBranches: number
  activeBranches: number
  totalShopRates: number
  ratesWithPrice: number
}

export default function AdminDashboard({ onNavigateTo }: AdminDashboardProps) {
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahes Bankers'
  const rawAdminName = typeof window !== 'undefined' ? localStorage.getItem('adminName') || '' : ''
  const displayAdminName = rawAdminName && !rawAdminName.toLowerCase().includes('goldfin')
    ? rawAdminName
    : `${companyName} Admin`

  const [stats, setStats] = useState<DashboardStats>({
    totalBranches: 0,
    activeBranches: 0,
    totalShopRates: 0,
    ratesWithPrice: 0,
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const [branchRes, shopRateRes] = await Promise.all([
        fetch('/api/branches'),
        fetch('/api/shop-rates'),
      ])
      const branchData = await branchRes.json()
      const shopRateData = await shopRateRes.json()

      const branches = branchData.data || []
      const goldShopRates = (shopRateData.data || []).filter((r: any) => r.purityId !== 'silver')

      setStats({
        totalBranches: branches.length,
        activeBranches: branches.filter((b: any) => b.isActive).length,
        totalShopRates: goldShopRates.length || 4,
        ratesWithPrice: goldShopRates.filter((r: any) => r.pricePerGram > 0).length,
      })
    } catch {
      // Stats will remain 0
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const statCards = [
    {
      label: 'Total Branches',
      value: stats.totalBranches,
      subtitle: `${stats.activeBranches} active regional hubs`,
      icon: <Building2 size={22} />,
      bg: 'bg-white',
      borderColor: 'border-blue-100',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      textColor: 'text-blue-600',
    },
    {
      label: 'Shop Rates Set',
      value: `${stats.ratesWithPrice}/${stats.totalShopRates}`,
      subtitle: 'gold purities configured',
      icon: <Coins size={22} />,
      bg: 'bg-white',
      borderColor: 'border-orange-100',
      iconBg: 'bg-orange-50 text-orange-600 border-orange-200',
      textColor: 'text-orange-600',
    },
    {
      label: 'Market Status',
      value: 'Live',
      subtitle: 'IBJA/MCX daily benchmarks',
      icon: <TrendingUp size={22} />,
      bg: 'bg-white',
      borderColor: 'border-emerald-100',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      textColor: 'text-emerald-600',
    },
  ]

  const quickActions = [
    {
      label: 'Update Gold Rates',
      description: 'Set your shop\'s live offered 24K, 22K, 20K & 18K prices',
      icon: <Coins size={22} />,
      page: 'gold-rates' as const,
      gradient: 'from-[#FF6B00] to-[#EA580C]',
      borderHover: 'hover:border-orange-300',
    },
    {
      label: 'Manage Branches',
      description: 'Add, edit, or configure your 4 official regional locations',
      icon: <Building2 size={22} />,
      page: 'branches' as const,
      gradient: 'from-blue-500 to-indigo-600',
      borderHover: 'hover:border-blue-300',
    },
    {
      label: 'Brand & Logo Settings',
      description: 'Change site name, official phone, and login credentials',
      icon: <SettingsIcon size={22} />,
      page: 'settings' as const,
      gradient: 'from-emerald-500 to-teal-600',
      borderHover: 'hover:border-emerald-300',
    },
  ]

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 md:p-8 relative overflow-hidden bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 border border-orange-200/80 shadow-xs">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Coins size={13} className="text-orange-600" />
            <span>EXECUTIVE DASHBOARD</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Welcome back, {displayAdminName} 👋
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Manage your store's live gold rates, branch locations, and site settings from this dashboard.
            All price changes synchronize live to the customer application.
          </p>
        </div>
        {/* Decorative ambient ring */}
        <div
          className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)' }}
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`rounded-2xl p-5 bg-white border ${card.borderColor} shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs ${card.iconBg}`}>
                {card.icon}
              </div>
              {loading ? (
                <RefreshCw size={16} className="text-slate-400 animate-spin" />
              ) : (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Live
                </span>
              )}
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 mb-0.5">
                {loading ? '—' : card.value}
              </p>
              <p className="text-sm font-bold text-slate-700">{card.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Quick Actions</h2>
            <p className="text-xs text-slate-500">Fast shortcuts to your most frequent admin tasks</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigateTo(action.page)}
              className={`group rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.01] bg-white border border-slate-200/80 shadow-xs hover:shadow-md ${action.borderHover} cursor-pointer flex items-center gap-4`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md bg-gradient-to-tr ${action.gradient}`}
              >
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors mb-0.5 truncate">
                  {action.label}
                </p>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {action.description}
                </p>
              </div>
              <ArrowRight
                size={18}
                className="text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all shrink-0"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
