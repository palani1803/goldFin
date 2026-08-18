import { ShieldCheck, Zap, Award } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-gradient-to-r from-[#0D172E]/90 via-[#0A1329]/95 to-[#0D172E]/90 border border-[#1E3159] shadow-[0_15px_40px_rgba(4,8,19,0.5)] backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">BIS Certified Purity</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              All prices are based on official BIS Hallmarked 24K pure gold (99.9%) and 22K jewellery gold (91.6%).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center shrink-0">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Live Indian Gold Rates</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Real-time gold prices updated directly from Indian gold market and MCX daily rates.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center shrink-0">
            <Award size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Clear GST Breakdown</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Clear breakdown of gold price, jeweller making charges, and standard 3% Indian GST.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
