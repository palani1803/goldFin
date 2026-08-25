import { useState } from 'react'
import { Coins, Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, Copy, Check } from 'lucide-react'

interface AdminLoginPageProps {
  onLoginSuccess: () => void
  onNavigateHome: () => void
}

export default function AdminLoginPage({ onLoginSuccess, onNavigateHome }: AdminLoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)

  const handleCopy = (text: string, type: 'email' | 'password') => {
    navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPassword(true)
      setTimeout(() => setCopiedPassword(false), 2000)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Store token and admin info
      localStorage.setItem('adminToken', data.data.token)
      localStorage.setItem('adminName', data.data.name)
      localStorage.setItem('adminEmail', data.data.email)

      onLoginSuccess()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-10"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F172A 100%)',
      }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
            top: '-10%',
            right: '-5%',
            animation: 'adminFloat 12s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(251,146,60,0.35) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
            animation: 'adminFloat 16s ease-in-out infinite alternate-reverse',
          }}
        />
        <div
          className="absolute w-[200px] h-[200px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,0,0.5) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'adminPulse 6s ease-in-out infinite',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[460px] mx-4">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-3 mb-3 bg-transparent border-0 cursor-pointer group"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-[0_8px_32px_rgba(249,115,22,0.45)]"
              style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #F97316 50%, #EA580C 100%)' }}
            >
              <Coins size={30} />
            </div>
            <span className="text-2xl font-extrabold text-white group-hover:text-orange-400 transition-colors">
              GoldFin
            </span>
          </button>
          <h1 className="text-xl font-bold text-white/90 mb-1">Admin Portal</h1>
          <p className="text-sm text-slate-400">Sign in to manage gold rates & branches</p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl border p-7 sm:p-8 backdrop-blur-xl"
          style={{
            background: 'rgba(30, 41, 59, 0.75)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 60px rgba(249,115,22,0.08)',
          }}
        >
          {/* Demo Credentials Box */}
          <div
            className="mb-5 rounded-2xl p-3 transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(234, 88, 12, 0.03) 100%)',
              border: '1px solid rgba(249, 115, 22, 0.18)',
            }}
          >
            <div className="space-y-2 text-xs font-mono bg-black/35 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-orange-300 select-all">admin@goldfin.com</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('admin@goldfin.com', 'email')}
                    className="p-1 rounded text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border-0 cursor-pointer transition-colors"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Password:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-orange-300 select-all">admin123</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('admin123', 'password')}
                    className="p-1 rounded text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border-0 cursor-pointer transition-colors"
                    title="Copy password"
                  >
                    {copiedPassword ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Alert */}
            {error && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#FCA5A5',
                }}
              >
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@goldfin.com"
                  required
                  className="w-full h-[50px] pl-12 pr-4 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1.5px solid rgba(255, 255, 255, 0.08)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)'
                    e.target.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full h-[50px] pl-12 pr-12 rounded-xl text-sm font-medium text-white placeholder-slate-500 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1.5px solid rgba(255, 255, 255, 0.08)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)'
                    e.target.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors bg-transparent border-0 cursor-pointer p-0"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-xl text-white font-bold text-sm border-0 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 mt-3"
              style={{
                background: loading
                  ? 'rgba(249, 115, 22, 0.5)'
                  : 'linear-gradient(135deg, #FF6B00 0%, #F97316 50%, #EA580C 100%)',
                boxShadow: loading
                  ? 'none'
                  : '0 8px 30px rgba(249, 115, 22, 0.35)',
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  (e.target as HTMLElement).style.transform = 'translateY(-1px)'
                  ;(e.target as HTMLElement).style.boxShadow = '0 12px 40px rgba(249, 115, 22, 0.45)'
                }
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(0)'
                ;(e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(249, 115, 22, 0.35)'
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-slate-500">
              GoldFin Secure Admin • Authorized Personnel Only
            </p>
          </div>
        </div>

        {/* Back to site link */}
        <div className="text-center mt-5">
          <button
            onClick={onNavigateHome}
            className="text-sm text-slate-400 hover:text-orange-400 transition-colors bg-transparent border-0 cursor-pointer"
          >
            ← Back to GoldFin website
          </button>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes adminFloat {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes adminPulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </div>
  )
}
