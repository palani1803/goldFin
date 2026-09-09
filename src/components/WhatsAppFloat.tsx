import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, ShieldCheck, ExternalLink, ChevronRight, RotateCcw, CheckCircle2, Check } from 'lucide-react'
import { useSiteSettings } from '../hooks/useSiteSettings'

export interface WhatsAppFloatProps {
  phoneNumber?: string
  defaultMessage?: string
}

// Step-by-step question flow configuration
interface QuestionStep {
  id: string
  label: string
  question: string
  options: string[]
}

const CHAT_QUESTIONS: QuestionStep[] = [
  {
    id: 'gold_weight',
    label: 'தங்கத்தின் எடை',
    question: 'நீங்கள் எத்தனை கிராம் தங்கம் விற்க விரும்புகிறீர்கள்?',
    options: [
      '1-25 கிராம்',
      '25-50 கிராம்',
      '50-75 கிராம்',
      '75-100 கிராம்',
      '101 கிராமுக்கு மேல்',
    ],
  },
  {
    id: 'gold_location',
    label: 'தங்கம் உள்ள இடம்',
    question: 'நீங்கள் விற்க விரும்பும் தங்கம் வீட்டில் அல்லது அடகில் உள்ளதா?',
    options: [
      'வீட்டில் உள்ளது',
      'வங்கியில் அடகு வைத்துள்ளேன்',
    ],
  },
]

