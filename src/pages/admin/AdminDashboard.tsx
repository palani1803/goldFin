import { useState, useEffect } from 'react'
import { Coins, Building2, TrendingUp, ArrowRight, RefreshCw } from 'lucide-react'

interface AdminDashboardProps {
  onNavigateTo: (page: 'dashboard' | 'gold-rates' | 'branches') => void
}

interface DashboardStats {
  totalBranches: number
  activeBranches: number
  totalShopRates: number
  ratesWithPrice: number
}

export default function AdminDashboard({ onNavigateTo }: AdminDashboardProps) {
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
      const shopRates = shopRateData.data || []

      setStats({
        totalBranches: branches.length,
        activeBranches: branches.filter((b: any) => b.isActive).length,
        totalShopRates: shopRates.length,
        ratesWithPrice: shopRates.filter((r: any) => r.pricePerGram > 0).length,
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
      subtitle: `${stats.activeBranches} active`,
      icon: <Building2 size={24} />,
      gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.08) 100%)',
      iconBg: 'rgba(59,130,246,0.15)',
      iconColor: '#60A5FA',
      borderColor: 'rgba(59,130,246,0.15)',
    },
    {
      label: 'Shop Rates Set',
      value: `${stats.ratesWithPrice}/${stats.totalShopRates}`,
      subtitle: 'purities configured',
      icon: <Coins size={24} />,
      gradient: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.08) 100%)',
      iconBg: 'rgba(249,115,22,0.15)',
      iconColor: '#FB923C',
      borderColor: 'rgba(249,115,22,0.15)',
    },
    {
      label: 'Market Status',
      value: 'Live',
      subtitle: 'Auto-updated daily',
      icon: <TrendingUp size={24} />,
      gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.08) 100%)',
      iconBg: 'rgba(16,185,129,0.15)',
      iconColor: '#34D399',
      borderColor: 'rgba(16,185,129,0.15)',
    },
  ]

  const quickActions = [
    {
      label: 'Update Gold Rates',
      description: 'Set your shop\'s offered gold & silver prices',
      icon: <Coins size={22} />,
      page: 'gold-rates' as const,
      gradient: 'linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)',
    },
    {
      label: 'Manage Branches',
      description: 'Add, edit, or remove branch locations',
      icon: <Building2 size={22} />,
      page: 'branches' as const,
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    },
  ]

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(234,88,12,0.05) 100%)',
          border: '1px solid rgba(249,115,22,0.12)',
        }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            Welcome back, {localStorage.getItem('adminName') || 'Admin'} 👋
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl">
            Manage your shop's gold rates and branch locations from this dashboard.
            Keep your offered prices up to date for your customers.
          </p>
        </div>
        {/* Decorative */}
        <div
          className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 70%)' }}
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: card.gradient,
              border: `1px solid ${card.borderColor}`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: card.iconBg, color: card.iconColor }}
              >
                {card.icon}
              </div>
              {loading && (
                <RefreshCw size={16} className="text-slate-500 animate-spin" />
              )}
            </div>
            <p className="text-2xl font-extrabold text-white mb-1">
              {loading ? '—' : card.value}
            </p>
            <p className="text-sm font-semibold text-slate-400">{card.label}</p>
            <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigateTo(action.page)}
              className="group rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] border-0 cursor-pointer flex items-center gap-5"
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.2)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ background: action.gradient }}
              >
                {action.icon}
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-white mb-1">{action.label}</p>
                <p className="text-sm text-slate-400">{action.description}</p>
              </div>
              <ArrowRight
                size={20}
                className="text-slate-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all shrink-0"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
