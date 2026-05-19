import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <nav className="bg-[#1E293B] border-b border-gray-700/50 px-6 py-4 flex justify-between items-center">
      <h1
        className="text-lg font-bold text-white cursor-pointer flex items-center gap-2"
        onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')}
      >
        🎓 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">EduCore</span>
      </h1>
      <div className="flex items-center gap-4">
        {user?.role !== 'admin' && (
          <button
            onClick={() => navigate('/profile')}
            className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            {user?.name}
          </button>
        )}
        <button
          onClick={handleLogout}
          className="border border-gray-700 text-gray-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar