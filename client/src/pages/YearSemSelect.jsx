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
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-600 opacity-10 rounded-full blur-3xl"></div>

      <div className="bg-[#1E293B] border border-gray-700/50 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🎓</div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Welcome, {user?.name}!
          </h2>
          <p className="text-gray-400 text-sm">
            Select your year and semester to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Select Year</label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((y) => (
                <button
                  type="button"
                  key={y}
                  onClick={() => { setYear(y); setSemester('') }}
                  className={`py-3 rounded-xl font-semibold text-sm transition border ${
                    year === y
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-[#0F172A] border-gray-700 text-gray-400 hover:border-indigo-500'
                  }`}
                >
                  Year {y}
                </button>
              ))}
            </div>
          </div>

          {year && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Semester</label>
              <div className="grid grid-cols-2 gap-2">
                {semesterOptions[year]?.map((sem) => (
                  <button
                    type="button"
                    key={sem}
                    onClick={() => setSemester(sem)}
                    className={`py-3 rounded-xl font-semibold text-sm transition border ${
                      semester === sem
                        ? 'bg-violet-600 border-violet-600 text-white'
                        : 'bg-[#0F172A] border-gray-700 text-gray-400 hover:border-violet-500'
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
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-indigo-500/25 disabled:opacity-30 mt-2"
          >
            {loading ? 'Saving...' : 'Go to Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default YearSemSelect