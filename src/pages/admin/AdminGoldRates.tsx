import { useState, useEffect } from 'react'
import {
  Coins, Save, RefreshCw, Check, AlertCircle, TrendingUp, TrendingDown,
  Edit3, X, Loader2
} from 'lucide-react'

interface ShopRate {
  _id: string
  purityId: string
  name: string
  karat: string
  pricePerGram: number
  unit: string
  updatedAt: string
}

interface MarketRate {
  purityId: string
  name: string
  pricePerGram: number
  changePercent: number
  isUp: boolean
}

export default function AdminGoldRates() {
  const [shopRates, setShopRates] = useState<ShopRate[]>([])
  const [marketRates, setMarketRates] = useState<MarketRate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const token = localStorage.getItem('adminToken') || ''

  const fetchRates = async () => {
    setLoading(true)
    try {
      const [shopRes, marketRes] = await Promise.all([
        fetch('/api/shop-rates'),
        fetch('/api/gold-rates'),
      ])
      const shopData = await shopRes.json()
      const marketData = await marketRes.json()

      setShopRates(shopData.data || [])
      setMarketRates(marketData.data || [])
    } catch {
      setErrorMsg('Failed to fetch rates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  const seedShopRates = async () => {
    try {
      await fetch('/api/shop-rates/seed', { method: 'POST' })
      await fetchRates()
    } catch {
      setErrorMsg('Failed to seed shop rates')
    }
  }

  useEffect(() => {
    // Auto-seed if no shop rates exist
    if (!loading && shopRates.length === 0) {
      seedShopRates()
    }
  }, [loading, shopRates.length])

  const handleEdit = (rate: ShopRate) => {
    setEditingId(rate.purityId)
    setEditValue(rate.pricePerGram.toString())
    setSuccessMsg('')
    setErrorMsg('')
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValue('')
  }

  const handleSave = async (purityId: string) => {
    const price = parseFloat(editValue)
    if (isNaN(price) || price < 0) {
      setErrorMsg('Please enter a valid price')
      return
    }

    setSaving(true)
    setErrorMsg('')
    try {
      const res = await fetch(`/api/shop-rates/${purityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pricePerGram: price }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update rate')
      }

      setShopRates((prev) =>
        prev.map((r) =>
          r.purityId === purityId ? { ...r, pricePerGram: price, updatedAt: new Date().toISOString() } : r
        )
      )
      setEditingId(null)
      setEditValue('')
      setSuccessMsg(`${purityId.toUpperCase()} rate updated successfully!`)
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setErrorMsg(err.message)
    } finally {
      setSaving(false)
    }
  }

  const getMarketRate = (purityId: string): MarketRate | undefined => {
    return marketRates.find((r) => r.purityId === purityId)
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const purityColors: Record<string, { bg: string; border: string; text: string }> = {
    '24k': { bg: 'rgba(255,215,0,0.1)', border: 'rgba(255,215,0,0.2)', text: '#FFD700' },
    '22k': { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)', text: '#FBBF24' },
    '20k': { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', text: '#F59E0B' },
    '18k': { bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)', text: '#FB923C' },
    silver: { bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)', text: '#94A3B8' },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw size={28} className="text-orange-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Home Page Live Sync</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <Coins size={26} className="text-orange-400" />
            GoldFin Finance Gold Rates
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Set your finance company's offered gold prices. These prices update the <strong>"GoldFin Finance Gold Price"</strong> section on the Home Page and are used for customer gold loan valuations.
          </p>
        </div>
        <button
          onClick={fetchRates}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 border-0 cursor-pointer transition-all hover:text-white"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <RefreshCw size={16} />
          Refresh Rates
        </button>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.2)',
            color: '#6EE7B7',
          }}
        >
          <Check size={18} />
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#FCA5A5',
          }}
        >
          <AlertCircle size={18} />
          {errorMsg}
          <button
            onClick={() => setErrorMsg('')}
            className="ml-auto text-red-400/60 hover:text-red-400 bg-transparent border-0 cursor-pointer p-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Rates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {['24k', '22k', '20k', '18k', 'silver'].map((purityKey) => {
          const rate = shopRates.find((s) => s.purityId === purityKey) || {
            _id: purityKey,
            purityId: purityKey,
            name: purityKey === 'silver' ? 'SILVER 999' : `GOLD ${purityKey.toUpperCase()}`,
            karat: purityKey === '24k' ? '24K (99.9% Pure)' : purityKey === '22k' ? '22K (91.6% Pure)' : purityKey === '20k' ? '20K (83.3% Pure)' : purityKey === '18k' ? '18K (75.0% Pure)' : '99.9% Fine Silver',
            pricePerGram: 0,
            unit: 'per gram',
            updatedAt: new Date().toISOString(),
          }
          const market = getMarketRate(rate.purityId)
          const colors = purityColors[rate.purityId] || purityColors['18k']
          const isEditing = editingId === rate.purityId
          const marketPrice = market?.pricePerGram || 0

          return (
            <div
              key={rate.purityId}
              className="rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                border: isEditing ? `1.5px solid ${colors.text}` : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isEditing ? `0 0 25px ${colors.bg}` : '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-extrabold shadow-sm"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    >
                      {rate.purityId === 'silver' ? 'Ag' : rate.purityId.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-base font-bold text-white leading-tight">{rate.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{rate.karat}</p>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      background: 'rgba(249,115,22,0.12)',
                      color: '#FB923C',
                      border: '1px solid rgba(249,115,22,0.25)',
                    }}
                  >
                    Home Page Rate
                  </span>
                </div>

                {/* 1. Live Indian Market Benchmark (Read-Only) */}
                <div
                  className="rounded-xl p-3 mb-4"
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Indian Market Price (Live)
                      </span>
                    </div>
                    {market && (
                      <span
                        className="flex items-center gap-0.5 text-[11px] font-bold"
                        style={{ color: market.isUp ? '#34D399' : '#F87171' }}
                      >
                        {market.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {market.changePercent}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-lg font-extrabold text-white">
                      {marketPrice > 0 ? formatPrice(marketPrice) : 'Fetching live...'}
                      <span className="text-xs font-normal text-slate-400 ml-1">/gram</span>
                    </p>
                    <span className="text-[10px] text-slate-500 font-medium">Auto-fetched (IBJA/MCX)</span>
                  </div>
                </div>

                {/* 2. Our Company Gold Price (Editable) */}
                <div
                  className="rounded-xl p-3.5 mb-3"
                  style={{
                    background: 'rgba(249, 115, 22, 0.06)',
                    border: '1px solid rgba(249, 115, 22, 0.18)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                      🏢 Our Company Gold Price
                    </span>
                    {!isEditing && (
                      <button
                        onClick={() => handleEdit(rate)}
                        className="flex items-center gap-1 text-[11px] font-bold text-orange-300 hover:text-white bg-transparent border-0 cursor-pointer p-0 transition-colors"
                      >
                        <Edit3 size={13} />
                        <span>Edit Price</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-orange-400">₹</span>
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                          min="0"
                          step="0.01"
                          placeholder="Enter your price"
                          className="flex-1 h-10 px-3 rounded-lg text-base font-bold text-white outline-none"
                          style={{
                            background: 'rgba(15, 23, 42, 0.8)',
                            border: '1.5px solid rgba(249,115,22,0.4)',
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave(rate.purityId)
                            if (e.key === 'Escape') handleCancel()
                          }}
                        />
                      </div>

                      {marketPrice > 0 && (
                        <button
                          type="button"
                          onClick={() => setEditValue(marketPrice.toString())}
                          className="text-[11px] text-slate-400 hover:text-orange-300 bg-transparent border-0 cursor-pointer p-0 flex items-center gap-1"
                        >
                          <span>⚡ Use Market Price: ₹{marketPrice.toLocaleString('en-IN')}</span>
                        </button>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleSave(rate.purityId)}
                          disabled={saving}
                          className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-bold text-white border-0 cursor-pointer transition-all"
                          style={{
                            background: 'linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)',
                            opacity: saving ? 0.6 : 1,
                          }}
                        >
                          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                          <span>{saving ? 'Saving...' : 'Save Price'}</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="h-9 px-3 rounded-lg text-xs font-semibold text-slate-400 border-0 cursor-pointer hover:text-white"
                          style={{ background: 'rgba(255,255,255,0.06)' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-2xl font-black text-white">
                        {rate.pricePerGram > 0 ? (
                          <>
                            <span style={{ color: colors.text }}>{formatPrice(rate.pricePerGram)}</span>
                            <span className="text-xs font-medium text-slate-400 ml-1">/{rate.unit}</span>
                          </>
                        ) : (
                          <span className="text-slate-500 text-base font-semibold">
                            Not set (shows "₹ —" on site)
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              {!isEditing && (
                <div className="pt-2 border-t flex items-center justify-between text-[11px] text-slate-500" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <span>Status: <strong className={rate.pricePerGram > 0 ? 'text-emerald-400' : 'text-slate-400'}>{rate.pricePerGram > 0 ? 'Active on Home' : 'Unset'}</strong></span>
                  {rate.pricePerGram > 0 && <span>{formatDate(rate.updatedAt)}</span>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Info Note */}
      <div
        className="rounded-xl px-5 py-4 flex items-start gap-3"
        style={{
          background: 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(59,130,246,0.12)',
        }}
      >
        <AlertCircle size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-300 mb-1">How it works</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Market Rate</strong> is the live price fetched automatically from gold exchanges.
            <br />
            <strong>Your Shop Rate</strong> is what you offer to your customers — type your price and hit Save.
            This will be displayed on your website.
          </p>
        </div>
      </div>
    </div>
  )
}
