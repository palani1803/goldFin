import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Bell,
  Sliders,
  Award,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  X,
  CheckCircle2,
  Coins,
  MapPin,
  Building2,
  Sparkles,
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
  onNavigateTo?: (page: string) => void
}

export default function LiveRatePage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateGoldLoan,
  onNavigateTo,
}: LiveRatePageProps) {
  // Live rates state
  const [liveRates, setLiveRates] = useState<PurityRate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string>('17 Aug 2026')
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('10:00 AM')

  // Timeframe filter for the chart: Today, 7 Days, 30 Days
  const [timeframe, setTimeframe] = useState<'today' | '7days' | '30days'>('today')
  const [historyData, setHistoryData] = useState<HistoryPoint[]>([])
  const [historyLoading, setHistoryLoading] = useState<boolean>(true)

  // Active chart hover index
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null)

  // Selected city for comparison card
  const [selectedCityId, setSelectedCityId] = useState<string>('chennai')

  // Countdown timer for next market update
  const [countdownSeconds, setCountdownSeconds] = useState<number>(892)

  // Modals state
  const [alertModalOpen, setAlertModalOpen] = useState(false)
  const [alertEmail, setAlertEmail] = useState('')
  const [alertTargetPrice, setAlertTargetPrice] = useState('')
  const [alertSaved, setAlertSaved] = useState(false)
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

  useEffect(() => {
    fetchRates()
    const interval = setInterval(fetchRates, 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchRates])

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

  // Top 5 Indian Cities Data
  const topCities = useMemo(() => {
    const base24k = price24kPerGram
    const citiesConfig = [
      {
        id: 'chennai',
        name: 'Chennai',
        state: 'Tamil Nadu',
        tag: 'MJDMA Benchmark',
        offset: 15,
        change: 0.84,
        isUp: true,
        popular: true,
      },
      {
        id: 'mumbai',
        name: 'Mumbai',
        state: 'Maharashtra',
        tag: 'IBJA National Spot',
        offset: 0,
        change: 0.81,
        isUp: true,
        popular: false,
      },
      {
        id: 'delhi',
        name: 'Delhi NCR',
        state: 'National Capital',
        tag: 'DJA Bullion Post',
        offset: 10,
        change: 0.79,
        isUp: true,
        popular: false,
      },
      {
        id: 'bengaluru',
        name: 'Bengaluru',
        state: 'Karnataka',
        tag: 'KJMA Association',
        offset: 12,
        change: 0.82,
        isUp: true,
        popular: false,
      },
      {
        id: 'hyderabad',
        name: 'Hyderabad',
        state: 'Telangana',
        tag: 'TGJA Bullion Desk',
        offset: 18,
        change: 0.85,
        isUp: true,
        popular: false,
      },
    ]

    return citiesConfig.map((c) => {
      const city24k = base24k + c.offset
      const city22k = Math.round(city24k * (22 / 24))
      const city18k = Math.round(city24k * (18 / 24))
      return {
        ...c,
        price24k: city24k,
        price22k: city22k,
        price18k: city18k,
      }
    })
  }, [price24kPerGram])

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
    <div className="flex flex-col min-h-screen w-full bg-[#121212] text-[#E5E5E5] font-sans antialiased selection:bg-[#C89B2A]/30 selection:text-yellow-200 relative">
      {/* Reusable Gold Luxury Background Component */}
      <GoldBackground textureOpacity={0.08} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="live-rate"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout || (() => onNavigateTo && onNavigateTo('about'))}
        onNavigateLiveRate={() => {}}
        onNavigateGoldLoan={onNavigateGoldLoan || (() => onNavigateTo && onNavigateTo('gold-loan'))}
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
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#DAAE4D] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-400"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-[#DAAE4D] font-bold">Live Gold Rate</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit">
                <Sparkles size={14} />
                <span>INSTITUTIONAL BULLION FEED</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.1]">
                Today's <br />
                <span className="bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] bg-clip-text text-transparent">
                  Live Gold Rate
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
                Stay updated with today's official 1 gram gold prices across India. Synchronized live with IBJA and MCX domestic exchange benchmarks.
              </p>
            </div>

            {/* Pure 1 Gram Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#222222]/80 border border-[#C89B2A]/30 text-xs font-bold text-[#DAAE4D] self-start md:self-auto shadow-md backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>OFFICIAL 1 GRAM BULLION BENCHMARK</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Top Cards Grid (Strictly 1 Gram) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 22K PRICE (1g) */}
          <div className="p-6 md:p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                22K PRICE (1g)
              </span>
              <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                isUp22k
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                  : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              }`}>
                {isUp22k ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{isUp22k ? `+${change22k}%` : `-${change22k}%`}</span>
              </div>
            </div>

            <div className="my-3">
              <div className="text-3xl md:text-4xl font-black text-white group-hover:text-[#DAAE4D] transition-colors tracking-tight">
                {loading ? '...' : `₹${price22kPerGram.toLocaleString('en-IN')}`}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                91.6% Pure Gold • Per 1 Gram
              </span>
            </div>

            <div className="w-2/3 h-[2px] bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-transparent rounded-full mt-1" />
          </div>

          {/* Card 2: 24K PRICE (1g) */}
          <div className="p-6 md:p-7 rounded-3xl bg-[#222222]/70 border border-[#C89B2A]/40 bg-[#222222]/90 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(234,179,8,0.1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                  24K PRICE (1g)
                </span>
                <span className="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full bg-[#C89B2A]/20 border border-[#C89B2A]/40 text-[#F3C55B]">
                  SPOT
                </span>
              </div>
              <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                isUp24k
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                  : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              }`}>
                {isUp24k ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{isUp24k ? `+${change24k}%` : `-${change24k}%`}</span>
              </div>
            </div>

            <div className="my-3">
              <div className="text-3xl md:text-4xl font-black text-white group-hover:text-[#DAAE4D] transition-colors tracking-tight">
                {loading ? '...' : `₹${price24kPerGram.toLocaleString('en-IN')}`}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                99.9% Pure Bullion • Per 1 Gram
              </span>
            </div>

            <div className="w-2/3 h-[2px] bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-transparent rounded-full mt-1" />
          </div>

          {/* Card 3: LAST UPDATED */}
          <div className="p-6 md:p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-lg">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              LAST UPDATED
            </span>

            <div className="my-2">
              <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {lastUpdatedDate}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#DAAE4D] font-bold mt-1">
                <Clock size={14} />
                <span>{lastUpdatedTime} IST</span>
              </div>
            </div>

            <div className="w-1/2 h-[1px] bg-white/10 rounded-full mt-1" />
          </div>

          {/* Card 4: MARKET STATUS */}
          <div className="p-6 md:p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-lg">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              MARKET STATUS
            </span>

            <div className="my-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-2xl md:text-3xl font-extrabold text-emerald-400 tracking-tight">
                  Market Open
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Next update in <span className="text-[#DAAE4D] font-bold">{formattedCountdown}</span>
              </div>
            </div>

            <div className="w-1/2 h-[1px] bg-white/10 rounded-full mt-1" />
          </div>
        </div>

        {/* Gold Price Movement Section with Accurate Historical Wave Chart */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6 relative overflow-hidden">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Gold Price Movement
              </h2>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                HISTORICAL 24K SPOT RATE (₹ / GRAM)
              </span>
            </div>

            {/* Time Filter Tabs */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#1A1A1A] border border-white/10">
              <button
                onClick={() => setTimeframe('today')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border-0 cursor-pointer ${
                  timeframe === 'today'
                    ? 'bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white bg-transparent'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeframe('7days')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border-0 cursor-pointer ${
                  timeframe === '7days'
                    ? 'bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white bg-transparent'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeframe('30days')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border-0 cursor-pointer ${
                  timeframe === '30days'
                    ? 'bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white bg-transparent'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* SVG Interactive Chart Area */}
          <div className="relative w-full h-[280px] md:h-[320px] mt-2">
            {/* Dynamic Y-axis labels & horizontal guide lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] text-slate-500 font-semibold select-none">
              {yAxisLevels.map((lvl, idx) => (
                <div key={idx} className="border-b border-white/[0.04] pb-1 flex justify-between">
                  <span>₹{lvl.toLocaleString('en-IN')}/g</span>
                </div>
              ))}
            </div>

            {historyLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#DAAE4D] border-t-transparent animate-spin" />
              </div>
            ) : (
              <svg
                viewBox="0 0 650 230"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Gold glowing vertical gradient for fill area under line */}
                  <linearGradient id="goldGradientFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DAAE4D" stopOpacity="0.25" />
                    <stop offset="60%" stopColor="#DAAE4D" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#DAAE4D" stopOpacity="0" />
                  </linearGradient>

                  {/* Filter for golden neon glow on the path */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Area fill under the curve */}
                {svgPathD && svgPoints.length > 0 && (
                  <path
                    d={`${svgPathD} L ${svgPoints[svgPoints.length - 1].x} 220 L ${svgPoints[0].x} 220 Z`}
                    fill="url(#goldGradientFill)"
                  />
                )}

                {/* Glowing Main Curve Line */}
                {svgPathD && (
                  <path
                    d={svgPathD}
                    fill="none"
                    stroke="#DAAE4D"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#glow)"
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
                          ? 'fill-[#F3C55B] stroke-white stroke-[2.5px] shadow-lg'
                          : 'fill-[#121212] stroke-[#DAAE4D] stroke-2 hover:fill-[#F3C55B]'
                      }`}
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />
                  </g>
                ))}
              </svg>
            )}

            {/* Floating Tooltip Bubble (Positioned over active point) */}
            {activePoint && !historyLoading && (
              <div
                className="absolute z-20 pointer-events-none transition-all duration-200 transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${(activePoint.x / 650) * 100}%`,
                  top: `${(activePoint.y / 230) * 85}%`,
                }}
              >
                <div className="px-4 py-2.5 rounded-2xl bg-[#1A1A1A] border border-[#C89B2A]/50 shadow-[0_8px_30px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-col gap-0.5 min-w-[130px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    {activePoint.time}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#F3C55B] whitespace-nowrap">
                      ₹{activePoint.price.toLocaleString('en-IN')}/g
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">24K</span>
                  </div>
                  {activePoint.price22k && (
                    <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                      22K: ₹{activePoint.price22k.toLocaleString('en-IN')}/g
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* X-axis Date / Time Labels */}
          <div className="flex justify-between items-center px-2 pt-2 text-[11px] md:text-xs font-semibold text-slate-500 border-t border-white/5 overflow-x-auto gap-2">
            {svgPoints
              .filter((_, idx) => {
                if (timeframe === '30days') return idx % 5 === 0 || idx === svgPoints.length - 1
                return true
              })
              .map((d, i) => (
                <span
                  key={i}
                  className="hover:text-[#DAAE4D] transition-colors cursor-pointer whitespace-nowrap"
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

        {/* 4 Stat / High-Low Grid Boxes (Accurately 1 Gram) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              {timeframe === 'today' ? "TODAY'S HIGH (1g)" : 'PERIOD HIGH (1g)'}
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              ₹{highPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-400 font-medium">24K Bullion Benchmark</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              {timeframe === 'today' ? "TODAY'S LOW (1g)" : 'PERIOD LOW (1g)'}
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              ₹{lowPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-400 font-medium">24K Bullion Benchmark</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              AVERAGE PRICE (1g)
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              ₹{avgPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-400 font-medium">Weighted Mean Valuation</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              DAILY CHANGE %
            </span>
            <div className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isUp24k ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isUp24k ? `+${change24k}%` : `-${change24k}%`}
            </div>
            <span className="text-xs text-slate-400 font-medium">vs Previous Close</span>
          </div>
        </div>

        {/* --- Top 5 City-Wise Gold Rates Section --- */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-[11px] font-bold tracking-wider mb-2">
                <MapPin size={13} />
                <span>REGIONAL BULLION HUBS (INDIA)</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Top 5 City-Wise Gold Rates
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1 font-normal">
                Compare today's 1 gram 24K, 22K, and 18K gold rates across India's premier precious metal centers.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DAAE4D] bg-[#1A1A1A] border border-white/10 px-4 py-2 rounded-2xl self-start sm:self-auto">
              <Building2 size={15} />
              <span>5 MAJOR MARKETS</span>
            </div>
          </div>

          {/* City Table Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                  <th className="py-3.5 px-4">City / Region</th>
                  <th className="py-3.5 px-4">24K Rate (1g)</th>
                  <th className="py-3.5 px-4">22K Rate (1g)</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">18K Rate (1g)</th>
                  <th className="py-3.5 px-4">24h Movement</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Association Benchmark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {topCities.map((city) => {
                  const isSelected = selectedCityId === city.id
                  return (
                    <tr
                      key={city.id}
                      onClick={() => setSelectedCityId(city.id)}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#C89B2A]/10 border-l-2 border-[#DAAE4D]'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      {/* City Name & State */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                            isSelected ? 'bg-gradient-to-br from-[#F3C55B] to-[#C89B2A] text-slate-950 shadow-md' : 'bg-white/5 text-slate-300'
                          }`}>
                            {city.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white text-sm">{city.name}</span>
                              {city.popular && (
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#C89B2A]/20 text-[#F3C55B] border border-[#C89B2A]/40 flex items-center gap-1">
                                  <Sparkles size={10} />
                                  <span>Highest Volume</span>
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 font-medium">{city.state}</span>
                          </div>
                        </div>
                      </td>

                      {/* 24K Price (1g) */}
                      <td className="py-4 px-4">
                        <div className="font-black text-[#F3C55B] text-sm md:text-base">
                          ₹{city.price24k.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-slate-400">999 Pure</span>
                      </td>

                      {/* 22K Price (1g) */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm md:text-base">
                          ₹{city.price22k.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-slate-400">916 Hallmark</span>
                      </td>

                      {/* 18K Price (1g) */}
                      <td className="py-4 px-4 hidden md:table-cell">
                        <div className="font-semibold text-slate-300 text-sm">
                          ₹{city.price18k.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-slate-400">750 Pure</span>
                      </td>

                      {/* 24h Movement */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                          <TrendingUp size={12} />
                          <span>+{city.change}%</span>
                        </div>
                      </td>

                      {/* Association Benchmark */}
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className="text-xs text-slate-300 font-medium px-3 py-1 rounded-xl bg-white/5 border border-white/5">
                          {city.tag}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/5">
            <span>* Prices are subject to local jeweller making charges and applicable 3% Indian GST.</span>
            <span className="text-[#DAAE4D] font-semibold">Updated with daily IBJA opening benchmark</span>
          </div>
        </div>

        {/* "Never Miss a Price Movement" Alert CTA Banner */}
        <div className="relative p-8 md:p-12 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-[0.05] text-white">
            <Bell size={240} />
          </div>

          <div className="flex flex-col gap-2 max-w-xl relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Never Miss a Price Movement
            </h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal">
              Set custom price alerts and receive instant notifications via SMS or Email when the gold rate reaches your target point per gram.
            </p>
          </div>

          <button
            onClick={() => setAlertModalOpen(true)}
            className="relative z-10 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] border-0 cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Bell size={18} />
            <span>Set Price Alert</span>
          </button>
        </div>

        {/* 4 Feature Educational Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Price Factors */}
          <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <Sliders size={22} />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                  Price Factors
                </h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Understand how MCX movements, import duties, and regional bullion association fixes impact the daily gold price in your city.
              </p>
            </div>
            <button
              onClick={() =>
                setActiveInfoModal({
                  title: 'Domestic Gold Price Determinants in India',
                  content:
                    'Domestic gold rates in India are benchmarked by the India Bullion and Jewellers Association (IBJA) based on MCX domestic trading, basic customs duty (BCD), Agriculture Infrastructure and Development Cess (AIDC), USD/INR exchange rates, and regional bullion association premiums.',
                  icon: 'factors',
                })
              }
              className="flex items-center gap-1.5 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              <span>Learn More</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: 22K vs 24K */}
          <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <Award size={22} />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                  22K vs 24K
                </h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                The fundamental differences in purity, durability, and investment value between 22 carat jewelry gold and 24 carat pure gold.
              </p>
            </div>
            <button
              onClick={() =>
                setActiveInfoModal({
                  title: '22 Karat vs 24 Karat Pure Gold',
                  content:
                    '24 Karat gold is 99.9% pure bullion, making it the supreme choice for investment bars and coins. 22 Karat (91.6% pure) is alloyed with copper or silver to provide durability for crafted jewelry ornaments.',
                  icon: 'award',
                })
              }
              className="flex items-center gap-1.5 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              <span>Learn More</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 3: Daily Changes */}
          <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <RefreshCw size={22} />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                  Daily Changes
                </h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Why gold prices change twice a day and how to leverage daily fluctuations for better investment timing.
              </p>
            </div>
            <button
              onClick={() =>
                setActiveInfoModal({
                  title: 'Daily Bullion Price Fixes',
                  content:
                    'Bullion associations in India announce benchmark opening rates around 10:00 AM IST and evening rates around 4:30 PM IST. Tracking intra-day movements helps you secure optimal purchase prices.',
                  icon: 'refresh',
                })
              }
              className="flex items-center gap-1.5 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              <span>Learn More</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 4: Buying Tips */}
          <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <ShieldCheck size={22} />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                  Buying Tips
                </h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Expert advice on checking hallmarking, calculating making charges, and verifying the weight before your purchase.
              </p>
            </div>
            <button
              onClick={() =>
                setActiveInfoModal({
                  title: 'Smart Gold Buying & Hallmarking Guide',
                  content:
                    'Always check for BIS Hallmark engraving with a 6-digit HUID code. Verify that making charges and 3% Indian GST are itemized clearly on your invoice.',
                  icon: 'shield',
                })
              }
              className="flex items-center gap-1.5 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              <span>Learn More</span>
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

      {/* 1. Price Alert Modal (1 Gram Target) */}
      {alertModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setAlertModalOpen(false)}
        >
          <div
            className="bg-[#222222] border border-[#C89B2A]/30 p-7 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Bell size={20} className="text-[#DAAE4D]" />
                <span>Set Gold Rate Alert</span>
              </div>
              <button
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white border-0 cursor-pointer"
                onClick={() => setAlertModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {alertSaved ? (
              <div className="py-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-lg font-bold text-white">Alert Configured!</h4>
                <p className="text-xs text-slate-400">
                  You will receive an instant notification at <strong className="text-white">{alertEmail}</strong> when gold reaches ₹{alertTargetPrice}/gram.
                </p>
                <button
                  onClick={() => {
                    setAlertSaved(false)
                    setAlertModalOpen(false)
                  }}
                  className="mt-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-xs uppercase cursor-pointer border-0"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (alertEmail) setAlertSaved(true)
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">Target Price (₹ per 1 Gram)</label>
                  <input
                    type="number"
                    required
                    placeholder={`e.g. ${price24kPerGram - 100}`}
                    value={alertTargetPrice}
                    onChange={(e) => setAlertTargetPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all border-0 cursor-pointer mt-2"
                >
                  Activate Instant Alert
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Educational Detail Modal */}
      {activeInfoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveInfoModal(null)}
        >
          <div
            className="bg-[#222222] border border-[#C89B2A]/30 p-7 md:p-8 rounded-3xl max-w-lg w-full flex flex-col gap-5 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">{activeInfoModal.title}</h3>
              <button
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white border-0 cursor-pointer"
                onClick={() => setActiveInfoModal(null)}
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{activeInfoModal.content}</p>
            <button
              onClick={() => setActiveInfoModal(null)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-xs uppercase cursor-pointer border-0 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 3. Apply Now Modal */}
      {applyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setApplyModalOpen(false)}
        >
          <div
            className="bg-[#222222] border border-[#C89B2A]/30 p-7 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Coins size={20} className="text-[#DAAE4D]" />
                <span>Apply for Gold Loan</span>
              </div>
              <button
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white border-0 cursor-pointer"
                onClick={() => setApplyModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Unlock the maximum value from your gold ornaments at institutional interest rates starting at 0.75% per month.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Application submitted! Our institutional representative will contact you shortly.')
                setApplyModalOpen(false)
              }}
              className="flex flex-col gap-3.5"
            >
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />
              <input
                type="number"
                required
                placeholder="Estimated Gold Weight (Grams)"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all border-0 cursor-pointer mt-2"
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
