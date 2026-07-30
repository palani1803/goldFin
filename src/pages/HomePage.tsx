import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Calculator,
  BookOpen,
  Newspaper,
  LineChart,
  ArrowUpRight,
  X,
  Sparkles,
  Mail,
  ShieldCheck,
  Award,
  Zap,
  Coins,
  CoinsIcon,
  Scale,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Building2,
  Target,
  Users,
  CheckCircle2
} from 'lucide-react'
import heroBg from '../assets/gold_hero_bg.png'
import goldBullionImg from '../assets/hero_gold_bullion.png'
import '../App.css'

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

const SIDE_ARTICLES = [
  { id: 1, title: 'Gold vs Digital Assets: Macro Portfolio Allocation in 2024', readTime: '4 MIN READ', date: '2 hours ago' },
  { id: 2, title: 'Impact of Federal Reserve Interest Rate Decisions on Spot Gold', readTime: '6 MIN READ', date: '5 hours ago' },
  { id: 3, title: 'Understanding Sovereign Gold Bond (SGB) Redemption Dynamics', readTime: '5 MIN READ', date: '1 day ago' },
]

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How is the Gold Calculator price calculated?',
    answer: 'The calculation uses the live 24K spot bullion exchange rate as a baseline (currently ₹6,245/g). For lower karats (22K, 20K, 18K), the rate is proportionally derived based on pure gold content (e.g. 22K = 24K Rate × 22/24).'
  },
  {
    id: 2,
    question: 'What is the standard GST tax on gold in India?',
    answer: 'A standard 3% GST (Goods and Services Tax) is applicable on the total gold purchase amount, plus 5% GST on making charges.'
  },
  {
    id: 3,
    question: 'What is the difference between 24K and 22K Gold?',
    answer: '24K gold contains 99.9% pure gold, making it soft and ideal for investment coins and bars. 22K gold contains 91.6% pure gold alloyed with zinc or copper for durable jewelry creation.'
  },
  {
    id: 4,
    question: 'Are the live spot rates updated in real-time?',
    answer: 'Yes, GoldFin feeds real-time spot pricing directly from institutional bullion exchanges with minimal latency.'
  }
]

