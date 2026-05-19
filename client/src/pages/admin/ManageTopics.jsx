import { useState, useEffect } from 'react'
import { getSubjects, getUnits, getTopics, addTopic, deleteTopic } from '../../services/api'
import Navbar from '../../components/Navbar'

const ManageTopics = () => {
  const [subjects, setSubjects] = useState([])
  const [units, setUnits] = useState([])
  const [topics, setTopics] = useState([])
  const [form, setForm] = useState({ title: '', unitId: '', youtubeLink: '', order: '' })
  const [selectedSubject, setSelectedSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [filterYear, setFilterYear] = useState(1)
  const [filterSem, setFilterSem] = useState(1)

  const semOptions = { 1: [1,2], 2: [3,4], 3: [5,6], 4: [7,8] }

  useEffect(() => { fetchSubjects() }, [filterYear, filterSem])
  useEffect(() => { if (selectedSubject) fetchUnits() }, [selectedSubject])
  useEffect(() => { if (form.unitId) fetchTopics() }, [form.unitId])

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects(filterYear, filterSem)
      setSubjects(res.data)
      setSelectedSubject('')
      setUnits([])
      setTopics([])
    } catch (err) { console.log(err) }
  }

  const fetchUnits = async () => {
    try {
      const res = await getUnits(selectedSubject)
      setUnits(res.data)
      setForm(f => ({ ...f, unitId: '' }))
      setTopics([])
    } catch (err) { console.log(err) }
  }

  const fetchTopics = async () => {
    try {
      const res = await getTopics(form.unitId)
      setTopics(res.data)
    } catch (err) { console.log(err) }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addTopic(form)
      setForm(f => ({ ...f, title: '', youtubeLink: '', order: '' }))
      fetchTopics()
    } catch (err) { console.log(err) }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this topic?')) return
    try {
      await deleteTopic(id)
      fetchTopics()
    } catch (err) { console.log(err) }
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">Admin → Topics</p>
          <h1 className="text-3xl font-bold text-white">Manage Topics</h1>
        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {[1,2,3,4].map(y => (
            <button key={y}
              onClick={() => { setFilterYear(y); setFilterSem(semOptions[y][0]) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                filterYear === y ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-[#1E293B] border-gray-700 text-gray-400 hover:border-indigo-500'
              }`}
            >Year {y}</button>
          ))}
          {semOptions[filterYear]?.map(s => (
            <button key={s}
              onClick={() => setFilterSem(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                filterSem === s ? 'bg-violet-600 border-violet-600 text-white' : 'bg-[#1E293B] border-gray-700 text-gray-400 hover:border-violet-500'
              }`}
            >Sem {s}</button>
          ))}
        </div>

        {/* Add Topic Form */}
        <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Add New Topic</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <select
              value={form.unitId}
              onChange={(e) => setForm({ ...form, unitId: e.target.value })}
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Unit</option>
              {units.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
            <input
              type="text"
              placeholder="Topic Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600"
            />
            <input
              type="number"
              placeholder="Order (1, 2, 3...)"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600"
            />
            <input
              type="text"
              placeholder="YouTube Link"
              value={form.youtubeLink}
              onChange={(e) => setForm({ ...form, youtubeLink: e.target.value })}
              className="md:col-span-2 bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : '+ Add Topic'}
            </button>
          </form>
        </div>

        {/* Topics List */}
        <div className="space-y-3">
          {topics.length === 0 ? (
            <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-8 text-center">
              <p className="text-gray-500">Select a unit to see topics.</p>
            </div>
          ) : (
            topics.map((topic) => (
              <div key={topic._id} className="bg-[#1E293B] border border-gray-700/50 rounded-2xl px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{topic.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{topic.youtubeLink || 'No video'}</p>
                </div>
                <button
                  onClick={() => handleDelete(topic._id)}
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

export default ManageTopics