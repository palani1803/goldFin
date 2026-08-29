import { ShieldCheck, Zap, Award } from 'lucide-react'
import { useSiteSettings } from '../hooks/useSiteSettings'

export default function TrustBanner() {
  const { settings } = useSiteSettings()
  const bankName = settings.bankPartnerName || '100% Insured Bank Vaults'

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-50/60 via-white to-amber-50/50 border border-orange-200/80 shadow-[0_10px_35px_rgba(249,115,22,0.06)] backdrop-blur-xl divide-y md:divide-y-0 md:divide-x divide-orange-100">
        <div className="flex items-start gap-4 pt-4 md:pt-0 md:pr-4 first:pt-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              100% BIS Hallmarked Purity <span className="block text-xs font-semibold text-orange-600/90 mt-0.5">Certified Optical Testing</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              Government-approved German XRF laser Karatmeter testing. Non-destructive appraisal with zero damage to jewellery.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 pt-4 md:pt-0 md:px-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 shadow-xs">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              Live IBJA & MCX Market Rates <span className="block text-xs font-semibold text-orange-600/90 mt-0.5">Live Indian Benchmark Rates</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              100% transparent live pricing with maximum loan valuation per gram. Real-time rates updated continuously.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 shadow-xs">
            <Award size={24} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              Complete Transparency & Safety <span className="block text-xs font-semibold text-orange-600/90 mt-0.5">{bankName}</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              Zero hidden fees, 24/7 CCTV surveillance, and 100% fully insured multi-tier bank security vaults.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
