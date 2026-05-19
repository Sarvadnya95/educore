import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-600 opacity-10 rounded-full blur-3xl"></div>

      <div className="text-center px-6 z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
          Free Learning Platform
        </div>

        <h1 className="text-6xl font-extrabold text-white mb-4 leading-tight">
          Learn Smarter<br />Your College. Your Syllabus. Your Way.
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Not Harder
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
          Access your complete syllabus, video lectures, AI assistance, and previous year papers — all in one place, for free.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition shadow-lg shadow-indigo-500/25"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-gray-700 text-gray-300 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
          >
            Login →
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex gap-3 justify-center mt-12 flex-wrap">
          {['📚 Syllabus Wise', '🎥 Video Lectures', '🤖 AI Assistant', '📄 Previous Papers'].map((f) => (
            <span key={f} className="bg-[#1E293B] border border-gray-700 text-gray-400 px-4 py-2 rounded-full text-sm">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home