import { ShieldCheck, Zap, Award } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-gradient-to-r from-[#222222] via-[#1A1A1A] to-[#222222] border border-[#C89B2A]/20 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Certified Purity Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              All rates correspond to BIS Hallmarked 99.9% 24K and 91.6% 22K certified standards.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center shrink-0">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Indian Exchange Feeds</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Low-latency live domestic spot price feeds synchronized with IBJA & MCX benchmarks.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center shrink-0">
            <Award size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">GST Itemized Compliance</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Automatic breakdown of base metal price, making charges, and standard 3% Indian GST.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
