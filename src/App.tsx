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
  X,
  Sparkles,
  Mail,
  ShieldCheck,
  Award,
  Zap,
  Coins,
  ChevronRight
} from 'lucide-react'
import heroBg from './assets/gold_hero_bg.png'
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
  { id: '24k', name: 'GOLD 24K', karat: '24K (99.9% Pure)', price: 6245, unit: 'per gram', change: 0.45, isUp: true },
  { id: '22k', name: 'GOLD 22K', karat: '22K (91.6% Pure)', price: 5720, unit: 'per gram', change: -0.12, isUp: false },
  { id: '18k', name: 'GOLD 18K', karat: '18K (75.0% Pure)', price: 4680, unit: 'per gram', change: 0.28, isUp: true },
  { id: 'silver', name: 'SILVER 999', karat: '99.9% Fine Silver', price: 74.5, unit: 'per gram', change: 1.10, isUp: true },
]

const GLOBAL_INDICES = [
  { name: 'SENSEX', value: '72,431', change: '+0.35%', isUp: true },
  { name: 'NIFTY 50', value: '22,120', change: '+0.42%', isUp: true },
  { name: 'USD/INR', value: '82.94', change: '-0.05%', isUp: false },
  { name: 'BRENT CRUDE', value: '$83.60/bbl', change: '+0.88%', isUp: true },
]

const SIDE_ARTICLES = [
  { id: 1, title: 'Gold vs Digital Assets: Macro Portfolio Allocation in 2024', readTime: '4 MIN READ', date: '2 hours ago' },
  { id: 2, title: 'Impact of Federal Reserve Interest Rate Decisions on Spot Gold', readTime: '6 MIN READ', date: '5 hours ago' },
  { id: 3, title: 'Understanding Sovereign Gold Bond (SGB) Redemption Dynamics', readTime: '5 MIN READ', date: '1 day ago' },
]

