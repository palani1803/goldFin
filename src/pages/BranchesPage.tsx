import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  Scale,
  Lock,
  PhoneCall,
  MapPin
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'
import { useLanguage } from '../i18n'

// Branch images
import goldLoanBankHero from '../assets/gold_loan_bank_hero.jpg'
import goldHeroJewel from '../assets/gold_hero_jewel.jpg'
import handGoldLoan from '../assets/hand_gold_loan.jpg'
import bankVaultGold from '../assets/bank_vault_gold.jpg'
import heroGoldBroad from '../assets/hero_gold_broad.jpg'

export interface BranchesPageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateContact?: () => void
}

interface BranchItem {
  id: string
  name: string
  subtitle: string
  city: string
  image: string
}

const BRANCHES_LIST: BranchItem[] = [
  {
    id: 'sivakasi',
    name: 'Sivakasi Branch',
    subtitle: 'GoldFin Sivakasi',
    city: 'Sivakasi',
    image: goldLoanBankHero,
  },
  {
    id: 'srivilliputhur',
    name: 'Srivilliputhur Branch',
    subtitle: 'GoldFin Srivilliputhur',
    city: 'Srivilliputhur',
    image: goldHeroJewel,
  },
  {
    id: 'puthupatti',
    name: 'M.Puthupatti Branch',
    subtitle: 'GoldFin M.Puthupatti',
    city: 'M.Puthupatti',
    image: handGoldLoan,
  },
  {
    id: 'rajapalayam',
    name: 'Rajapalayam Branch',
    subtitle: 'GoldFin Rajapalayam',
    city: 'Rajapalayam',
    image: bankVaultGold,
  },
  {
    id: 'alangulam',
    name: 'Alangulam Branch',
    subtitle: 'GoldFin Alangulam',
    city: 'Alangulam',
    image: heroGoldBroad,
  }
]

