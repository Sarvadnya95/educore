import { useNavigate } from 'react-router-dom'
import { FaBook, FaVideo, FaRobot, FaFileAlt } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    { icon: <FaBook className="text-[#437FC7] text-2xl" />, title: 'Syllabus Wise', desc: 'Organized by year & semester' },
    { icon: <FaVideo className="text-[#437FC7] text-2xl" />, title: 'Video Lectures', desc: 'YouTube lectures per topic' },
    { icon: <FaRobot className="text-[#437FC7] text-2xl" />, title: 'AI Assistant', desc: 'Doubt solver & quiz generator' },
    { icon: <FaFileAlt className="text-[#437FC7] text-2xl" />, title: 'Past Papers', desc: 'Previous year question papers' }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
        <img src="/logo.PNG" alt="EduCore" className="h-12" />
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-[#437FC7] font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#437FC7] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#3a6fb0] transition text-sm"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#437FC7] px-4 py-2 rounded-full text-sm font-medium mb-5">
          <span className="w-2 h-2 bg-[#437FC7] rounded-full animate-pulse"></span>
          Free for all college students
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] mb-4 leading-tight">
          Your College.  <span className="text-[#437FC7]">Your Syllabus.</span><br />
          Your Way.
        </h1>

        <p className="text-gray-500 text-base md:text-lg mb-8 max-w-xl">
          Access your complete syllabus, video lectures, AI assistance, and previous year papers — all in one place, completely free.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => navigate('/register')}
            className="bg-[#437FC7] text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-[#3a6fb0] transition shadow-lg shadow-blue-200"
          >
            Get Started Free →
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl text-base font-semibold hover:border-[#437FC7] hover:text-[#437FC7] transition"
          >
            Login
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 w-full max-w-4xl">
          {features.map((f) => (
            <div key={f.title} className="bg-[#F0F7FF] border border-blue-100 rounded-2xl p-5 text-left hover:shadow-md transition">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                {f.icon}
              </div>
              <h3 className="text-[#1A1A2E] font-semibold mb-1 text-sm">{f.title}</h3>
              <p className="text-gray-500 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-5 text-gray-400 text-sm border-t border-gray-100">
        EduCore — Free learning platform for college students
      </div>
    </div>
  )
}

export default Home