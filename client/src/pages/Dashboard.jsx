import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubjects } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getSubjects(user.year, user.semester)
        setSubjects(res.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchSubjects()
  }, [])

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">Dashboard</p>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">{user?.name}!</span>
          </h1>
          <div className="flex gap-3 mt-3">
            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs">
              Year {user?.year}
            </span>
            <span className="bg-violet-500/10 border border-violet-500/20 text-violet-400 px-3 py-1 rounded-full text-xs">
              Semester {user?.semester}
            </span>
          </div>
        </div>

        {/* Subjects */}
        {loading ? (
          <div className="text-center text-gray-500 mt-20">Loading subjects...</div>
        ) : subjects.length === 0 ? (
          <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-12 text-center">
            <p className="text-4xl mb-4">📚</p>
            <p className="text-gray-400">No subjects found for your semester.</p>
            <p className="text-gray-600 text-sm mt-1">Ask your admin to add subjects.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {subjects.map((subject, index) => (
              <div
                key={subject._id}
                onClick={() => navigate(`/subject/${subject._id}`)}
                className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:border-indigo-500/50 hover:bg-[#1E293B]/80 transition group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{subject.name}</h3>
                    <p className="text-gray-500 text-sm">{subject.description || 'No description'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-sm hidden md:block">View Syllabus</span>
                  <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard