import { ShieldCheck, Zap, Award } from 'lucide-react'
import { useLanguage } from '../i18n'

export default function TrustBanner() {
  const { t } = useLanguage()

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">{t('trustBisTitle')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              {t('trustBisDesc')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">{t('trustLiveRatesTitle')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              {t('trustLiveRatesDesc')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <Award size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">{t('trustGstTitle')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              {t('trustGstDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
