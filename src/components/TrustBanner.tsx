import { ShieldCheck, Zap, Award } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              100% BIS Hallmarked Purity <span className="block text-xs font-semibold text-slate-500">Certified Optical Testing</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              Government-approved German XRF laser Karatmeter testing. Non-destructive appraisal with zero damage to jewellery.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              Live IBJA & MCX Market Rates <span className="block text-xs font-semibold text-slate-500">Live Indian Benchmark Rates</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              100% transparent live pricing with maximum loan valuation per gram. Real-time rates updated continuously.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <Award size={24} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              Complete Transparency & Safety <span className="block text-xs font-semibold text-slate-500">100% Insured Bank Vaults</span>
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
