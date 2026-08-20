import { ShieldCheck, Zap, Award } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">BIS Certified Purity</h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              All prices are based on official BIS Hallmarked 24K pure gold (99.9%) and 22K jewellery gold (91.6%).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">Live Indian Gold Rates</h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              Real-time gold prices updated directly from Indian gold market and MCX daily rates.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <Award size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">Clear GST Breakdown</h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              Clear breakdown of gold price, jeweller making charges, and standard 3% Indian GST.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
