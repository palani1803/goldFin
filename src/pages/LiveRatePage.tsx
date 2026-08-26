import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Sliders,
  Award,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  X,
  Coins,
  Sparkles
} from 'lucide-react'
import { Navbar, Footer, GoldBackground } from '../components'

interface PurityRate {
  purityId: string
  name: string
  karat: string
  pricePerGram: number
  previousPrice: number
  unit: string
  changePercent: number
  isUp: boolean
  lastUpdated: string
}

interface ShopRate {
  _id?: string
  purityId: string
  name: string
  karat: string
  pricePerGram: number
  unit?: string
  updatedAt?: string
}

interface HistoryPoint {
  label: string
  time: string
  price: number
  price22k?: number
  high?: number
  low?: number
  changePercent?: number
}

interface LiveRatePageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateContact?: (city?: string) => void
  onNavigateTo?: (page: string) => void
}

export default function LiveRatePage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
  onNavigateTo,
}: LiveRatePageProps) {
  // Live rates state
  const [liveRates, setLiveRates] = useState<PurityRate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string>('17 Aug 2026')
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('10:00 AM')

  // GoldFin Finance Company Rates state
  const [shopRates, setShopRates] = useState<ShopRate[]>([])
  const [shopRatesLoading, setShopRatesLoading] = useState<boolean>(true)

  // Timeframe filter for the chart: Today, 7 Days, 30 Days
  const [timeframe, setTimeframe] = useState<'today' | '7days' | '30days'>('today')
  const [historyData, setHistoryData] = useState<HistoryPoint[]>([])
  const [historyLoading, setHistoryLoading] = useState<boolean>(true)

  // Active chart hover index
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null)

  // Countdown timer for next market update
  const [countdownSeconds, setCountdownSeconds] = useState<number>(892)

  // Modals state
  const [activeInfoModal, setActiveInfoModal] = useState<{ title: string; content: string; icon: string } | null>(null)
  const [applyModalOpen, setApplyModalOpen] = useState(false)

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 900))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Format countdown mm:ss
  const formattedCountdown = useMemo(() => {
    const mins = Math.floor(countdownSeconds / 60)
    const secs = countdownSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}s`
  }, [countdownSeconds])

  // Fetch live rates from backend
  const fetchRates = useCallback(async () => {
    try {
      const res = await fetch('/api/gold-rates')
      const json = await res.json()
      if (json.success && json.data.length > 0) {
        setLiveRates(json.data)

        const latest = json.data.reduce((acc: string, item: PurityRate) => {
          return item.lastUpdated > acc ? item.lastUpdated : acc
        }, json.data[0].lastUpdated || '')

        if (latest) {
          const d = new Date(latest)
          setLastUpdatedDate(d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }))
          setLastUpdatedTime(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
        }
      }
    } catch (err) {
      console.error('Error fetching live gold rates:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch historical data for charts
  const fetchHistory = useCallback(async (tf: 'today' | '7days' | '30days') => {
    setHistoryLoading(true)
    try {
      const res = await fetch(`/api/gold-rates/history?range=${tf}`)
      const json = await res.json()
      if (json.success && json.data.length > 0) {
        setHistoryData(json.data)
        setHoveredPointIndex(null)
      }
    } catch (err) {
      console.error('Error fetching gold price history:', err)
    } finally {
      setHistoryLoading(false)
    }
  }, [])

  // Fetch GoldFin Finance company rates from backend API
  const fetchShopRates = useCallback(async () => {
    try {
      const res = await fetch('/api/shop-rates')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setShopRates(json.data)
      }
    } catch (err) {
      console.error('Error fetching shop rates:', err)
    } finally {
      setShopRatesLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
    fetchShopRates()
    const interval = setInterval(() => {
      fetchRates()
      fetchShopRates()
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchRates, fetchShopRates])

  useEffect(() => {
    fetchHistory(timeframe)
  }, [timeframe, fetchHistory])

  // Derived price values strictly per 1 gram
  const rate24k = liveRates.find((r) => r.purityId === '24k')
  const rate22k = liveRates.find((r) => r.purityId === '22k')

  const price24kPerGram = rate24k?.pricePerGram || 13535
  const price22kPerGram = rate22k?.pricePerGram || 12407

  const change24k = rate24k?.changePercent ?? 0.81
  const isUp24k = rate24k?.isUp ?? true

  const change22k = rate22k?.changePercent ?? 0.81
  const isUp22k = rate22k?.isUp ?? true

  // Calculated high, low, average from active chart
  const currentPrices = historyData.map((d) => d.price)
  const highPrice = currentPrices.length > 0 ? Math.max(...currentPrices) : price24kPerGram + 50
  const lowPrice = currentPrices.length > 0 ? Math.min(...currentPrices) : price24kPerGram - 50
  const avgPrice = currentPrices.length > 0 ? Math.round(currentPrices.reduce((acc, p) => acc + p, 0) / currentPrices.length) : price24kPerGram

  // Chart scaling math
  const minChartPrice = Math.floor((lowPrice * 0.996) / 50) * 50
  const maxChartPrice = Math.ceil((highPrice * 1.004) / 50) * 50
  const priceRange = maxChartPrice - minChartPrice || 100

  // Generate 4 Y-axis label levels
  const yAxisLevels = useMemo(() => {
    const step = priceRange / 3
    return [
      Math.round(maxChartPrice),
      Math.round(maxChartPrice - step),
      Math.round(maxChartPrice - step * 2),
      Math.round(minChartPrice),
    ]
  }, [maxChartPrice, minChartPrice, priceRange])

  // Map history points to SVG coordinates (width: 650, height: 230)
  const svgPoints = useMemo(() => {
    if (historyData.length === 0) return []
    const width = 650
    const paddingX = 40
    const usableWidth = width - paddingX * 2
    const height = 230
    const paddingY = 25
    const usableHeight = height - paddingY * 2

    return historyData.map((pt, i) => {
      const x = paddingX + (i / (historyData.length - 1 || 1)) * usableWidth
      const normalizedY = (pt.price - minChartPrice) / priceRange
      const y = height - paddingY - normalizedY * usableHeight
      return { ...pt, x, y }
    })
  }, [historyData, minChartPrice, priceRange])

  // Build SVG smooth cubic bezier path
  const svgPathD = useMemo(() => {
    if (svgPoints.length < 2) return ''
    let d = `M ${svgPoints[0].x} ${svgPoints[0].y}`
    for (let i = 0; i < svgPoints.length - 1; i++) {
      const current = svgPoints[i]
      const next = svgPoints[i + 1]
      const controlX1 = current.x + (next.x - current.x) / 2
      const controlY1 = current.y
      const controlX2 = current.x + (next.x - current.x) / 2
      const controlY2 = next.y
      d += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${next.x} ${next.y}`
    }
    return d
  }, [svgPoints])

  // Active hover point
  const activePoint = hoveredPointIndex !== null && svgPoints[hoveredPointIndex]
    ? svgPoints[hoveredPointIndex]
    : svgPoints[svgPoints.length - 1] || null

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Reusable White & Orange Ambient Background */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="live-rate"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout || (() => onNavigateTo && onNavigateTo('about'))}
        onNavigateLiveRate={() => {}}
        onNavigateGoldLoan={onNavigateGoldLoan || (() => onNavigateTo && onNavigateTo('gold-loan'))}
        onNavigateBranches={onNavigateBranches || (() => onNavigateTo && onNavigateTo('branches'))}
        onNavigateContact={onNavigateContact || (() => onNavigateTo && onNavigateTo('contact'))}
        onScrollToSection={(sectionId) => {
          if (onNavigateHome) {
            onNavigateHome()
            setTimeout(() => {
              const el = document.getElementById(sectionId)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }
        }}
        spotRate24K={price24kPerGram}
      />

      {/* Main Container */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-10 md:py-14 relative z-10 w-full flex flex-col gap-10 md:gap-12">
        {/* Breadcrumb & Hero Title */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              முகப்பு (Home)
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">நேரடி தங்க விலை (Live Rates)</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit">
                <Sparkles size={14} />
                <span>அதிகாரப்பூர்வ நேரடி விலை • OFFICIAL LIVE BENCHMARK</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-[3.3rem] font-black text-slate-900 tracking-tight leading-[1.15]">
                இன்றைய நேரடி <br />
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  தங்கம் விலை நிலவரம்
                </span>
                <span className="block text-lg sm:text-2xl font-bold text-slate-500 mt-1">
                  Today's Live Gold Rates (IBJA / MCX Benchmarks)
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
                இந்திய சந்தை நிலவரப்படி நேரடி 24K, 22K, 20K, 18K மற்றும் 8 கிராம் சவரன் விலை நிலவரங்கள். Transparent live Indian benchmark rates updated continuously.
              </p>
            </div>

            {/* Pure 1 Gram Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-orange-300 text-xs font-bold text-orange-600 self-start md:self-auto shadow-sm backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% நேரடி தரவு • Live IBJA Feed</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Top Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 22K PRICE (1g) */}
          <div className="p-6 md:p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-400/45 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-600">
                22K ஆபரண தங்கம் • 22K (1g)
              </span>
              <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                isUp22k
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                  : 'text-rose-700 bg-rose-50 border border-rose-200'
              }`}>
                {isUp22k ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{isUp22k ? `+${change22k}%` : `-${change22k}%`}</span>
              </div>
            </div>

            <div className="my-3">
              <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors tracking-tight">
                {loading ? '...' : `₹${price22kPerGram.toLocaleString('en-IN')}`}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                91.6% தூய்மை (916 BIS ஹால்மார்க்) • 1 கிராம்
              </span>
            </div>

            <div className="w-2/3 h-[2px] bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-transparent rounded-full mt-1" />
          </div>

          {/* Card 2: 24K PRICE (1g) */}
          <div className="p-6 md:p-7 rounded-3xl bg-white border border-orange-300/80 hover:border-orange-500 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-[0_8px_30px_rgba(249,115,22,0.1)] hover:shadow-[0_12px_35px_rgba(249,115,22,0.18)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-600">
                24K சுத்த தங்கம் • 24K Pure (1g)
              </span>
              <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                isUp24k
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                  : 'text-rose-700 bg-rose-50 border border-rose-200'
              }`}>
                {isUp24k ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{isUp24k ? `+${change24k}%` : `-${change24k}%`}</span>
              </div>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  ₹{price24kPerGram.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-semibold">/ கிராம் (gram)</span>
              </div>
              <span className="text-[11px] text-orange-600 font-semibold block mt-1">
                99.9% தூய்மை • சர்வதேச முதலீட்டு தரம் (999 Pure)
              </span>
            </div>

            <div className="w-1/2 h-[1.5px] bg-orange-400 rounded-full mt-1" />
          </div>

          {/* Card 3: LAST UPDATED */}
          <div className="p-6 md:p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-400/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              கடைசியாக புதுப்பித்தது • LAST UPDATED
            </span>

            <div className="my-2">
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lastUpdatedDate}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold mt-1">
                <Clock size={14} />
                <span>{lastUpdatedTime} IST</span>
              </div>
            </div>

            <div className="w-1/2 h-[1px] bg-slate-200 rounded-full mt-1" />
          </div>

          {/* Card 4: MARKET STATUS */}
          <div className="p-6 md:p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-400/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              சந்தை நிலை • MARKET STATUS
            </span>

            <div className="my-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-2xl md:text-3xl font-extrabold text-emerald-600 tracking-tight">
                  நேரலை • Active
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                அடுத்த புதுப்பிப்பு • Next in: <span className="text-orange-600 font-bold">{formattedCountdown}</span>
              </div>
            </div>

            <div className="w-1/2 h-[1px] bg-slate-200 rounded-full mt-1" />
          </div>
        </div>

        {/* GoldFin Finance Company Offered Rates */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                கோல்ட்பின் நிதி நிறுவன நேரடி கடன் விகிதம் • GOLDFIN BRANCH RATES
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                கோல்ட்பின் அதிகாரப்பூர்வ கடன் & கொள்முதல் விலை <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">GoldFin Official Loan & Branch Rates</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-normal mt-0.5">
                எங்கள் மண்டல கிளைகளில் வழங்கப்படும் அதிகபட்ச கடன் மற்றும் நேரடி மதிப்பீட்டு விலை. Live spot loan valuation at all authorized branches.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200/80 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <Coins size={14} className="text-orange-500" />
              <span>அதிகாரப்பூர்வ கிளை விலை • BRANCH OFFER</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shopRatesLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 backdrop-blur-xl flex flex-col gap-4 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
                  <div className="h-8 bg-slate-200 rounded-lg w-1/2" />
                  <div className="h-3 bg-slate-100 rounded-lg w-full mt-2" />
                </div>
              ))
            ) : (
              ['18k', '20k', '22k', '24k'].map((purityKey) => {
                const shopRate = shopRates.find((s) => s.purityId === purityKey)
                const marketRate = liveRates.find((m) => m.purityId === purityKey)
                const displayName =
                  purityKey === '24k' ? '24K சுத்த தங்கம் • 24K Pure' :
                  purityKey === '22k' ? '22K ஆபரண தங்கம் • 22K (916)' :
                  purityKey === '20k' ? '20K தங்கம் • 20K Gold' : '18K தங்கம் • 18K Gold'
                const displayKarat =
                  purityKey === '24k' ? '99.9% தூய்மை • 1g' :
                  purityKey === '22k' ? '91.6% தூய்மை • 1g' :
                  purityKey === '20k' ? '83.3% தூய்மை • 1g' : '75.0% தூய்மை • 1g'
                const price = shopRate ? shopRate.pricePerGram : (marketRate ? marketRate.pricePerGram : 0)

                return (
                  <div
                    key={purityKey}
                    className="p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30 border border-orange-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-4 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold tracking-wider text-slate-800">{displayName}</span>
                      <span className="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-300">
                        GOLDFIN
                      </span>
                    </div>

                    <div className="text-3xl font-black text-orange-600 group-hover:text-orange-700 transition-colors">
                      ₹{price > 0 ? price.toLocaleString('en-IN') : '...'}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-orange-100 text-xs">
                      <span className="font-semibold text-slate-600">{displayKarat}</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[10px]">
                        உடனடி கடன் • 15 Min
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Gold Price Movement Section with Historical Wave Chart */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col gap-6 relative overflow-hidden">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                தங்க விலை நகர்வு வரைபடம் <span className="block text-sm font-bold text-slate-500 mt-0.5">Historical Gold Price Movement</span>
              </h2>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                இந்திய சந்தை நேரலை போக்கு • Indian Benchmark Live Trend
              </span>
            </div>

            {/* Time Filter Tabs */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setTimeframe('today')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border-0 cursor-pointer ${
                  timeframe === 'today'
                    ? 'bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                }`}
              >
                இன்று • Today
              </button>
              <button
                onClick={() => setTimeframe('7days')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border-0 cursor-pointer ${
                  timeframe === '7days'
                    ? 'bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                }`}
              >
                7 நாட்கள் • 7 Days
              </button>
              <button
                onClick={() => setTimeframe('30days')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border-0 cursor-pointer ${
                  timeframe === '30days'
                    ? 'bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                }`}
              >
                30 நாட்கள் • 30 Days
              </button>
            </div>
          </div>

          {/* SVG Interactive Chart Area */}
          <div className="relative w-full h-[280px] md:h-[320px] mt-2">
            {/* Dynamic Y-axis labels & horizontal guide lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] text-slate-400 font-semibold select-none">
              {yAxisLevels.map((lvl, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-1 flex justify-between">
                  <span>₹{lvl.toLocaleString('en-IN')}/g</span>
                </div>
              ))}
            </div>

            {historyLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#FF6B00] border-t-transparent animate-spin" />
              </div>
            ) : (
              <svg
                viewBox="0 0 650 230"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Orange vertical gradient for fill area under line */}
                  <linearGradient id="orangeGradientFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="#F97316" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                  </linearGradient>

                  {/* Filter for orange neon glow */}
                  <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Area fill under the curve */}
                {svgPathD && svgPoints.length > 0 && (
                  <path
                    d={`${svgPathD} L ${svgPoints[svgPoints.length - 1].x} 220 L ${svgPoints[0].x} 220 Z`}
                    fill="url(#orangeGradientFill)"
                  />
                )}

                {/* Glowing Main Curve Line */}
                {svgPathD && (
                  <path
                    d={svgPathD}
                    fill="none"
                    stroke="#FF6B00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#glowOrange)"
                  />
                )}

                {/* Interactive Data Points */}
                {svgPoints.map((pt, idx) => (
                  <g key={idx} className="cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPointIndex === idx ? '7' : '4.5'}
                      className={`transition-all duration-200 ${
                        hoveredPointIndex === idx
                          ? 'fill-[#FF6B00] stroke-white stroke-[2.5px] shadow-lg'
                          : 'fill-white stroke-[#FF6B00] stroke-2 hover:fill-[#FF6B00]'
                      }`}
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />
                  </g>
                ))}
              </svg>
            )}

            {/* Floating Tooltip Bubble */}
            {activePoint && !historyLoading && (
              <div
                className="absolute z-20 pointer-events-none transition-all duration-200 transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${(activePoint.x / 650) * 100}%`,
                  top: `${(activePoint.y / 230) * 85}%`,
                }}
              >
                <div className="px-4 py-2.5 rounded-2xl bg-white border border-orange-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md flex flex-col gap-0.5 min-w-[130px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {activePoint.time}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-orange-600 whitespace-nowrap">
                      ₹{activePoint.price.toLocaleString('en-IN')}/g
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">24K</span>
                  </div>
                  {activePoint.price22k && (
                    <span className="text-[10px] font-semibold text-slate-600 whitespace-nowrap">
                      22K: ₹{activePoint.price22k.toLocaleString('en-IN')}/g
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* X-axis Date / Time Labels */}
          <div className="flex justify-between items-center px-2 pt-2 text-[11px] md:text-xs font-semibold text-slate-500 border-t border-slate-100 overflow-x-auto gap-2">
            {svgPoints
              .filter((_, idx) => {
                if (timeframe === '30days') return idx % 5 === 0 || idx === svgPoints.length - 1
                return true
              })
              .map((d, i) => (
                <span
                  key={i}
                  className="hover:text-[#FF6B00] transition-colors cursor-pointer whitespace-nowrap"
                  onClick={() => {
                    const originalIdx = svgPoints.findIndex((p) => p.label === d.label)
                    if (originalIdx !== -1) setHoveredPointIndex(originalIdx)
                  }}
                >
                  {d.label}
                </span>
              ))}
          </div>
        </div>

        {/* 4 Stat / High-Low Grid Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl flex flex-col gap-1.5 shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              உச்ச விலை • High
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              ₹{highPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-500 font-medium">24K சுத்த தங்கம் (1g)</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl flex flex-col gap-1.5 shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              குறைந்த விலை • Low
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              ₹{lowPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-500 font-medium">24K சுத்த தங்கம் (1g)</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl flex flex-col gap-1.5 shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              சராசரி விலை • Average
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              ₹{avgPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-500 font-medium">சராசரி சந்தை விலை</span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl flex flex-col gap-1.5 shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              தினசரி மாற்றம் • 24h Change
            </span>
            <div className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isUp24k ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isUp24k ? `+${change24k}%` : `-${change24k}%`}
            </div>
            <span className="text-xs text-slate-500 font-medium">நேற்றைய ஒப்பீடு • vs Yesterday</span>
          </div>
        </div>

        {/* 4 Feature Educational Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Price Factors */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-400/35 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-5 group shadow-sm hover:shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                  <Sliders size={22} />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  விலை நிர்ணயக் காரணிகள் • Gold Price Factors
                </h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                MCX கமாடிட்டி வர்த்தகம், இறக்குமதி வரி, டாலர் மதிப்பு மற்றும் நகைக் கடை சங்கங்கள் இன்றைய தங்க விலையை எவ்வாறு நிர்ணயிக்கின்றன என்பதை அறிக.
              </p>
            </div>
            <button
              onClick={() =>
                setActiveInfoModal({
                  title: 'How Gold Rates are Decided in India',
                  content:
                    'Domestic gold rates in India are determined by MCX market prices, government customs duty, the US Dollar vs Indian Rupee exchange rate, and local city jewellers association rates.',
                  icon: 'factors',
                })
              }
              className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition-colors bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              <span>விளக்கம் • Learn More</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: 22K vs 24K */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-400/35 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-5 group shadow-sm hover:shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                  <Award size={22} />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  22K vs 24K தூய்மை வேறுபாடு • Purity Guide
                </h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                24K சுத்த தங்கம் (நாணயங்கள்/கட்டிகள்) மற்றும் 22K ஹால்மார்க் தங்கம் (ஆபரண நகைகள்) இடையே உள்ள வித்தியாசங்களை அறிந்து கொள்ளுங்கள்.
              </p>
            </div>
            <button
              onClick={() =>
                setActiveInfoModal({
                  title: '22 Karat vs 24 Karat Pure Gold',
                  content:
                    '24 Karat gold is 99.9% pure gold, making it ideal for investment coins and bars. 22 Karat (91.6% pure / 916 hallmark) is mixed with a little copper or silver to give strength for everyday jewellery.',
                  icon: 'award',
                })
              }
              className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition-colors bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              <span>விளக்கம் • Learn More</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 3: Daily Changes */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-400/35 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-5 group shadow-sm hover:shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                  <RefreshCw size={22} />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  தினசரி விலை புதுப்பிப்பு • Daily Updates
                </h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                இந்திய சந்தையில் தங்கம் விலை தினமும் இருமுறை புதுப்பிக்கப்படுவதன் காரணங்கள் மற்றும் சிறந்த நேரத்தில் வாங்கும் உத்திகள்.
              </p>
            </div>
            <button
              onClick={() =>
                setActiveInfoModal({
                  title: 'Daily Gold Rate Updates',
                  content:
                    'Jewellers and gold associations in India announce opening rates around 10:00 AM IST and closing rates around 4:30 PM IST. Tracking these rates helps you buy or pledge gold at the best time.',
                  icon: 'refresh',
                })
              }
              className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition-colors bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              <span>விளக்கம் • Learn More</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 4: Buying Tips */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-400/35 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-5 group shadow-sm hover:shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                  <ShieldCheck size={22} />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  நகை வாங்கும் வழிகாட்டி • Buying Tips
                </h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                6 இலக்க HUID ஹால்மார்க் சரிபார்ப்பு, செய் கூலி கணக்கீடு மற்றும் 3% GST விவரங்களை வாங்கும் முன் உறுதி செய்வதற்கான வழிகாட்டி.
              </p>
            </div>
            <button
              onClick={() =>
                setActiveInfoModal({
                  title: 'Smart Gold Buying & Hallmarking Guide',
                  content:
                    'Always check for the official BIS Hallmark symbol and the 6-digit HUID code on your jewellery. Ensure your jewellery bill clearly mentions gold weight, making charges, and 3% GST separately.',
                  icon: 'shield',
                })
              }
              className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition-colors bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              <span>விளக்கம் • Learn More</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer via Reusable Component */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout || (() => onNavigateTo && onNavigateTo('about'))}
        onNavigateLiveRate={() => {}}
        onNavigateGoldLoan={onNavigateGoldLoan || (() => onNavigateTo && onNavigateTo('gold-loan'))}
        onNavigateBranches={onNavigateBranches || (() => onNavigateTo && onNavigateTo('branches'))}
        onNavigateContact={onNavigateContact || (() => onNavigateTo && onNavigateTo('contact'))}
        onScrollToSection={(sectionId) => {
          if (onNavigateHome) {
            onNavigateHome()
            setTimeout(() => {
              const el = document.getElementById(sectionId)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }
        }}
      />

      {/* --- Modals --- */}

      {/* 1. Educational Detail Modal */}
      {activeInfoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveInfoModal(null)}
        >
          <div
            className="bg-white border border-slate-200 p-7 md:p-8 rounded-3xl max-w-lg w-full flex flex-col gap-5 shadow-2xl relative text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{activeInfoModal.title}</h3>
              <button
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 border-0 cursor-pointer"
                onClick={() => setActiveInfoModal(null)}
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{activeInfoModal.content}</p>
            <button
              onClick={() => setActiveInfoModal(null)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs uppercase cursor-pointer border-0 mt-2 shadow-[0_6px_25px_rgba(249,115,22,0.35)]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 3. Apply Now Modal */}
      {applyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setApplyModalOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 p-7 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Coins size={20} className="text-[#FF6B00]" />
                <span>Apply for Gold Loan</span>
              </div>
              <button
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 border-0 cursor-pointer"
                onClick={() => setApplyModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Get maximum loan amount against your gold jewellery at low interest rates starting from 0.75% per month (9% p.a.).
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Application submitted! Our gold loan advisor will call you shortly.')
                setApplyModalOpen(false)
              }}
              className="flex flex-col gap-3.5"
            >
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <input
                type="number"
                required
                placeholder="Estimated Gold Weight (Grams)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all border-0 cursor-pointer mt-2 shadow-[0_6px_25px_rgba(249,115,22,0.35)]"
              >
                Submit Gold Loan Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