export default function BranchesPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: BranchesPageProps) {
  const { t, isTamil } = useLanguage()

  const handleBranchClick = () => {
    if (onNavigateContact) {
      onNavigateContact()
    } else {
      window.location.hash = '#contact'
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Ambient background decoration */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar */}
      <Navbar
        currentPage="branches"
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

      {/* Main Content Area */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-10 md:py-14 relative z-10 w-full flex flex-col gap-14 md:gap-20">
        {/* Breadcrumb & Section Header */}
        <div className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              {t('navHome')}
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">{t('navBranches')}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold tracking-wider uppercase shadow-sm">
            <Sparkles size={14} />
            <span>{isTamil ? 'கோல்ட்பின் கிளைகள் வலையமைப்பு' : 'GOLDFIN BRANCH NETWORK'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isTamil ? (
              <>
                எங்கள் பிராந்திய{' '}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  கிளைகள்
                </span>
              </>
            ) : (
              <>
                Our Regional{' '}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  Branches
                </span>
              </>
            )}
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full" />

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isTamil
              ? 'தமிழ்நாட்டின் எங்கள் அதிகாரப்பூர்வ கிளைகளை அணுகுங்கள். நேரடி தங்க விலை, உடனடி 15 நிமிட கடன் அனுமதி மற்றும் ஜெர்மன் XRF தூய்மை பரிசோதனை அனுபவியுங்கள்.'
              : 'Visit any of our authorized branches across Tamil Nadu. Experience transparent live gold rates, instant 15-minute loan sanctions, and German XRF purity appraisals.'}
          </p>
        </div>

        {/* SECTION 1: KABIN GOLD POINT STYLE BRANCH SHOWCASE CARDS */}
        <section className="flex flex-col gap-10">
          {/* 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch">
            {BRANCHES_LIST.slice(0, 4).map((branch) => {
              const localizedName = isTamil
                ? (branch.id === 'sivakasi' ? t('branchSivakasiName') : branch.id === 'srivilliputhur' ? t('branchSrivilliputhurName') : branch.id === 'puthupatti' ? t('branchPuthupattiName') : branch.id === 'rajapalayam' ? t('branchRajapalayamName') : t('branchAlangulamName'))
                : branch.name

              return (
                <div
                  key={branch.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-orange-300 transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-6 sm:p-8 shadow-sm hover:shadow-xl group"
                >
                  {/* Branch Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors mb-5">
                    {localizedName}
                  </h3>

                  {/* Branch Image Container with Overlay Caption */}
                  <div
                    onClick={handleBranchClick}
                    className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-200/80 bg-slate-100 group/img"
                  >
                    <img
                      src={branch.image}
                      alt={localizedName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Floating City Caption */}
                    <div className="absolute bottom-4 left-0 right-0 px-4 flex flex-col items-center justify-center text-white">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">
                        GoldFin Point
                      </span>
                      <span className="text-lg sm:text-xl font-black text-white drop-shadow-md">
                        {branch.city}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-7 w-full flex justify-center">
                    <button
                      onClick={handleBranchClick}
                      className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer border-0 shadow-md bg-slate-900 hover:bg-[#FF6B00] text-white hover:shadow-orange-500/20"
                    >
                      <span>{isTamil ? `${branch.city} கிளை விவரம்` : `Visit ${branch.city} Branch`}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Centered 5th Branch Card (Alangulam) */}
          <div className="max-w-xl mx-auto w-full">
            {BRANCHES_LIST.slice(4, 5).map((branch) => {
              const localizedName = isTamil ? t('branchAlangulamName') : branch.name
              return (
                <div
                  key={branch.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-orange-300 transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-6 sm:p-8 shadow-sm hover:shadow-xl group"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors mb-5">
                    {localizedName}
                  </h3>

                  <div
                    onClick={handleBranchClick}
                    className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-200/80 bg-slate-100 group/img"
                  >
                    <img
                      src={branch.image}
                      alt={localizedName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-0 right-0 px-4 flex flex-col items-center justify-center text-white">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">
                        GoldFin Point
                      </span>
                      <span className="text-lg sm:text-xl font-black text-white drop-shadow-md">
                        {branch.city}
                      </span>
                    </div>
                  </div>

                  <div className="mt-7 w-full flex justify-center">
                    <button
                      onClick={handleBranchClick}
                      className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer border-0 shadow-md bg-slate-900 hover:bg-[#FF6B00] text-white hover:shadow-orange-500/20"
                    >
                      <span>{isTamil ? `${branch.city} கிளை விவரம்` : `Visit ${branch.city} Branch`}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 2: LATEST MACHINERY & APPRAISAL LAB */}
        <section className="flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
              STATE-OF-THE-ART INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Latest Machinery & Appraisal Lab
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full mx-auto" />
            <p className="text-xs sm:text-sm text-slate-500">
              Every GoldFin branch is fitted with certified German XRF karatmeters and precision micro-balances for 100% transparent purity evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Machine 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                  German XRF Purity Karatmeter
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Non-destructive optical gold purity testing that analyzes exact gold karatage (18K, 22K, 24K) without touching, melting, or scratching your jewellery.
                </p>
              </div>
            </div>

            {/* Machine 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scale size={24} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                  High-Precision Micro Weighing Scale
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Government-stamped calibrated electronic weighing scales accurate to 0.001 grams with customer-facing digital displays for zero discrepancy.
                </p>
              </div>
            </div>

            {/* Machine 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  Multi-Tier Insured Bank Vaults
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Heavy steel safe lockers with biometric access, 24/7 CCTV surveillance, and 100% insurance coverage by national underwriting agencies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CALL TO ACTION BANNER */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                GOLDFIN BULLION & LOAN DESK
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Instant Money for Your Gold Jewellery
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Need immediate funds against your gold ornaments? Walk into any of our branches or view complete address and interactive location maps on our Contact page.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <a
                href="tel:+919092548347"
                className="w-full sm:w-auto py-3.5 px-7 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2.5 no-underline cursor-pointer"
              >
                <PhoneCall size={16} />
                <span>Call Central Desk (+91 90925 48347)</span>
              </a>

              <button
                onClick={handleBranchClick}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <MapPin size={15} className="text-[#FF6B00]" />
                <span>View Branch Maps & Details</span>
              </button>
            </div>
          </div>
        </section>

        {/* Reusable Trust Banner */}
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
