import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateYearSem } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [year, setYear] = useState(user?.year || '')
  const [semester, setSemester] = useState(user?.semester || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const semOptions = { 1: [1,2], 2: [3,4], 3: [5,6], 4: [7,8] }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    try {
      const res = await updateYearSem({ year, semester })
      updateUser(res.data.user)
      setSuccess(true)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">Profile</p>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
        </div>

        {/* User Info */}
        <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold text-lg">{user?.name}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs">
              Year {user?.year}
            </span>
            <span className="bg-violet-500/10 border border-violet-500/20 text-violet-400 px-3 py-1 rounded-full text-xs">
              Semester {user?.semester}
            </span>
          </div>
        </div>

        {/* Change Year & Sem */}
        <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Change Year & Semester</h2>

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-xl mb-4 text-sm">
              Updated successfully! ✅
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Year</label>
              <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map((y) => (
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
                  {semOptions[year]?.map((sem) => (
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
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-30"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full mt-3 border border-gray-700 text-gray-400 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile