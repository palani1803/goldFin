import {
  ShieldCheck,
  Zap,
  Award,
  Lock,
  Building2,
  Users,
  Target,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Mail,
  TrendingUp
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground, AboutTrustHeroBanner } from '../components'

interface AboutPageProps {
  onNavigateHome?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateAbout?: () => void
  onNavigateContact?: (city?: string) => void
}

export default function AboutPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: AboutPageProps) {

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Reusable White & Orange Ambient Background */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="about"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
        onNavigateBranches={onNavigateBranches}
        onNavigateContact={onNavigateContact}
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

      {/* Main Content Container */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10 w-full flex flex-col gap-14 md:gap-20">
        {/* Breadcrumb & Hero Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              முகப்பு (Home)
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">எங்களை பற்றி (About Us)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit uppercase">
                <Sparkles size={14} />
                <span>நிறுவப்பட்டது 2024 • EST. 2024 • INDIA'S TRUSTED GOLD PLATFORM</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[3.1rem] font-black text-slate-900 tracking-tight leading-[1.15]">
                தங்க விலை & கடன்களில் <br />
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  உங்கள் நம்பகமான கூட்டாளி
                </span>
                <span className="block text-base sm:text-xl font-bold text-slate-500 mt-1">
                  Your Trusted Partner in Live Gold Rates & Loans
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
                கோல்ட்பின் நேரடி தங்க விலை மற்றும் உடனடி தங்கக் கடன்களுக்கான நம்பகமான தளமாகும். நிகழ்நேர 1 கிராம் தூய்மை விலைகள், BIS ஹால்மார்க் தரநிலைகள் மற்றும் 100% பாதுகாப்பான வங்கி லாக்கர் கடன் வசதிகளை வழங்குகிறோம். Complete price transparency with verified standards.
              </p>
            </div>

            {/* Right Image Visual — Vector High Definition: Your Trust. Your Wealth. Your Golden Future. */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[580px] group">
                {/* Decorative Amber Glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500/25 via-amber-400/15 to-transparent rounded-3xl blur-2xl -z-10 group-hover:from-orange-500/35 transition-all duration-500" />

                <AboutTrustHeroBanner />
              </div>
            </div>
          </div>
        </div>

        {/* Core Metrics Strip (4 Impact Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
              <TrendingUp size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              ₹500+ Cr
            </div>
            <div className="text-xs text-slate-500 font-medium">மாதாந்திர தங்க மதிப்பீடு • Gold Valued</div>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
              <Users size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              10,000+
            </div>
            <div className="text-xs text-slate-500 font-medium">மகிழ்ச்சியான குடும்பங்கள் • Happy Clients</div>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
              <Zap size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              99.99%
            </div>
            <div className="text-xs text-slate-500 font-medium">நேரடி விலை துல்லியம் • Rate Accuracy</div>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
              <Award size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              100%
            </div>
            <div className="text-xs text-slate-500 font-medium">BIS ஹால்மார்க் தூய்மை • Hallmark Verified</div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mission Card */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold w-fit">
                <Target size={14} />
                <span>எங்கள் நோக்கம் • OUR CORE MISSION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                தங்க விலையில் முழு வெளிப்படைத்தன்மை <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">Democratizing Price Transparency Across India</span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                மறைமுக கட்டணங்களை தவிர்த்து, மக்களுக்கு நேரடி தங்க விலை, துல்லியமான 1 கிராம் கணக்கீடு மற்றும் தெளிவான 3% GST விவரங்களை வழங்குவதே எங்கள் முக்கிய நோக்கமாகும்.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>IBJA நேரடி புதுப்பிப்புகள் • Direct IBJA Updates</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>MCX கமாடிட்டி சந்தை விலை • Live MCX Spot Rates</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>6 இலக்க BIS HUID சரிபார்ப்பு • Strict 6-Digit HUID Verification</span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold w-fit">
                <Building2 size={14} />
                <span>எங்கள் தொலைநோக்கு • OUR VISION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                இந்தியாவின் முதன்மை தங்க தளம் <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">Building India's Most Trusted Gold Platform</span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                ஒவ்வொரு குடும்பமும் முழு நம்பிக்கையுடன் தங்க நகைகளை வாங்கவும், நியாயமான சந்தை விலையில் உடனடி கடன் பெறவும் வழிவகுப்பது.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>75% வரை உடனடி கடன் அனுமதி • Instant 75% RBI-Sanctioned Value</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>100% காப்பீடு செய்த பெட்டகம் • 100% Insured Bank Vaults</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>தினசரி நிகழ்நேர விலை நிலவரம் • Continuous Live Price Benchmarks</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              எங்கள் கொள்கைகள் • OUR CORE PILLARS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              கோல்ட்பின் 4 முக்கிய தூண்கள் <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">The Four Pillars of GoldFin</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              கோல்ட்பின் இயங்கும் அடிப்படை நெறிமுறைகள் மற்றும் உறுதிமொழிகள்.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                சான்றளிக்கப்பட்ட தூய்மை • Certified Purity
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                24K (999) மற்றும் 22K (916) தங்கத்திற்கு 100% BIS ஹால்மார்க் அங்கீகரிக்கப்பட்ட தரநிலைகள்.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                நேரடி விலை நிலவரம் • Live Rates
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                IBJA மற்றும் MCX சந்தை குறியீடுகளுடன் நிகழ்நேரத்தில் இணைக்கப்பட்ட விலை தரவு.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                தெளிவான GST விவரம் • Clear 3% GST
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                தங்க உலோகம், செய் கூலி மற்றும் 3% ஜிஎஸ்டி வரியின் துல்லியமான முழுக் கணக்கீடு.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Lock size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                100% பாதுகாப்பான பெட்டகம் • Insured Vaults
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                24/7 சிசிடிவி கண்காணிப்பு மற்றும் முழு காப்பீட்டுடன் கூடிய உயர் பாதுகாப்பு வங்கி பெட்டகங்கள்.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-orange-50 via-white to-orange-50 border border-orange-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_35px_rgba(249,115,22,0.08)]">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              கோல்ட்பின் உதவி வேண்டுமா? <span className="block text-base font-bold text-slate-500 mt-0.5">Need Assistance from GoldFin?</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              நேரடி தங்க விலை, கடன் கணக்கீடுகள் அல்லது கிளை சந்திப்பு குறித்த சந்தேகங்களுக்கு எங்களை தொடர்புகொள்ளவும்.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => {
                if (onNavigateContact) {
                  onNavigateContact()
                } else {
                  window.location.hash = '#contact'
                }
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer border-0 flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              <span>தொடர்பு கொள்ள • Contact Us</span>
            </button>
          </div>
        </div>

        {/* Trust Banner Component */}
        <TrustBanner />
      </main>

      {/* Footer via Reusable Component */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
        onNavigateBranches={onNavigateBranches}
        onNavigateContact={onNavigateContact}
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
    </div>
  )
}