export default function WhatsAppFloat({
  phoneNumber,
  defaultMessage,
}: WhatsAppFloatProps) {
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahes Bankers'
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [customMsg, setCustomMsg] = useState('')
  const chatBodyRef = useRef<HTMLDivElement>(null)

  const activePhone = phoneNumber || settings.whatsappNumber || '9092548347'
  const cleanPhone = activePhone.replace(/[^0-9]/g, '')
  const fullPhone = cleanPhone.startsWith('91') && cleanPhone.length > 10 ? cleanPhone : `91${cleanPhone}`

  // Auto scroll to bottom when steps progress
  useEffect(() => {
    if (chatBodyRef.current) {
      setTimeout(() => {
        chatBodyRef.current?.scrollTo({
          top: chatBodyRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }, 150)
    }
  }, [currentStep, isComplete])

  const buildWhatsAppMessage = (currentAnswers: Record<string, string>) => {
    const details = CHAT_QUESTIONS
      .filter((q) => currentAnswers[q.id])
      .map((q) => `• ${q.label}: *${currentAnswers[q.id]}*`)

    return `வணக்கம் ${companyName},\n\nநான் தங்கம் விற்க விரும்புகிறேன். எனது விவரங்கள்:\n${details.join('\n')}\n\nதயவுசெய்து என்னை தொடர்பு கொள்ளவும்.`
  }

  const handleSelectOption = (option: string) => {
    const currentQuestion = CHAT_QUESTIONS[currentStep]
    const allAnswers = { ...answers, [currentQuestion.id]: option }
    setAnswers(allAnswers)

    if (currentStep + 1 < CHAT_QUESTIONS.length) {
      // Advance to next question inside the chatbot
      setCurrentStep((prev) => prev + 1)
    } else {
      // Both questions answered — complete and open WhatsApp
      setIsComplete(true)
      const messageText = buildWhatsAppMessage(allAnswers)
      const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(messageText)}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleSendToWhatsApp = (customText?: string) => {
    let messageText = ''

    if (customText) {
      messageText = customText
    } else if (isComplete || Object.keys(answers).length > 0) {
      messageText = buildWhatsAppMessage(answers)
    } else {
      messageText = customMsg.trim() || defaultMessage || `Hello ${companyName}, I would like to know about selling gold.`
    }

    const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(messageText)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setIsComplete(false)
    setCustomMsg('')
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto select-none font-sans">
      {/* Floating Interactive Chat Card */}
      {isOpen && (
        <div
          className="mb-3.5 w-[calc(100vw-32px)] max-w-[380px] sm:w-[380px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-emerald-500/30 bg-slate-900/95 backdrop-blur-2xl text-white transition-all duration-300 transform origin-bottom-right animate-in fade-in slide-in-from-bottom-5"
          style={{
            boxShadow: '0 20px 50px rgba(18, 140, 126, 0.25), 0 0 0 1px rgba(37, 211, 102, 0.2)',
          }}
        >
          {/* Card Header */}
          <div className="p-4 bg-gradient-to-r from-[#128C7E] via-[#075E54] to-[#0b4b44] text-white flex items-center justify-between relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
                  <WhatsAppIcon className="w-6 h-6 fill-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold tracking-wide text-white">{companyName} WhatsApp Desk</span>
                  <ShieldCheck size={14} className="text-emerald-300" />
                </div>
                <span className="text-[11px] font-medium text-emerald-100/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Online • Typically replies in 2 mins
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-0 p-0 relative z-10"
              aria-label="Close WhatsApp chat popup"
            >
              <X size={17} />
            </button>
          </div>

          {/* Chat Body — Conversational Flow */}
          <div
            ref={chatBodyRef}
            className="p-4 space-y-3 bg-[#0B141A]/95 max-h-[420px] overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Welcome Greeting Bubble */}
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                <Sparkles size={14} />
              </div>
              <div className="bg-[#202C33] text-slate-200 text-xs sm:text-[13px] leading-relaxed p-3.5 rounded-2xl rounded-tl-xs border border-white/5 shadow-sm max-w-[290px]">
                <p className="font-semibold text-emerald-400 mb-1">வணக்கம்! Welcome to {companyName} 👋</p>
                <p className="text-slate-300">
                  உங்கள் தங்கம் விற்பனை தொடர்பான விவரங்களை சேகரிக்க சில கேள்விகள் கேட்கிறோம்.
                </p>
              </div>
            </div>

            {/* Render answered questions as chat bubbles */}
            {CHAT_QUESTIONS.map((step, idx) => {
              const answer = answers[step.id]
              if (idx > currentStep && !isComplete) return null

              return (
                <div key={step.id} className="space-y-2">
                  {/* Bot Question Bubble */}
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <span className="text-[11px] font-extrabold">{idx + 1}</span>
                    </div>
                    <div className="bg-[#202C33] text-slate-200 text-[13px] leading-relaxed p-3.5 rounded-2xl rounded-tl-xs border border-white/5 shadow-sm max-w-[290px]">
                      <p className="font-semibold text-white">{step.question}</p>
                    </div>
                  </div>

                  {/* If answered — show user's answer bubble */}
                  {answer ? (
                    <div className="flex justify-end">
                      <div className="bg-[#005C4B] text-white text-[13px] leading-relaxed px-4 py-2.5 rounded-2xl rounded-br-xs border border-emerald-500/20 shadow-sm max-w-[240px] flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-300 shrink-0" />
                        <span className="font-semibold">{answer}</span>
                      </div>
                    </div>
                  ) : (
                    /* If current step — show selectable options */
                    idx === currentStep && !isComplete && (
                      <div className="ml-9.5 space-y-1.5">
                        {step.options.map((option) => (
                          <button
                              key={option}
                              onClick={() => handleSelectOption(option)}
                              className="w-full p-2.5 rounded-xl text-left text-[12.5px] font-semibold transition-all flex items-center justify-between group cursor-pointer border bg-[#111B21] hover:bg-[#005C4B] border-white/5 hover:border-emerald-400/50 text-slate-300 hover:text-white active:scale-[0.98]"
                            >
                              <span className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-md border-2 border-slate-500 group-hover:border-emerald-400 group-hover:bg-emerald-500/20 flex items-center justify-center shrink-0 transition-all">
                                  <Check size={12} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </span>
                                <span>{option}</span>
                              </span>
                              {idx === CHAT_QUESTIONS.length - 1 ? (
                                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
                                  <ChevronRight size={13} className="shrink-0" />
                                </span>
                              ) : (
                                <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ChevronRight size={14} className="shrink-0" />
                                </span>
                              )}
                            </button>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )
            })}

            {/* Completion — Summary + Send to WhatsApp */}
            {isComplete && (
              <div className="space-y-3 pt-1">
                {/* Summary bubble */}
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                    <Sparkles size={14} />
                  </div>
                  <div className="bg-[#202C33] text-slate-200 text-[13px] leading-relaxed p-3.5 rounded-2xl rounded-tl-xs border border-white/5 shadow-sm max-w-[290px]">
                    <p className="font-semibold text-emerald-400 mb-1.5">நன்றி! பதில் பதிவு செய்யப்பட்டது ✅</p>
                    <p className="text-slate-300">
                      WhatsApp திறக்கப்பட்டுள்ளது! மீதமுள்ள விவரங்களை எங்கள் WhatsApp உரையாடலில் தொடரலாம்.
                    </p>
                  </div>
                </div>

                {/* Send to WhatsApp CTA */}
                <button
                  onClick={() => handleSendToWhatsApp()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(37,211,102,0.3)] transition-all active:scale-[0.98] cursor-pointer border-0"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WhatsApp-ல் மீண்டும் திறக்கவும்</span>
                  <ExternalLink size={14} />
                </button>

                {/* Restart option */}
                <button
                  onClick={handleReset}
                  className="w-full py-2 rounded-xl bg-transparent hover:bg-[#202C33] text-slate-400 hover:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/5"
                >
                  <RotateCcw size={12} />
                  <span>மீண்டும் தொடங்கவும்</span>
                </button>
              </div>
            )}

            {/* Custom message input — always available */}
            {!isComplete && (
              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="உங்கள் செய்தியை தட்டச்சு செய்யவும்..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customMsg.trim()) {
                      handleSendToWhatsApp(customMsg.trim())
                    }
                  }}
                  className="flex-1 h-9 px-3 rounded-xl bg-[#111B21] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  onClick={() => {
                    if (customMsg.trim()) handleSendToWhatsApp(customMsg.trim())
                  }}
                  className="h-9 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-transform active:scale-95 cursor-pointer border-0 shrink-0"
                >
                  <Send size={13} />
                  <span>Send</span>
                </button>
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div className="px-4 py-2.5 bg-[#111B21] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <ExternalLink size={11} className="text-emerald-400" />
              Direct WhatsApp Link
            </span>
            <span className="font-bold text-emerald-400 tracking-wide">{settings.contactPhone || '+91 90925 48347'}</span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        {/* Ambient Pulsing Halo */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse pointer-events-none" />

        {/* Main WhatsApp Trigger Button */}
        <button
          onClick={() => {
            setIsOpen((prev) => {
              if (!prev) {
                // Reset flow when opening fresh
                handleReset()
              }
              return !prev
            })
          }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2ecc71] hover:brightness-110 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 transform group-hover:scale-108 active:scale-95 cursor-pointer border-0 p-0"
          aria-label={`Open WhatsApp live chat with ${companyName}`}
          title={`Chat with ${companyName} on WhatsApp: ${settings.contactPhone || '+91 90925 48347'}`}
        >
          {isOpen ? (
            <X size={26} className="text-white animate-in zoom-in-75 duration-200" />
          ) : (
            <>
              <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 fill-white drop-shadow-md" />
              {/* Online pulse dot */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-[#128C7E]" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM9.14 7.27C8.98 7.27 8.72 7.33 8.5 7.57C8.28 7.81 7.66 8.39 7.66 9.58C7.66 10.77 8.52 11.92 8.64 12.08C8.76 12.24 10.33 14.67 12.75 15.71C13.32 15.96 13.77 16.11 14.12 16.22C14.7 16.4 15.22 16.37 15.64 16.31C16.11 16.24 17.07 15.73 17.27 15.16C17.47 14.59 17.47 14.11 17.41 14.01C17.35 13.91 17.19 13.85 16.95 13.73C16.71 13.61 15.53 13.03 15.31 12.95C15.09 12.87 14.93 12.83 14.77 13.07C14.61 13.31 14.15 13.85 14.01 14.01C13.87 14.17 13.73 14.19 13.49 14.07C13.25 13.95 12.48 13.7 11.56 12.88C10.85 12.24 10.37 11.45 10.23 11.21C10.09 10.97 10.21 10.84 10.33 10.72C10.44 10.61 10.58 10.43 10.7 10.29C10.82 10.15 10.86 10.05 10.94 9.89C11.02 9.73 10.98 9.59 10.92 9.47C10.86 9.35 10.4 8.22 10.21 7.76C10.02 7.31 9.83 7.37 9.68 7.36C9.55 7.36 9.39 7.27 9.14 7.27Z" />
    </svg>
  )
}