export default function App() {
  const [activeNav, setActiveNav] = useState('overview')

  // Modals
  const [showCalcModal, setShowCalcModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [activeModalTitle, setActiveModalTitle] = useState<string | null>(null)

  // Calculator State (For embedded Hero Calculator & Modal)
  const [calcKarat, setCalcKarat] = useState<'24K' | '22K' | '18K'>('24K')
  const [calcGram, setCalcGram] = useState<number>(10)
  const [makingRate, setMakingRate] = useState<number>(8)

  const basePricePerGram = calcKarat === '24K' ? 6245 : calcKarat === '22K' ? 5720 : 4680
  const rawGoldCost = basePricePerGram * calcGram
  const makingChargeAmt = Math.round(rawGoldCost * (makingRate / 100))
  const subtotal = rawGoldCost + makingChargeAmt
  const gstAmt = Math.round(subtotal * 0.03) // 3% GST
  const grandTotal = subtotal + gstAmt

  const scrollToSection = (sectionId: string) => {
    setActiveNav(sectionId)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app-container">
      {/* Top Sticky Website Navigation */}
      <header className="app-header">
        <div className="container header-inner">
          {/* Brand Logo */}
          <a href="#" className="brand-logo" onClick={() => scrollToSection('overview')}>
            <div className="logo-icon-pod">
              <Coins size={22} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-name">GoldFin</span>
              <span className="brand-tag">INSTITUTIONAL BULLION</span>
            </div>
          </a>

          {/* Center Navigation Menu */}
          <nav className="desktop-nav">
            <button 
              className={`nav-link ${activeNav === 'overview' ? 'active' : ''}`}
              onClick={() => scrollToSection('overview')}
            >
              Overview
            </button>
            <button 
              className={`nav-link ${activeNav === 'rates' ? 'active' : ''}`}
              onClick={() => scrollToSection('rates')}
            >
              Purity Rates
            </button>
            <button 
              className={`nav-link ${activeNav === 'indices' ? 'active' : ''}`}
              onClick={() => scrollToSection('indices')}
            >
              Market Indices
            </button>
            <button 
              className={`nav-link ${activeNav === 'tools' ? 'active' : ''}`}
              onClick={() => scrollToSection('tools')}
            >
              Investment Tools
            </button>
            <button 
              className={`nav-link ${activeNav === 'analysis' ? 'active' : ''}`}
              onClick={() => scrollToSection('analysis')}
            >
              Market Analysis
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <div className="rate-ticker-pill">
              <Zap size={14} />
              <span>24K: ₹6,245/g</span>
            </div>
            <button className="wallet-btn" onClick={() => setShowWalletModal(true)}>
              <Wallet size={16} />
              <span>₹96,797</span>
            </button>
            <button className="btn-primary-gold" onClick={() => setShowCalcModal(true)}>
              <Calculator size={16} />
              <span>Gold Calculator</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="overview" className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-left">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>INSTITUTIONAL BULLION PLATFORM</span>
              </div>
              <h1 className="hero-headline">
                Secure Your Future, <br />
                <span className="text-gold-gradient">Invest in Pure Gold</span>
              </h1>
              <p className="hero-subtitle">
                Gold is a timeless asset that protects wealth from inflation and market volatility. Access real-time bullion pricing, itemized GST tax breakdowns, and institutional market analytics.
              </p>
              
              <div className="hero-actions">
                <button className="btn-primary-gold" style={{ padding: '14px 28px', fontSize: '1rem' }} onClick={() => setShowCalcModal(true)}>
                  <span>Check Live Gold Rate</span>
                  <ArrowUpRight size={18} />
                </button>
                <button className="btn-secondary-outline" style={{ padding: '14px 24px', fontSize: '1rem' }} onClick={() => scrollToSection('analysis')}>
                  <span>Explore Market Insights</span>
                </button>
              </div>

              {/* Stats Ticker Row */}
              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <span className="stat-val">₹6,245 /g</span>
                  <span className="stat-lbl">24K Spot Rate (Live)</span>
                </div>
                <div className="hero-stat-item">
                  <span className="stat-val">+12.4%</span>
                  <span className="stat-lbl">5-Yr Gold CAGR</span>
                </div>
                <div className="hero-stat-item">
                  <span className="stat-val">100% Tax</span>
                  <span className="stat-lbl">GST Itemized Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Embedded Calculator Widget */}
            <div className="hero-calc-card">
              <div className="hero-calc-header">
                <h3 className="hero-calc-title">
                  <Calculator size={18} color="var(--gold-400)" />
                  <span>Instant Rate Estimator</span>
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--green-500)', fontWeight: 700 }}>● LIVE MARKET</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                    Select Karat Purity
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {(['24K', '22K', '18K'] as const).map((k) => (
                      <button
                        key={k}
                        className={`purity-option ${calcKarat === k ? 'selected' : ''}`}
                        onClick={() => setCalcKarat(k)}
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          background: calcKarat === k ? 'rgba(234, 179, 8, 0.15)' : 'var(--bg-input)',
                          border: calcKarat === k ? '1px solid var(--gold-500)' : '1px solid var(--border-color)',
                          color: calcKarat === k ? 'var(--gold-400)' : 'var(--text-secondary)',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Weight (Grams)</label>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gold-400)' }}>{calcGram}g</span>
                  </div>
                  <input 
                    type="range" 
                    min={1} 
                    max={100} 
                    value={calcGram} 
                    onChange={(e) => setCalcGram(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--gold-500)', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ background: 'var(--bg-input)', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    <span>Base Gold ({calcGram}g @ ₹{basePricePerGram}):</span>
                    <span>₹{rawGoldCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    <span>Making Charge ({makingRate}%) + 3% GST:</span>
                    <span>₹{(makingChargeAmt + gstAmt).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold-400)', paddingTop: '8px', borderTop: '1px dashed var(--border-color)' }}>
                    <span>Total Estimate:</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button className="btn-primary-gold" style={{ width: '100%' }} onClick={() => setShowCalcModal(true)}>
                  <span>Full Itemized Calculation</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections Container */}
      <main className="container main-sections">
        {/* Purity Rates Section */}
        <section id="rates">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-subtitle">Real-Time Bullion Prices</span>
              <h2 className="section-main-title">Live Purity Rates</h2>
            </div>
            <div className="rate-ticker-pill">
              <span className="pulse-dot"></span>
              <span>LIVE EXCHANGE FEED</span>
            </div>
          </div>

          <div className="purity-grid">
            {PURITY_RATES.map((item) => (
              <div key={item.id} className={`rate-card ${item.id === '24k' ? 'featured' : ''}`}>
                <div className="rate-card-top">
                  <span className="rate-purity-name">{item.name}</span>
                  {item.id === '24k' && <span className="popular-badge">MOST POPULAR</span>}
                </div>
                <div className="rate-price-large">₹{item.price.toLocaleString('en-IN')}</div>
                <div className="rate-card-bottom">
                  <span className="rate-unit-text">{item.karat} • {item.unit}</span>
                  <div className={`rate-change-badge ${item.isUp ? 'up' : 'down'}`}>
                    {item.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{item.isUp ? `+${item.change}%` : `${item.change}%`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Indices Dashboard Banner */}
        <section id="indices">
          <div className="indices-banner">
            <div className="indices-banner-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={20} color="var(--gold-400)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Global Financial Indices & Currency Impact</h3>
              </div>
              <button className="btn-secondary-outline" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => setActiveModalTitle('Global Market Indices Breakdown')}>
                <span>View Full Breakdown</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="indices-banner-grid">
              {GLOBAL_INDICES.map((idx) => (
                <div key={idx.name} className="index-metric-box">
                  <span className="index-metric-title">{idx.name}</span>
                  <span className="index-metric-val">{idx.value}</span>
                  <span className={`rate-change-badge ${idx.isUp ? 'up' : 'down'}`} style={{ width: 'fit-content', marginTop: '4px' }}>
                    {idx.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span>{idx.change}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Tools Grid */}
        <section id="tools">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-subtitle">Smart Bullion Suite</span>
              <h2 className="section-main-title">Investment Tools</h2>
            </div>
          </div>

          <div className="tools-grid">
            <div className="tool-card" onClick={() => setShowCalcModal(true)}>
              <div className="tool-icon-pod">
                <Calculator size={24} />
              </div>
              <h3 className="tool-card-title">Live Rate Calculator</h3>
              <p className="tool-card-desc">Calculate instant metal value, making charges, and 3% GST breakdown.</p>
            </div>

            <div className="tool-card" onClick={() => setActiveModalTitle('Gold Investment Guide')}>
              <div className="tool-icon-pod">
                <BookOpen size={24} />
              </div>
              <h3 className="tool-card-title">Bullion Buying Guide</h3>
              <p className="tool-card-desc">Learn key differences between 24K, 22K, SGBs, and digital gold options.</p>
            </div>

            <div className="tool-card" onClick={() => setActiveModalTitle('Global Market News Feed')}>
              <div className="tool-icon-pod">
                <Newspaper size={24} />
              </div>
              <h3 className="tool-card-title">Market News Feed</h3>
              <p className="tool-card-desc">Curated macroeconomic insights affecting gold and precious metal trends.</p>
            </div>

            <div className="tool-card" onClick={() => setActiveModalTitle('Interactive Price Charts')}>
              <div className="tool-icon-pod">
                <LineChart size={24} />
              </div>
              <h3 className="tool-card-title">Interactive Rate Charts</h3>
              <p className="tool-card-desc">Track historical 1-year, 5-year, and 10-year gold performance analytics.</p>
            </div>
          </div>
        </section>

        {/* Market Analysis Grid */}
        <section id="analysis">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-subtitle">Macroeconomic Research</span>
              <h2 className="section-main-title">Market Analysis</h2>
            </div>
            <span className="section-link" style={{ color: 'var(--gold-400)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setShowArticleModal(true)}>
              ALL INSIGHTS <ArrowUpRight size={14} />
            </span>
          </div>

          <div className="analysis-grid">
            {/* Left Featured Article */}
            <div 
              className="analysis-featured-card"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80')` }}
              onClick={() => setShowArticleModal(true)}
            >
              <div className="analysis-overlay"></div>
              <div className="analysis-featured-content">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="badge-alert">MARKET ALERT</span>
                  <span className="badge-readtime">5 MIN READ</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
                  Why Central Banks are increasing their Gold reserves in 2024.
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Analysis by Michael Chen • Financial Advisory Desk
                </p>
              </div>
            </div>

            {/* Right Side Articles */}
            <div className="analysis-list-side">
              {SIDE_ARTICLES.map((art) => (
                <div key={art.id} className="side-article-card" onClick={() => setActiveModalTitle(art.title)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gold-400)', fontWeight: 700 }}>
                    <span>{art.readTime}</span>
                    <span>{art.date}</span>
                  </div>
                  <h4 className="side-article-title">{art.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Institutional Trust Banner */}
        <section>
          <div className="trust-banner">
            <div className="trust-item">
              <div className="trust-icon-box">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="trust-title">Certified Purity Guarantee</h4>
                <p className="trust-desc">All rates correspond to BIS Hallmarked 99.9% 24K and 91.6% 22K certified standards.</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="trust-title">Real-Time Exchange Feeds</h4>
                <p className="trust-desc">Low-latency live price feeds synchronized directly with global spot markets.</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <Award size={24} />
              </div>
              <div>
                <h4 className="trust-title">GST Itemized Compliance</h4>
                <p className="trust-desc">Automatic breakdown of base metal price, making charges, and 3% Indian GST.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Website Footer */}
      <footer className="app-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="brand-logo">
                <div className="logo-icon-pod">
                  <Coins size={22} />
                </div>
                <span className="brand-name">GoldFin</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Institutional grade precious metal intelligence, real-time purity rate tracking, and tax calculation platform.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Platform Features</h4>
              <ul className="footer-links">
                <li><span className="footer-link" onClick={() => scrollToSection('rates')}>24K Gold Rates</span></li>
                <li><span className="footer-link" onClick={() => scrollToSection('rates')}>22K Gold Rates</span></li>
                <li><span className="footer-link" onClick={() => scrollToSection('rates')}>Silver 999 Rates</span></li>
                <li><span className="footer-link" onClick={() => setShowCalcModal(true)}>Live Gold Calculator</span></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Market Research</h4>
              <ul className="footer-links">
                <li><span className="footer-link" onClick={() => scrollToSection('indices')}>SENSEX & NIFTY 50</span></li>
                <li><span className="footer-link" onClick={() => scrollToSection('analysis')}>Central Bank Gold Reserve Report</span></li>
                <li><span className="footer-link" onClick={() => scrollToSection('analysis')}>Digital Gold vs Sovereign Bonds</span></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Institutional Desk</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Have questions regarding high-volume physical bullion pricing or API integrations?
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)', fontWeight: 700, fontSize: '0.85rem' }}>
                <Mail size={16} />
                <span>desk@goldfin.investments</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 GoldFin Inc. All rights reserved. Rates updated continuously from official exchange feeds.</span>
            <span>Privacy Policy • Terms of Service • Compliance</span>
          </div>
        </div>
      </footer>

      {/* Interactive Calculator Modal */}
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
                <button className={`purity-option ${calcKarat === '24K' ? 'selected' : ''}`} onClick={() => setCalcKarat('24K')}>
                  24K (₹6,245)
                </button>
                <button className={`purity-option ${calcKarat === '22K' ? 'selected' : ''}`} onClick={() => setCalcKarat('22K')}>
                  22K (₹5,720)
                </button>
                <button className={`purity-option ${calcKarat === '18K' ? 'selected' : ''}`} onClick={() => setCalcKarat('18K')}>
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
                <span>Gold Base Value ({calcGram}g @ ₹{basePricePerGram}/g):</span>
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

            <button className="btn-primary-gold" style={{ width: '100%' }} onClick={() => setShowCalcModal(false)}>
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
            <div className="hero-card" style={{ background: 'var(--bg-input)', padding: '24px', borderRadius: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL PORTFOLIO VALUE</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold-400)', margin: '4px 0 12px' }}>
                ₹96,797
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Holdings: 15.50 Grams 24K</span>
                <span style={{ color: 'var(--green-500)', fontWeight: 700 }}>+12.4% Profit</span>
              </div>
            </div>
            <button className="btn-primary-gold" style={{ width: '100%' }} onClick={() => setShowWalletModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Generic Tool / Insight Modal */}
      {activeModalTitle && (
        <div className="modal-overlay" onClick={() => setActiveModalTitle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{activeModalTitle}</h3>
              <button className="icon-btn" onClick={() => setActiveModalTitle(null)}>
                <X size={20} />
              </button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {activeModalTitle.includes('Indices') 
                ? 'SENSEX and NIFTY 50 reflect the overall Indian equity market sentiment. Historically, gold acts as a hedge: when equities face volatility, gold demand surges.'
                : `${activeModalTitle} gives you real-time data feeds, institutional market depth, and instant analytics designed for smart precious metal investors.`}
            </p>
            <button className="btn-primary-gold" style={{ width: '100%' }} onClick={() => setActiveModalTitle(null)}>
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
              <h3 className="modal-title">Market Insight Report</h3>
              <button className="icon-btn" onClick={() => setShowArticleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="badge-alert" style={{ width: 'fit-content' }}>MARKET ALERT</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Why Central Banks are increasing their Gold reserves in 2024.
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Global central banks added over 1,000 tonnes of gold to official reserves in recent consecutive years. Diversification away from single-currency concentration and macro inflation risk remain top drivers.
              </p>
            </div>
            <button className="btn-primary-gold" style={{ width: '100%' }} onClick={() => setShowArticleModal(false)}>
              Close Article
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
