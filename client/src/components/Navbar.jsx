import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { searchContent } from '../services/api'
import { FaSearch, FaTimes, FaBook, FaLayerGroup, FaFileAlt } from 'react-icons/fa'

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [searching, setSearching] = useState(false)
  const searchRef = useRef(null)

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([])
        setShowResults(false)
        return
      }
      setSearching(true)
      try {
        const res = await searchContent(query, user.year, user.semester)
        setResults(res.data)
        setShowResults(true)
      } catch (err) {
        console.log(err)
      }
      setSearching(false)
    }, 400)
    return () => clearTimeout(delaySearch)
  }, [query])

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleResultClick = (result) => {
    setQuery('')
    setShowResults(false)
    navigate(`/subject/${result.subjectId}`)
  }

  const getTypeIcon = (type) => {
    if (type === 'subject') return <FaBook className="text-[#437FC7] text-xs" />
    if (type === 'unit') return <FaLayerGroup className="text-purple-400 text-xs" />
    return <FaFileAlt className="text-green-500 text-xs" />
  }

  const getTypeBadge = (type) => {
    if (type === 'subject') return 'bg-blue-50 text-[#437FC7]'
    if (type === 'unit') return 'bg-purple-50 text-purple-500'
    return 'bg-green-50 text-green-500'
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">

      {/* Logo */}
      <img
        src="/logo.PNG"
        alt="EduCore"
        className="h-9 cursor-pointer flex-shrink-0"
        onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')}
      />

      {/* Search Bar — only for students */}
      {user?.role !== 'admin' && (
        <div className="flex-1 relative min-w-0" ref={searchRef}>
          <div className="flex items-center bg-[#F8FAFF] border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#437FC7] transition w-full">
            <FaSearch className="text-gray-400 mr-2 text-sm flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics..."
              className="flex-1 text-gray-800 text-sm focus:outline-none placeholder-gray-400 bg-transparent min-w-0"
            />
            {query && (
              <button onClick={() => { setQuery(''); setShowResults(false) }} className="flex-shrink-0">
                <FaTimes className="text-gray-400 hover:text-gray-600 text-sm" />
              </button>
            )}
          </div>

          {/* Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
              {searching ? (
                <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
              ) : results.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">No results for "{query}"</div>
              ) : (
                <div className="max-h-72 overflow-y-auto">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFF] cursor-pointer border-b border-gray-50 last:border-0 transition"
                    >
                      <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1A1A2E] text-sm font-medium truncate">{result.title}</p>
                        <p className="text-gray-400 text-xs truncate">{result.subtitle}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize flex-shrink-0 ${getTypeBadge(result.type)}`}>
                        {result.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {user?.role !== 'admin' && (
          <button
            onClick={() => navigate('/profile')}
            className="w-8 h-8 bg-[#437FC7] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          >
            {user?.name?.charAt(0).toUpperCase()}
          </button>
        )}
        <button
          onClick={handleLogout}
          className="border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-xs font-medium hover:border-[#437FC7] hover:text-[#437FC7] transition flex-shrink-0"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar