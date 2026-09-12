import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { FaEye, FaEyeSlash, FaBook, FaRobot, FaFileAlt, FaVideo } from 'react-icons/fa'

const Login = () => {
  const navigate = useNavigate()
  const { loginUser } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
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
      const res = await login(form)
      loginUser(res.data.user, res.data.token)
      if (res.data.user.role === 'admin') {
        navigate('/admin')
      } else if (!res.data.user.year || !res.data.user.semester) {
        navigate('/select-year-sem')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
    setLoading(false)
  }

  const features = [
    { icon: <FaBook />, title: 'Complete Syllabus', desc: 'Year & semester organized content' },
    { icon: <FaVideo />, title: 'Video Lectures', desc: 'Topic-wise YouTube lectures' },
    { icon: <FaRobot />, title: 'AI Assistant', desc: 'Doubt solver & quiz generator' },
    { icon: <FaFileAlt />, title: 'Past Papers', desc: 'Previous year question papers' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">

        {/* Gradient Orbs */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full"
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
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Free for all college students
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your complete<br />
            <span style={{ background: 'linear-gradient(135deg, #4F8EF7, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              learning hub
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-sm">
            Access syllabus, video lectures, AI assistance and previous year papers — all in one place.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 mb-3"
                  style={{ background: 'rgba(79,142,247,0.1)' }}>
                  {f.icon}
                </div>
                <p className="text-white text-sm font-medium">{f.title}</p>
                <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
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

          {/* Gradient border card */}
          <div className="relative p-[1px] rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.3), rgba(139,92,246,0.3), rgba(79,142,247,0.1))' }}>
            <div className="bg-[#0D1526] rounded-3xl p-8">

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
                <p className="text-gray-500 text-sm">Sign in to continue your learning journey</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/8 placeholder-gray-600 transition"
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
                      placeholder="••••••••"
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
                  {loading ? 'Signing in...' : 'Sign in →'}
                </button>
              </form>

              <p className="text-center text-gray-600 mt-6 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-400 font-medium hover:text-blue-300 transition">
                  Create one free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login