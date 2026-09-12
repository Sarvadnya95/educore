import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/api'
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
    setLoading(false)
  }

  const perks = [
    'Access complete BCA syllabus for free',
    'Watch topic-wise video lectures',
    'Get AI-powered doubt solving 24/7',
    'Download previous year papers',
    'Install as mobile app — no Play Store needed',
  ]

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">

        {/* Gradient Orbs */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-50px] right-[-100px] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />

        {/* Logo */}
        <div className="relative z-10">
          <img src="/logo.PNG" alt="EduCore" className="h-12" />
        </div>

        {/* Center Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Join hundreds of<br />
            <span style={{ background: 'linear-gradient(135deg, #4F8EF7, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              smart students
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-sm">
            Everything you need to ace your semester — organized, free, and powered by AI.
          </p>

          {/* Perks */}
          <div className="space-y-4">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.3)' }}>
                  <FaCheck className="text-blue-400 text-xs" />
                </div>
                <p className="text-gray-300 text-sm">{perk}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-gray-500 text-xs">Free forever</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">AI</p>
              <p className="text-gray-500 text-xs">Powered assistance</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">PWA</p>
              <p className="text-gray-500 text-xs">Works on mobile</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-gray-600 text-sm">© 2026 EduCore. Built for students, by a student.</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">

        {/* Mobile Logo */}
        <div className="absolute top-6 left-6 lg:hidden">
          <img src="/logo.PNG" alt="EduCore" className="h-10" />
        </div>

        <div className="w-full max-w-md">

          <div className="relative p-[1px] rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.3), rgba(139,92,246,0.3), rgba(79,142,247,0.1))' }}>
            <div className="bg-[#0D1526] rounded-3xl p-8">

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
                <p className="text-gray-500 text-sm">Join EduCore — it's completely free</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min 6 characters"
                      required
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm transition disabled:opacity-50 mt-2"
                  style={{ background: loading ? '#374151' : 'linear-gradient(135deg, #4F8EF7, #8B5CF6)' }}
                >
                  {loading ? 'Creating account...' : 'Create free account →'}
                </button>
              </form>

              <p className="text-center text-gray-600 mt-6 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-700 text-xs mt-6">
            By creating an account you agree to our terms of service
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register