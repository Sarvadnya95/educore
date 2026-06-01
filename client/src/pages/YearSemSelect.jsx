import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateYearSem } from '../services/api'
import { useAuth } from '../context/AuthContext'

const YearSemSelect = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [year, setYear] = useState('')
  const [semester, setSemester] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const semesterOptions = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await updateYearSem({ year, semester })
      updateUser(res.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
        <img src="/logo.PNG" alt="EduCore" className="h-10" />
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#F0F7FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎓</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">
              Welcome, {user?.name}!
            </h2>
            <p className="text-gray-400 text-sm">
              Select your year and semester to get started
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 p-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Year</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((y) => (
                  <button
                    type="button"
                    key={y}
                    onClick={() => { setYear(y); setSemester('') }}
                    className={`py-3 rounded-xl font-semibold text-sm transition border ${
                      year === y
                        ? 'bg-[#437FC7] border-[#437FC7] text-white shadow-lg shadow-blue-200'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#437FC7] hover:text-[#437FC7]'
                    }`}
                  >
                    Year {y}
                  </button>
                ))}
              </div>
            </div>

            {year && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Semester</label>
                <div className="grid grid-cols-2 gap-2">
                  {semesterOptions[year]?.map((sem) => (
                    <button
                      type="button"
                      key={sem}
                      onClick={() => setSemester(sem)}
                      className={`py-3 rounded-xl font-semibold text-sm transition border ${
                        semester === sem
                          ? 'bg-[#437FC7] border-[#437FC7] text-white shadow-lg shadow-blue-200'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#437FC7] hover:text-[#437FC7]'
                      }`}
                    >
                      Semester {sem}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !year || !semester}
              className="w-full bg-[#437FC7] text-white py-3 rounded-xl font-semibold hover:bg-[#3a6fb0] transition shadow-lg shadow-blue-200 disabled:opacity-30"
            >
              {loading ? 'Saving...' : 'Go to Dashboard →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default YearSemSelect