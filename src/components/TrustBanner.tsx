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
              100% BIS ஹால்மார்க் தூய்மை <span className="block text-xs font-semibold text-slate-500">BIS Hallmarked Purity</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              அரசு அங்கீகரிக்கப்பட்ட ஜெர்மன் XRF காரட்மீட்டர் சோதனை. Non-destructive laser appraisal with zero damage.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              நேரடி IBJA & MCX சந்தை விலை <span className="block text-xs font-semibold text-slate-500">Live Indian Benchmark Rates</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              வெளிப்படையான விலை மற்றும் அதிகபட்ச கடன் தொகை. Direct market rates with maximum per-gram loan valuation.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <Award size={24} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              முழு வெளிப்படைத்தன்மை & பாதுகாப்பு <span className="block text-xs font-semibold text-slate-500">100% Insured Bank Vaults</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
              மறைமுக கட்டணங்கள் இல்லை. 100% காப்பீடு செய்யப்பட்ட பெட்டகங்கள். Zero hidden fees & insured custody.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
