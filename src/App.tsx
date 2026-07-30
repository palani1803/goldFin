import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Calculator,
  BookOpen,
  Newspaper,
  LineChart,
  Globe,
  ArrowUpRight,
  Wallet,
  ChevronLeft,
  X,
  Home,
  Flame,
  User,
  Sparkles,
  CheckCircle2,
  Mail,
  PieChart
} from 'lucide-react'
import './App.css'

interface PurityRate {
  id: string
  name: string
  karat: string
  price: number
  unit: string
  change: number
  isUp: boolean
}

const PURITY_RATES: PurityRate[] = [
  { id: '24k', name: 'GOLD 24K', karat: '24K (99.9%)', price: 6245, unit: 'per gram', change: 0.45, isUp: true },
  { id: '22k', name: 'GOLD 22K', karat: '22K (91.6%)', price: 5720, unit: 'per gram', change: -0.12, isUp: false },
  { id: '18k', name: 'GOLD 18K', karat: '18K (75.0%)', price: 4680, unit: 'per gram', change: 0.28, isUp: true },
  { id: 'silver', name: 'SILVER 999', karat: '99.9% Pure', price: 74.5, unit: 'per gram', change: 1.10, isUp: true },
]

const GLOBAL_INDICES = [
  { name: 'SENSEX', value: '72,431', change: '+0.35%', isUp: true },
  { name: 'NIFTY 50', value: '22,120', change: '+0.42%', isUp: true },
  { name: 'USD/INR', value: '82.94', change: '-0.05%', isUp: false },
]

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<'overview' | 'features' | 'faq' | 'contact'>('overview')
  const [bottomNav, setBottomNav] = useState<'home' | 'calc' | 'rates' | 'insights' | 'profile'>('home')
  
  // Modals
  const [showCalcModal, setShowCalcModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [activeModalTitle, setActiveModalTitle] = useState<string | null>(null)

  // Calculator State
  const [calcKarat, setCalcKarat] = useState<'24K' | '22K' | '18K'>('24K')
  const [calcGram, setCalcGram] = useState<number>(10)
  const [makingRate, setMakingRate] = useState<number>(8) // 8% making charge

  const basePricePerGram = calcKarat === '24K' ? 6245 : calcKarat === '22K' ? 5720 : 4680
  const rawGoldCost = basePricePerGram * calcGram
  const makingChargeAmt = Math.round(rawGoldCost * (makingRate / 100))
  const subtotal = rawGoldCost + makingChargeAmt
  const gstAmt = Math.round(subtotal * 0.03) // 3% GST on jewelry
  const grandTotal = subtotal + gstAmt

  const handleOpenTool = (toolName: string) => {
    if (toolName === 'Calculator') {
      setShowCalcModal(true)
    } else {
      setActiveModalTitle(toolName)
    }
  }

  return (
    <div className="app-container">
      {/* Top Sticky Header */}
      <header className="app-header">
        <div className="header-left">
          <button className="icon-btn" aria-label="Go Back">
            <ChevronLeft size={20} />
          </button>
          <h1 className="header-title">Gold Calculator</h1>
        </div>
        <button className="wallet-btn" onClick={() => setShowWalletModal(true)}>
          <Wallet size={16} />
          <span>₹96,797</span>
        </button>
      </header>

      {/* Main Page Body */}
      <main className="main-content">
        {/* Navigation Tabs */}
        <nav className="hero-tabs">
          <button 
            className={`tab-pill ${activeNavTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveNavTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-pill ${activeNavTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveNavTab('features')}
          >
            Key Features
          </button>
          <button 
            className={`tab-pill ${activeNavTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveNavTab('faq')}
          >
            FAQ
          </button>
          <button 
            className={`tab-pill ${activeNavTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveNavTab('contact')}
          >
            Contact
          </button>
        </nav>

        {/* Tab 1: Overview (Main Home View) */}
        {activeNavTab === 'overview' && (
          <>
            {/* Hero Card */}
            <div className="hero-card">
              <div className="hero-tag">
                <Sparkles size={13} />
                <span>INSTITUTIONAL GRADE</span>
              </div>
              <h2 className="hero-title">
                Secure Your Future, <br />
                <span className="text-gold-gradient">Invest in Gold</span>
              </h2>
              <p className="hero-desc">
                Gold is a timeless asset that protects wealth from inflation and market volatility. Calculate live rates with tax in real-time.
              </p>
              <button className="hero-cta-btn" onClick={() => setShowCalcModal(true)}>
                <span>Check Live Gold Rate</span>
                <ArrowUpRight size={18} />
              </button>
            </div>

            {/* Purity Rates Section */}
            <section className="rates-section">
              <div className="section-header">
                <h3 className="section-title">Purity Rates</h3>
                <div className="live-badge">
                  <span className="pulse-dot"></span>
                  <span>LIVE MARKET</span>
                </div>
              </div>

              <div className="purity-grid">
                {PURITY_RATES.map((item) => (
                  <div key={item.id} className={`rate-card ${item.id === '24k' ? 'featured' : ''}`}>
                    <div className="rate-card-header">
                      <span className="rate-purity">{item.name}</span>
                      {item.id === '24k' && (
                        <span style={{ fontSize: '0.65rem', color: 'var(--gold-400)', fontWeight: 700 }}>
                          MOST POPULAR
                        </span>
                      )}
                    </div>
                    <div className="rate-price">₹{item.price.toLocaleString('en-IN')}</div>
                    <div className={`rate-change ${item.isUp ? 'up' : 'down'}`}>
                      {item.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      <span>{item.isUp ? `+${item.change}%` : `${item.change}%`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Global Indices Section */}
            <section className="indices-section">
              <div className="indices-card">
                <div className="indices-header">
                  <span className="indices-label">GLOBAL INDICES</span>
                  <button className="details-btn" onClick={() => setActiveModalTitle('Global Market Indices Details')}>
                    <Globe size={14} />
                    <span>Details</span>
                  </button>
                </div>
                <div className="indices-grid">
                  {GLOBAL_INDICES.map((idx) => (
                    <div key={idx.name} className="index-col">
                      <span className="index-name">{idx.name}</span>
                      <span className="index-value">{idx.value}</span>
                      <span className={`index-change ${idx.isUp ? 'up' : 'down'}`} style={{ color: idx.isUp ? 'var(--green-500)' : 'var(--red-500)' }}>
                        {idx.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Investment Tools Section */}
            <section className="tools-section">
              <div className="section-header">
                <h3 className="section-title">Investment Tools</h3>
              </div>
              <div className="tools-grid">
                <div className="tool-card" onClick={() => handleOpenTool('Calculator')}>
                  <div className="tool-icon-pod">
                    <Calculator size={22} />
                  </div>
                  <div className="tool-info">
                    <span className="tool-name">Calculator</span>
                    <span className="tool-desc">Instant metal value & tax</span>
                  </div>
                </div>

                <div className="tool-card" onClick={() => handleOpenTool('Guide')}>
                  <div className="tool-icon-pod">
                    <BookOpen size={22} />
                  </div>
                  <div className="tool-info">
                    <span className="tool-name">Guide</span>
                    <span className="tool-desc">Gold buying strategies</span>
                  </div>
                </div>

                <div className="tool-card" onClick={() => handleOpenTool('News')}>
                  <div className="tool-icon-pod">
                    <Newspaper size={22} />
                  </div>
                  <div className="tool-info">
                    <span className="tool-name">News</span>
                    <span className="tool-desc">Global market updates</span>
                  </div>
                </div>

                <div className="tool-card" onClick={() => handleOpenTool('Live Rates')}>
                  <div className="tool-icon-pod">
                    <LineChart size={22} />
                  </div>
                  <div className="tool-info">
                    <span className="tool-name">Live Rates</span>
                    <span className="tool-desc">Interactive price chart</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Market Analysis Banner */}
            <section className="analysis-section">
              <div className="section-header">
                <h3 className="section-title">Market Analysis</h3>
                <span className="section-link" onClick={() => setShowArticleModal(true)}>
                  ALL INSIGHTS <ArrowUpRight size={14} />
                </span>
              </div>
              <div 
                className="analysis-card" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80')` }}
                onClick={() => setShowArticleModal(true)}
              >
                <div className="analysis-overlay"></div>
                <div className="analysis-content">
                  <div className="analysis-tags">
                    <span className="badge-alert">MARKET ALERT</span>
                    <span className="badge-readtime">5 MIN READ</span>
                  </div>
                  <h4 className="analysis-headline">
                    Why Central Banks are increasing their Gold reserves in 2024.
                  </h4>
                  <p className="analysis-meta">
                    Analysis by Michael Chen • Today
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Tab 2: Key Features */}
        {activeNavTab === 'features' && (
          <div className="hero-card">
            <h3 className="section-title" style={{ marginBottom: '16px' }}>Platform Features</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="var(--gold-400)" />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Real-Time Bullion Pricing</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Updated directly from global bullion exchanges with zero latency.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="var(--gold-400)" />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>GST & Making Charge Breakdown</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Transparent itemized tax calculations for 24K, 22K, and 18K gold.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="var(--gold-400)" />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Institutional Grade Analytics</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Track SENSEX, NIFTY 50, and USD/INR currency impacts in real time.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: FAQ */}
        {activeNavTab === 'faq' && (
          <div className="hero-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 className="section-title">Frequently Asked Questions</h3>
            <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px' }}>
              <h4 style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '4px', color: 'var(--gold-400)' }}>
                Q: What is the difference between 24K and 22K Gold?
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                24K is 99.9% pure gold used for coins and bars, while 22K is 91.6% pure alloyed with metals for durable jewelry.
              </p>
            </div>
            <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px' }}>
              <h4 style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '4px', color: 'var(--gold-400)' }}>
                Q: How much GST is applicable on Gold in India?
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                A standard 3% GST is applied to the combined total value of gold plus making charges.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Contact */}
        {activeNavTab === 'contact' && (
          <div className="hero-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 className="section-title">Institutional Desk Contact</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Have questions about large volume investments or API feeds? Reach out to our financial advisory team.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)', fontWeight: 700, fontSize: '0.9rem' }}>
              <Mail size={16} />
              <span>desk@goldfin.investments</span>
            </div>
          </div>
        )}
      </main>

      {/* Interactive Gold Calculator Modal */}
      {showCalcModal && (
        <div className="modal-overlay" onClick={() => setShowCalcModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Live Gold Calculator</h3>
              <button className="icon-btn" onClick={() => setShowCalcModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="calc-group">
              <label className="calc-label">Select Purity</label>
              <div className="calc-purity-selector">
                <button 
                  className={`purity-option ${calcKarat === '24K' ? 'selected' : ''}`}
                  onClick={() => setCalcKarat('24K')}
                >
                  24K (₹6,245)
                </button>
                <button 
                  className={`purity-option ${calcKarat === '22K' ? 'selected' : ''}`}
                  onClick={() => setCalcKarat('22K')}
                >
                  22K (₹5,720)
                </button>
                <button 
                  className={`purity-option ${calcKarat === '18K' ? 'selected' : ''}`}
                  onClick={() => setCalcKarat('18K')}
                >
                  18K (₹4,680)
                </button>
              </div>
            </div>

            <div className="calc-group">
              <label className="calc-label">Weight (Grams)</label>
              <div className="calc-input-wrapper">
                <input 
                  type="number" 
                  className="calc-input" 
                  value={calcGram} 
                  min={1}
                  onChange={(e) => setCalcGram(Math.max(1, Number(e.target.value)))}
                />
                <span className="calc-unit">GRAMS</span>
              </div>
            </div>

            <div className="calc-group">
              <label className="calc-label">Making Charges (%)</label>
              <div className="calc-input-wrapper">
                <input 
                  type="number" 
                  className="calc-input" 
                  value={makingRate} 
                  min={0}
                  max={30}
                  onChange={(e) => setMakingRate(Number(e.target.value))}
                />
                <span className="calc-unit">%</span>
              </div>
            </div>

            <div className="calc-result-box">
              <div className="result-row">
                <span>Gold Base Value ({calcGram}g @ {basePricePerGram}/g):</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹{rawGoldCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="result-row">
                <span>Making Charge ({makingRate}%):</span>
                <span>₹{makingChargeAmt.toLocaleString('en-IN')}</span>
              </div>
              <div className="result-row">
                <span>GST (3%):</span>
                <span>₹{gstAmt.toLocaleString('en-IN')}</span>
              </div>
              <div className="result-row total">
                <span>Total Estimated Price:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button className="hero-cta-btn" onClick={() => setShowCalcModal(false)}>
              Close Calculator
            </button>
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="modal-overlay" onClick={() => setShowWalletModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">My Gold Holdings</h3>
              <button className="icon-btn" onClick={() => setShowWalletModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="hero-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL PORTFOLIO VALUE</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-400)', margin: '4px 0 12px' }}>
                ₹96,797
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Holdings: 15.50 Grams 24K</span>
                <span style={{ color: 'var(--green-500)', fontWeight: 700 }}>+12.4% Profit</span>
              </div>
            </div>
            <button className="hero-cta-btn" onClick={() => setShowWalletModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Generic Modal for Tools / Details */}
      {activeModalTitle && (
        <div className="modal-overlay" onClick={() => setActiveModalTitle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{activeModalTitle}</h3>
              <button className="icon-btn" onClick={() => setActiveModalTitle(null)}>
                <X size={20} />
              </button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {activeModalTitle.includes('Indices') 
                ? 'SENSEX and NIFTY 50 reflect the overall Indian equity market sentiment. Historically, gold acts as a hedge: when equities face volatility, gold demand surges.'
                : `${activeModalTitle} tool gives you real-time data feeds, institutional market depth, and instant analytics designed for smart precious metal investors.`}
            </p>
            <button className="hero-cta-btn" onClick={() => setActiveModalTitle(null)}>
              Close View
            </button>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {showArticleModal && (
        <div className="modal-overlay" onClick={() => setShowArticleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Market Insight</h3>
              <button className="icon-btn" onClick={() => setShowArticleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="badge-alert" style={{ width: 'fit-content' }}>MARKET ALERT</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                Why Central Banks are increasing their Gold reserves in 2024.
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Global central banks added over 1,000 tonnes of gold to official reserves in recent consecutive years. Diversification away from single-currency concentration and macro inflation risk remain top drivers.
              </p>
            </div>
            <button className="hero-cta-btn" onClick={() => setShowArticleModal(false)}>
              Close Article
            </button>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation */}
      <footer className="bottom-nav">
        <button 
          className={`nav-item ${bottomNav === 'home' ? 'active' : ''}`}
          onClick={() => { setBottomNav('home'); setActiveNavTab('overview'); }}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button 
          className={`nav-item ${bottomNav === 'calc' ? 'active' : ''}`}
          onClick={() => { setBottomNav('calc'); setShowCalcModal(true); }}
        >
          <Calculator size={20} />
          <span>Calc</span>
        </button>
        <button 
          className={`nav-item ${bottomNav === 'rates' ? 'active' : ''}`}
          onClick={() => { setBottomNav('rates'); setActiveNavTab('overview'); }}
        >
          <Flame size={20} />
          <span>Rates</span>
        </button>
        <button 
          className={`nav-item ${bottomNav === 'insights' ? 'active' : ''}`}
          onClick={() => { setBottomNav('insights'); setShowArticleModal(true); }}
        >
          <PieChart size={20} />
          <span>Insights</span>
        </button>
        <button 
          className={`nav-item ${bottomNav === 'profile' ? 'active' : ''}`}
          onClick={() => { setBottomNav('profile'); setShowWalletModal(true); }}
        >
          <User size={20} />
          <span>Profile</span>
        </button>
      </footer>
    </div>
  )
}
