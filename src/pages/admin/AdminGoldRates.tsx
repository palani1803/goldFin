import { useState, useEffect } from 'react'
import {
  Coins, Save, RefreshCw, Check, AlertCircle, TrendingUp, TrendingDown,
  Edit3, X, Loader2
} from 'lucide-react'
import { useSiteSettings } from '../../hooks/useSiteSettings'

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
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahesh Bankers'
  const [shopRates, setShopRates] = useState<ShopRate[]>([])
  const [marketRates, setMarketRates] = useState<MarketRate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const getAuthToken = () => localStorage.getItem('adminToken') || ''

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
    setEditValue(rate.pricePerGram ? rate.pricePerGram.toString() : '')
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
      const activeToken = getAuthToken()
      const res = await fetch(`/api/shop-rates/${purityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`,
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
      // Broadcast update across tabs and components
      try {
        localStorage.setItem('goldFin_shop_rates_updated', Date.now().toString())
        window.dispatchEvent(new CustomEvent('goldRatesUpdated'))
      } catch (e) {
        console.log('Event dispatch error:', e)
      }

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
    '24k': { bg: '#FFFBEB', border: '#FDE68A', text: '#D97706' },
    '22k': { bg: '#FFF7ED', border: '#FED7AA', text: '#EA580C' },
    '20k': { bg: '#FFF1F2', border: '#FECDD3', text: '#E11D48' },
    '18k': { bg: '#F0FDF4', border: '#BBF7D0', text: '#16A34A' },
  }

  // Derive calculated rates for 20k and 18k based on 22k (or 24k)
  const rate24k = shopRates.find((s) => s.purityId === '24k')?.pricePerGram || 0
  const rate22k = shopRates.find((s) => s.purityId === '22k')?.pricePerGram || 0
  const baseRate = rate22k > 0 ? rate22k : rate24k
  const baseKarat = rate22k > 0 ? 22 : 24
  const calc20k = baseRate > 0 ? Math.round((baseRate / baseKarat) * 20) : 0
  const calc18k = baseRate > 0 ? Math.round((baseRate / baseKarat) * 18) : 0

  const handleAutoFill20k18k = async () => {
    if (!calc20k && !calc18k) return
    setSaving(true)
    setErrorMsg('')
    try {
      const activeToken = getAuthToken()
      const updates = []
      if (calc20k > 0) {
        updates.push(
          fetch('/api/shop-rates/20k', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${activeToken}` },
            body: JSON.stringify({ pricePerGram: calc20k }),
          })
        )
      }
      if (calc18k > 0) {
        updates.push(
          fetch('/api/shop-rates/18k', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${activeToken}` },
            body: JSON.stringify({ pricePerGram: calc18k }),
          })
        )
      }
      await Promise.all(updates)
      await fetchRates()
      try {
        localStorage.setItem('goldFin_shop_rates_updated', Date.now().toString())
        window.dispatchEvent(new CustomEvent('goldRatesUpdated'))
      } catch (e) {
        console.log(e)
      }
      setSuccessMsg('Successfully auto-set 20K & 18K prices based on 22K rate!')
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to auto-set rates')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw size={28} className="text-orange-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Home Page Live Sync</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Coins size={26} className="text-orange-600" />
            {companyName} Official Gold Rates
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Set your shop's offered gold prices (24K, 22K, 20K, 18K). If 20K or 18K is not manually fixed, it is automatically derived from your 22K rate.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {baseRate > 0 && (
            <button
              onClick={handleAutoFill20k18k}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200/90 cursor-pointer transition-all shadow-xs active:scale-95"
              title="Auto-calculate and save 20K and 18K proportionally from 22K"
            >
              <Coins size={14} className={saving ? 'animate-spin' : ''} />
              <span>{saving ? 'Calculating...' : '⚡ Auto-Set 20K & 18K from 22K'}</span>
            </button>
          )}

          <button
            onClick={fetchRates}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs cursor-pointer transition-all active:scale-95"
          >
            <RefreshCw size={16} />
            Refresh Rates
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs">
          <Check size={18} className="text-emerald-600" />
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-rose-50 border border-rose-200 text-rose-800 shadow-xs">
          <AlertCircle size={18} className="text-rose-600" />
          {errorMsg}
          <button
            onClick={() => setErrorMsg('')}
            className="ml-auto text-rose-500 hover:text-rose-700 bg-transparent border-0 cursor-pointer p-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Rates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
        {['24k', '22k', '20k', '18k'].map((purityKey) => {
          const rate = shopRates.find((s) => s.purityId === purityKey) || {
            _id: purityKey,
            purityId: purityKey,
            name: `GOLD ${purityKey.toUpperCase()}`,
            karat: purityKey === '24k' ? '24K • 99.9% Pure' : purityKey === '22k' ? '22K • 91.6% Pure' : purityKey === '20k' ? '20K • 83.3% Pure' : '18K • 75.0% Pure',
            pricePerGram: 0,
            unit: 'per gram',
            updatedAt: new Date().toISOString(),
          }
          const market = getMarketRate(rate.purityId)
          const colors = purityColors[rate.purityId] || purityColors['18k']
          const isEditing = editingId === rate.purityId
          const marketPrice = market?.pricePerGram || 0

          const displayName =
            purityKey === '24k' ? 'Gold 24K' :
            purityKey === '22k' ? 'Gold 22K' :
            purityKey === '20k' ? 'Gold 20K' : 'Gold 18K'

          const displayKarat =
            purityKey === '24k' ? '99.9% Pure' :
            purityKey === '22k' ? '91.6% Pure' :
            purityKey === '20k' ? '83.3% Pure' : '75.0% Pure'

          const derivedPrice = purityKey === '20k' ? calc20k : purityKey === '18k' ? calc18k : 0
          const hasManualPrice = rate.pricePerGram > 0
          const displayPrice = hasManualPrice ? rate.pricePerGram : derivedPrice

          return (
            <div
              key={rate.purityId}
              className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden h-full bg-white shadow-xs hover:shadow-md ${
                isEditing ? 'border-2 border-orange-500 shadow-orange-500/10' : 'border border-slate-200/90'
              }`}
            >
              <div className="flex flex-col gap-3">
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 shadow-xs"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    >
                      {purityKey.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-black text-slate-900 leading-tight truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-slate-500 font-semibold truncate mt-0.5">
                        {displayKarat}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 bg-orange-50 text-orange-700 border border-orange-200">
                    Live
                  </span>
                </div>

                {/* 1. Live Indian Market Benchmark (Read-Only) */}
                <div className="rounded-xl p-3 bg-slate-50/90 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        Benchmark
                      </span>
                    </div>
                    {market && (
                      <span
                        className="flex items-center gap-0.5 text-[10px] font-bold"
                        style={{ color: market.isUp ? '#059669' : '#DC2626' }}
                      >
                        {market.isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {market.changePercent}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-base sm:text-lg font-black text-slate-900">
                      {marketPrice > 0 ? formatPrice(marketPrice) : 'Fetching...'}
                      <span className="text-[11px] font-semibold text-slate-400 ml-0.5">/g</span>
                    </p>
                    <span className="text-[9px] text-slate-400 font-bold">IBJA/MCX</span>
                  </div>
                </div>

                {/* 2. Shop Offered Gold Price (Editable) */}
                <div className="rounded-xl p-3.5 bg-gradient-to-br from-orange-50/70 via-amber-50/40 to-orange-100/30 border border-orange-200/90 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black text-orange-700 uppercase tracking-wider">
                      🏢 Shop Offer
                    </span>
                    {!isEditing && (
                      <button
                        onClick={() => handleEdit(rate)}
                        className="flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:text-orange-800 bg-transparent border-0 cursor-pointer p-0 transition-colors"
                      >
                        <Edit3 size={12} />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-orange-600">₹</span>
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                          min="0"
                          step="0.01"
                          placeholder="Enter price"
                          className="flex-1 h-9 px-2.5 rounded-lg text-sm font-bold text-slate-900 bg-white border border-orange-300 outline-none w-full shadow-xs focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave(rate.purityId)
                            if (e.key === 'Escape') handleCancel()
                          }}
                        />
                      </div>

                      <div className="flex flex-col gap-1 text-[10px]">
                        {derivedPrice > 0 && !hasManualPrice && (
                          <button
                            type="button"
                            onClick={() => setEditValue(derivedPrice.toString())}
                            className="text-amber-700 hover:text-amber-900 font-bold bg-transparent border-0 cursor-pointer p-0 flex items-center gap-1 text-left"
                          >
                            <span>⚡ Use 22K: ₹{derivedPrice.toLocaleString('en-IN')}</span>
                          </button>
                        )}
                        {marketPrice > 0 && (
                          <button
                            type="button"
                            onClick={() => setEditValue(marketPrice.toString())}
                            className="text-slate-600 hover:text-orange-600 font-bold bg-transparent border-0 cursor-pointer p-0 flex items-center gap-1 text-left"
                          >
                            <span>⚡ Market: ₹{marketPrice.toLocaleString('en-IN')}</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleSave(rate.purityId)}
                          disabled={saving}
                          className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#EA580C] border-0 cursor-pointer transition-all shadow-xs active:scale-95"
                          style={{ opacity: saving ? 0.7 : 1 }}
                        >
                          {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-orange-600 leading-tight">
                        {displayPrice > 0 ? (
                          <>
                            <span>{formatPrice(displayPrice)}</span>
                            <span className="text-xs font-bold text-slate-500 ml-1">/g</span>
                          </>
                        ) : (
                          <span className="text-slate-400 text-sm font-semibold">
                            Not set
                          </span>
                        )}
                      </div>
                      <div className="min-h-[20px] mt-1 flex items-center">
                        {!hasManualPrice && derivedPrice > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded border border-amber-300">
                            ⚡ Auto-Derived (22K)
                          </span>
                        ) : hasManualPrice ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded border border-emerald-300">
                            ✓ Fixed Shop Rate
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              {!isEditing && (
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Status: <strong className={hasManualPrice ? 'text-emerald-600 font-bold' : derivedPrice > 0 ? 'text-amber-600 font-bold' : 'text-slate-400 font-medium'}>{hasManualPrice ? 'Custom' : derivedPrice > 0 ? 'Derived' : 'Unset'}</strong></span>
                  <span className="text-slate-400 font-medium truncate max-w-[110px]">{hasManualPrice ? formatDate(rate.updatedAt) : 'Auto'}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Info Note */}
      <div className="rounded-2xl px-5 py-4 flex items-start gap-3 bg-blue-50/80 border border-blue-200/80 shadow-xs">
        <AlertCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-900 mb-0.5">How Shop Gold Valuation Works</p>
          <p className="text-xs text-blue-800/80 leading-relaxed font-medium">
            <strong>Market Rate</strong> is the live benchmark fetched automatically from IBJA and gold exchanges.
            <br />
            <strong>Your Shop Rate</strong> is what you offer your customers — set your price and click Save. All 4 regional branches and customer calculators sync immediately.
          </p>
        </div>
      </div>
    </div>
  )
}