export default function HomePage() {
  // Modals
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [activeModalTitle, setActiveModalTitle] = useState<string | null>(null)

  // Accordion state
  const [openFaqId, setOpenFaqId] = useState<number | null>(1)

  // --- Reference Gold Calculator State ---
  const [calcMode, setCalcMode] = useState<'amount' | 'gold'>('amount')
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedCarat, setSelectedCarat] = useState<number>(22)
  const [isCalculated, setIsCalculated] = useState<boolean>(false)

  // 24K Base Spot Rate: ₹6,245 per gram
  const spotRate24K = 6245
  // Rate per gram for selected carat: (24K Rate * Carat / 24)
  const rateForCarat = Math.round(spotRate24K * (selectedCarat / 24))

  // Calculations
  const parsedVal = parseFloat(inputValue) || 0
  
  // For 'amount' mode: Gold Weight in Grams = Amount / RateForCarat
  const calculatedGoldWeight = parsedVal > 0 ? (parsedVal / rateForCarat).toFixed(2) : '0.00'
  
  // For 'gold' mode: Total Cash Value = WeightGrams * RateForCarat
  const calculatedRupees = parsedVal > 0 ? Math.round(parsedVal * rateForCarat).toLocaleString('en-IN') : '0'

  const handleCalculate = () => {
    if (parsedVal > 0) {
      setIsCalculated(true)
    }
  }

  const handlePresetSelect = (val: string) => {
    setInputValue(val)
    setIsCalculated(true)
  }

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app-container">
      {/* Background Ambient Glows */}
      <div className="ambient-glow-top"></div>
      <div className="ambient-glow-mid"></div>
      <div className="ambient-glow-bottom"></div>

      {/* Top Header */}
      <header className="app-header">
        <div className="container header-inner">
          {/* Brand Logo */}
          <a href="#" className="brand-logo" onClick={() => scrollToSection('overview')}>
            <div className="logo-icon-pod">
              <Coins size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-name">GoldFin</span>
              <span className="brand-tag">INSTITUTIONAL BULLION</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="desktop-nav">
            <button className="nav-link" onClick={() => scrollToSection('about')}>About Us</button>
            <button className="nav-link" onClick={() => scrollToSection('calculator')}>Calculator</button>
            <button className="nav-link" onClick={() => scrollToSection('rates')}>Live Rates</button>
            <button className="nav-link" onClick={() => scrollToSection('analysis')}>Market Insights</button>
            <button className="nav-link" onClick={() => scrollToSection('faq')}>FAQ</button>
          </nav>
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
                Gold is a timeless asset that protects wealth from inflation and market volatility. Calculate exact gold rate with taxes in seconds, track live market prices, and make smart investment decisions.
              </p>
              

              {/* Stats Ticker Row */}
              
            </div>

            {/* Right Gold Bullion Showcase Image */}
            <div className="hero-gold-showcase">
              <div className="showcase-badge-top">
                <Sparkles size={14} />
                <span>999.9 FINE GOLD BULLION</span>
              </div>
              <img src={goldBullionImg} alt="Luxury Gold Vault" className="hero-gold-img" />
              <div className="showcase-badge-bottom">
                <ShieldCheck size={16} color="var(--gold-400)" />
                <span>BIS HALLMARK CERTIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections Container */}
      <main className="container main-sections">
        {/* Dedicated Gold Calculator Section */}
        <section id="calculator">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-subtitle">Real-Time Metal Valuation</span>
              <h2 className="section-main-title">Gold Rate Calculator</h2>
            </div>
            <div className="rate-ticker-pill">
              <CoinsIcon size={14} />
              <span>LIVE SPOT RATE: ₹{spotRate24K}/g</span>
            </div>
          </div>

          <div className="calculator-section-wrapper">
            <div className="calculator-card-ref">
              {/* Dual Mode Switcher Tabs */}
              <div className="mode-tab-container">
                <button
                  className={`mode-tab-btn ${calcMode === 'amount' ? 'active' : ''}`}
                  onClick={() => {
                    setCalcMode('amount')
                    setInputValue('')
                    setIsCalculated(false)
                  }}
                >
                  <Coins size={18} />
                  <span>Amount Required</span>
                </button>
                <button
                  className={`mode-tab-btn ${calcMode === 'gold' ? 'active' : ''}`}
                  onClick={() => {
                    setCalcMode('gold')
                    setInputValue('')
                    setIsCalculated(false)
                  }}
                >
                  <Scale size={18} />
                  <span>Gold in hand</span>
                </button>
              </div>

              {/* Input Field */}
              <div className="input-amount-wrapper">
                <span className="input-prefix-icon">
                  {calcMode === 'amount' ? '₹' : 'g'}
                </span>
                <input
                  type="number"
                  className="input-amount-field"
                  placeholder={calcMode === 'amount' ? 'Enter amount (e.g. 50000)' : 'Enter weight in grams (e.g. 10)'}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setIsCalculated(false)
                  }}
                />
              </div>

              {/* Quick Presets Row */}
              <div className="preset-pills-row">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Quick Presets:</span>
                {calcMode === 'amount' ? (
                  <>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('25000')}>₹25,000</button>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('50000')}>₹50,000</button>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('100000')}>₹1,00,000</button>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('500000')}>₹5,00,000</button>
                  </>
                ) : (
                  <>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('5')}>5 Grams</button>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('10')}>10 Grams</button>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('11.66')}>1 Tola (11.66g)</button>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('50')}>50 Grams</button>
                    <button className="preset-pill-btn" onClick={() => handlePresetSelect('100')}>100 Grams</button>
                  </>
                )}
              </div>

              {/* Carat Value Pills Selector */}
              <div>
                <div className="carat-selector-label">Choose the carat value of your gold</div>
                <div className="carat-pills-row">
                  {[18, 19, 20, 21, 22, 24].map((carat) => (
                    <button
                      key={carat}
                      className={`carat-pill-btn ${selectedCarat === carat ? 'active' : ''}`}
                      onClick={() => setSelectedCarat(carat)}
                    >
                      {carat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result / Instruction Banner Box */}
              <div className="calc-result-banner">
                {calcMode === 'amount' ? (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="calc-result-text">Required Gold Weight:</div>
                      <div className="calc-result-highlight">
                        {calculatedGoldWeight} Grams of {selectedCarat}K Gold
                      </div>
                      <div className="calc-result-meta">
                        Based on {selectedCarat}K Gold rate: ₹{rateForCarat.toLocaleString('en-IN')}/gram
                      </div>
                    </>
                  ) : (
                    <div className="calc-result-text" style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                      Enter the amount and carat value to see how much gold is required.
                    </div>
                  )
                ) : (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="calc-result-text">Estimated Valuation:</div>
                      <div className="calc-result-highlight">
                        ₹{calculatedRupees}
                      </div>
                      <div className="calc-result-meta">
                        For {parsedVal} Grams of {selectedCarat}K Gold @ ₹{rateForCarat.toLocaleString('en-IN')}/gram
                      </div>
                    </>
                  ) : (
                    <div className="calc-result-text" style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                      Enter the weight in grams and carat value to calculate your gold valuation.
                    </div>
                  )
                )}
              </div>

              {/* Calculate Action Button */}
              <button className="calc-submit-btn" onClick={handleCalculate}>
                Calculate
              </button>

              {/* Note Footer */}
              <div className="calc-note-text">
                <strong>Note:</strong> The displayed amount is an approximate value based on live exchange spot rates. Final value depends on branch appraisal.
              </div>
            </div>
          </div>
        </section>

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

        {/* Investment Tools Section */}
        <section id="tools">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-subtitle">Smart Bullion Suite</span>
              <h2 className="section-main-title">Investment Tools</h2>
            </div>
          </div>

          <div className="tools-grid">
            <div className="tool-card" onClick={() => scrollToSection('calculator')}>
              <div className="tool-icon-pod">
                <Calculator size={24} />
              </div>
              <h3 className="tool-card-title">Live Rate Calculator</h3>
              <p className="tool-card-desc">Calculate instant metal value, making charges, and GST breakdown.</p>
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

        {/* About Us Section */}
        <section id="about" className="about-section">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-main-title">About GoldFin</h2>
            </div>
            <div className="rate-ticker-pill">
              <Building2 size={14} />
              <span>EST. 2024 • INSTITUTIONAL BULLION</span>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-content-card">
              <div className="about-badge">
                <Target size={14} />
                <span>OUR MISSION & VISION</span>
              </div>
              <h3 className="about-heading">
                Democratizing Institutional Precious Metal Intelligence
              </h3>
              <p className="about-description">
                GoldFin was founded with a singular commitment: to bring institutional-grade spot bullion pricing, real-time purity tracking, and 100% transparent GST calculations to individual investors, jewelers, and financial institutions across India.
              </p>
              <p className="about-description">
                Whether you are evaluating a family gold purchase, tracking 24K bullion spot movements, or planning long-term Sovereign Gold Bond portfolios, GoldFin delivers real-time bullion exchange feeds with zero delay.
              </p>

              <div className="about-checklist">
                <div className="about-check-item">
                  <CheckCircle2 size={18} color="var(--gold-400)" />
                  <span>Direct Integration with MCX & International Spot Feeds</span>
                </div>
                <div className="about-check-item">
                  <CheckCircle2 size={18} color="var(--gold-400)" />
                  <span>BIS Hallmarked 999.9 Purity Calculation Standard</span>
                </div>
                <div className="about-check-item">
                  <CheckCircle2 size={18} color="var(--gold-400)" />
                  <span>Automated Indian GST (3%) & Making Charge Itemization</span>
                </div>
              </div>
            </div>

            <div className="about-stats-card">
              <h4 className="about-stats-title">Platform Impact & Reach</h4>
              <div className="about-metrics-grid">
                <div className="about-metric-box">
                  <div className="metric-icon-wrap">
                    <Coins size={20} color="var(--gold-400)" />
                  </div>
                  <div className="metric-number">₹500Cr+</div>
                  <div className="metric-label">Monthly Valued Bullion</div>
                </div>

                <div className="about-metric-box">
                  <div className="metric-icon-wrap">
                    <Zap size={20} color="var(--gold-400)" />
                  </div>
                  <div className="metric-number">99.99%</div>
                  <div className="metric-label">Spot Feed Uptime</div>
                </div>

                <div className="about-metric-box">
                  <div className="metric-icon-wrap">
                    <Users size={20} color="var(--gold-400)" />
                  </div>
                  <div className="metric-number">150,000+</div>
                  <div className="metric-label">Active Investors</div>
                </div>

                <div className="about-metric-box">
                  <div className="metric-icon-wrap">
                    <Award size={20} color="var(--gold-400)" />
                  </div>
                  <div className="metric-number">100%</div>
                  <div className="metric-label">BIS Hallmark Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consumer FAQ Section */}
        <section id="faq">
          <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="section-title-group" style={{ alignItems: 'center' }}>
              <span className="section-subtitle">Got Questions?</span>
              <h2 className="section-main-title">Frequently Asked Questions</h2>
            </div>
          </div>

          <div className="faq-grid">
            {FAQ_ITEMS.map((faq) => (
              <div 
                key={faq.id} 
                className="faq-item-card"
                onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
              >
                <div className="faq-question-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={20} color="var(--gold-400)" />
                    <span className="faq-question-title">{faq.question}</span>
                  </div>
                  {openFaqId === faq.id ? <ChevronUp size={20} color="var(--gold-400)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </div>

                {openFaqId === faq.id && (
                  <p className="faq-answer-text">{faq.answer}</p>
                )}
              </div>
            ))}
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
                <li><span className="footer-link" onClick={() => scrollToSection('about')}>About GoldFin</span></li>
                <li><span className="footer-link" onClick={() => scrollToSection('rates')}>24K Gold Rates</span></li>
                <li><span className="footer-link" onClick={() => scrollToSection('rates')}>22K Gold Rates</span></li>
                <li><span className="footer-link" onClick={() => scrollToSection('rates')}>Silver 999 Rates</span></li>
                <li><span className="footer-link" onClick={() => scrollToSection('calculator')}>Live Gold Calculator</span></li>
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
