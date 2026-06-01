import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubjects } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import { FaBook, FaChevronRight } from 'react-icons/fa'

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
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-1">Dashboard</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E]">
            Welcome back, <span className="text-[#437FC7]">{user?.name}!</span>
          </h1>
          <div className="flex gap-3 mt-3">
            <span className="bg-blue-50 border border-blue-100 text-[#437FC7] px-3 py-1 rounded-full text-xs font-medium">
              Year {user?.year}
            </span>
            <span className="bg-blue-50 border border-blue-100 text-[#437FC7] px-3 py-1 rounded-full text-xs font-medium">
              Semester {user?.semester}
            </span>
          </div>
        </div>

        {/* Subjects */}
        {loading ? (
          <div className="text-center text-gray-400 mt-20">Loading subjects...</div>
        ) : subjects.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
            <FaBook className="text-4xl text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">No subjects found for your semester.</p>
            <p className="text-gray-300 text-sm mt-1">Ask your admin to add subjects.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {subjects.map((subject, index) => (
              <div
                key={subject._id}
                onClick={() => navigate(`/subject/${subject._id}`)}
                className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:border-[#437FC7] hover:shadow-md transition group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#437FC7] font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-[#1A1A2E] font-semibold">{subject.name}</h3>
                    <p className="text-gray-400 text-sm">{subject.description || 'No description'}</p>
                  </div>
                </div>
                <FaChevronRight className="text-gray-300 group-hover:text-[#437FC7] transition" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard