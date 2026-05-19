import { useState, useEffect } from 'react'
import { getSubjects, addSubject, deleteSubject } from '../../services/api'
import Navbar from '../../components/Navbar'

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([])
  const [form, setForm] = useState({ name: '', description: '', year: '', semester: '' })
  const [loading, setLoading] = useState(false)
  const [filterYear, setFilterYear] = useState(1)
  const [filterSem, setFilterSem] = useState(1)

  const semOptions = { 1: [1,2], 2: [3,4], 3: [5,6], 4: [7,8] }

  useEffect(() => {
    fetchSubjects()
  }, [filterYear, filterSem])

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects(filterYear, filterSem)
      setSubjects(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addSubject(form)
      setForm({ name: '', description: '', year: '', semester: '' })
      fetchSubjects()
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this subject?')) return
    try {
      await deleteSubject(id)
      fetchSubjects()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">Admin → Subjects</p>
          <h1 className="text-3xl font-bold text-white">Manage Subjects</h1>
        </div>

        {/* Add Subject Form */}
        <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Add New Subject</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Subject Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600"
            />
            <select
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value, semester: '' })}
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Year</option>
              {[1,2,3,4].map(y => <option key={y} value={y}>Year {y}</option>)}
            </select>
            <select
              value={form.semester}
              onChange={(e) => setForm({ ...form, semester: e.target.value })}
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Semester</option>
              {form.year && semOptions[form.year]?.map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : '+ Add Subject'}
            </button>
          </form>
        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {[1,2,3,4].map(y => (
            <button
              key={y}
              onClick={() => { setFilterYear(y); setFilterSem(semOptions[y][0]) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                filterYear === y
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-[#1E293B] border-gray-700 text-gray-400 hover:border-indigo-500'
              }`}
            >
              Year {y}
            </button>
          ))}
          {semOptions[filterYear]?.map(s => (
            <button
              key={s}
              onClick={() => setFilterSem(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                filterSem === s
                  ? 'bg-violet-600 border-violet-600 text-white'
                  : 'bg-[#1E293B] border-gray-700 text-gray-400 hover:border-violet-500'
              }`}
            >
              Sem {s}
            </button>
          ))}
        </div>

        {/* Subjects List */}
        <div className="space-y-3">
          {subjects.length === 0 ? (
            <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-8 text-center">
              <p className="text-gray-500">No subjects found.</p>
            </div>
          ) : (
            subjects.map((subject) => (
              <div key={subject._id} className="bg-[#1E293B] border border-gray-700/50 rounded-2xl px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{subject.name}</p>
                  <p className="text-gray-500 text-sm">{subject.description || 'No description'}</p>
                </div>
                <button
                  onClick={() => handleDelete(subject._id)}
                  className="text-red-400 hover:text-red-300 text-sm border border-red-400/20 px-3 py-1.5 rounded-lg hover:bg-red-400/10 transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageSubjects