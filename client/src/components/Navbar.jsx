
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
    <nav className="bg-white border-b border-gray-100 px-6 py-3 flex justify-between items-center shadow-sm">
      <img
        src="/logo.PNG"
        alt="EduCore"
        className="h-10 cursor-pointer"
        onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')}
      />
      <div className="flex items-center gap-4">
        {user?.role !== 'admin' && (
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#437FC7] transition"
          >
            <div className="w-8 h-8 bg-[#437FC7] rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block">{user?.name}</span>
          </button>
        )}
        <button
          onClick={handleLogout}
          className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:border-[#437FC7] hover:text-[#437FC7] transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar