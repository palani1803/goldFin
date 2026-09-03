import { useState } from 'react'
import { Coins, Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'
import { useSiteSettings } from '../../hooks/useSiteSettings'

interface AdminLoginPageProps {
  onLoginSuccess: () => void
  onNavigateHome: () => void
}

export default function AdminLoginPage({ onLoginSuccess, onNavigateHome }: AdminLoginPageProps) {
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahes Bankers'
  const adminEmail = settings.demoAdminEmail || 'admin@mahesbankers.com'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      const cleanName = `${companyName} Admin`
      localStorage.setItem('adminToken', data.data.token)
      localStorage.setItem('adminName', cleanName)
      localStorage.setItem('adminEmail', data.data.email)

      onLoginSuccess()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-10 bg-gradient-to-br from-orange-50 via-slate-50 to-amber-50/70">
      {/* Animated warm background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)',
            top: '-10%',
            right: '-5%',
            animation: 'adminFloat 12s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
            animation: 'adminFloat 16s ease-in-out infinite alternate-reverse',
          }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-[460px] mx-4">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-3 mb-3 bg-transparent border-0 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/25 bg-gradient-to-tr from-[#FF6B00] via-[#F97316] to-[#EA580C]">
              <Coins size={30} />
            </div>
            <span className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">
              {companyName}
            </span>
          </button>
          <h1 className="text-xl font-black text-slate-900 mb-1 tracking-tight">Admin Portal</h1>
          <p className="text-sm text-slate-500 font-medium">Sign in to manage gold rates & branches</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-orange-100/90 p-7 sm:p-8 backdrop-blur-xl bg-white/95 shadow-2xl shadow-orange-500/10">

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-rose-50 border border-rose-200 text-rose-800 shadow-xs">
                <AlertCircle size={18} className="shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={adminEmail}
                  required
                  className="w-full h-[50px] pl-12 pr-4 rounded-xl text-sm font-bold text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full h-[50px] pl-12 pr-12 rounded-xl text-sm font-bold text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors bg-transparent border-0 cursor-pointer p-0"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-xl text-white font-bold text-sm border-0 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 mt-3 bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-95"
              style={{ opacity: loading ? 0.7 : 1 }}
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
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">
              {companyName} Secure Admin • Authorized Personnel Only
            </p>
          </div>
        </div>

        {/* Back to site link */}
        <div className="text-center mt-5">
          <button
            onClick={onNavigateHome}
            className="text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors bg-transparent border-0 cursor-pointer"
          >
            ← Back to {companyName} website
          </button>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes adminFloat {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
    </div>
  )
}
