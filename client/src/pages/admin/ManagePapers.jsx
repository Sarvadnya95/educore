import { useState, useEffect } from 'react'
import { getSubjects, getPapers, uploadPaper, deletePaper } from '../../services/api'
import Navbar from '../../components/Navbar'

const ManagePapers = () => {
  const [subjects, setSubjects] = useState([])
  const [papers, setPapers] = useState([])
  const [form, setForm] = useState({
    subjectId: '',
    examYear: '',
    semester: ''
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filterYear, setFilterYear] = useState(1)
  const [filterSem, setFilterSem] = useState(1)

  const semOptions = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8]
  }

  useEffect(() => {
    fetchSubjects()
  }, [filterYear, filterSem])

  useEffect(() => {
    if (form.subjectId) {
      fetchPapers()
    }
  }, [form.subjectId])

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects(filterYear, filterSem)

      setSubjects(res.data)
      setForm((prev) => ({
        ...prev,
        subjectId: ''
      }))
      setPapers([])
    } catch (err) {
      console.log(err)
    }
  }

  const fetchPapers = async () => {
    try {
      const res = await getPapers(form.subjectId)
      setPapers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) {
      alert('Please select a PDF file')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()

      formData.append('subjectId', form.subjectId)
      formData.append('examYear', form.examYear)
      formData.append('semester', form.semester)
      formData.append('paper', file)

      await uploadPaper(formData)

      setForm((prev) => ({
        ...prev,
        examYear: '',
        semester: ''
      }))

      setFile(null)

      fetchPapers()
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this paper?')

    if (!confirmDelete) return

    try {
      await deletePaper(id)
      fetchPapers()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">
            Admin → Papers
          </p>

          <h1 className="text-3xl font-bold text-white">
            Manage Papers
          </h1>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {[1, 2, 3, 4].map((year) => (
            <button
              key={year}
              onClick={() => {
                setFilterYear(year)
                setFilterSem(semOptions[year][0])
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                filterYear === year
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-[#1E293B] border-gray-700 text-gray-400 hover:border-indigo-500'
              }`}
            >
              Year {year}
            </button>
          ))}

          {semOptions[filterYear]?.map((sem) => (
            <button
              key={sem}
              onClick={() => setFilterSem(sem)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                filterSem === sem
                  ? 'bg-violet-600 border-violet-600 text-white'
                  : 'bg-[#1E293B] border-gray-700 text-gray-400 hover:border-violet-500'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        {/* Upload Form */}
        <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">
            Upload Paper
          </h2>

          <form
            onSubmit={handleUpload}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Subject */}
            <select
              value={form.subjectId}
              onChange={(e) =>
                setForm({
                  ...form,
                  subjectId: e.target.value
                })
              }
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                Select Subject
              </option>

              {subjects.map((subject) => (
                <option
                  key={subject._id}
                  value={subject._id}
                >
                  {subject.name}
                </option>
              ))}
            </select>

            {/* Exam Year */}
            <input
              type="number"
              placeholder="Exam Year (e.g. 2023)"
              value={form.examYear}
              onChange={(e) =>
                setForm({
                  ...form,
                  examYear: e.target.value
                })
              }
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600"
            />

            {/* Semester */}
            <select
              value={form.semester}
              onChange={(e) =>
                setForm({
                  ...form,
                  semester: e.target.value
                })
              }
              required
              className="bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                Select Semester
              </option>

              {semOptions[filterYear]?.map((sem) => (
                <option
                  key={sem}
                  value={sem}
                >
                  Semester {sem}
                </option>
              ))}
            </select>

            {/* File Upload */}
            <div
              onClick={() =>
                document.getElementById('paperFile').click()
              }
              className="bg-[#0F172A] border-2 border-dashed border-gray-700 rounded-xl px-4 py-3 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition"
            >
              <input
                id="paperFile"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <p className="text-gray-500 text-sm">
                {file
                  ? file.name
                  : '📎 Click to select PDF'}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? 'Uploading...'
                : '⬆ Upload Paper'}
            </button>
          </form>
        </div>

        {/* Papers List */}
        <div className="space-y-3">
          {papers.length === 0 ? (
            <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-8 text-center">
              <p className="text-gray-500">
                No papers found.
              </p>
            </div>
          ) : (
            papers.map((paper) => (
              <div
                key={paper._id}
                className="bg-[#1E293B] border border-gray-700/50 rounded-2xl px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium">
                    Exam {paper.examYear}
                  </p>

                  <p className="text-gray-500 text-xs">
                    Semester {paper.semester}
                  </p>
                </div>

                <div className="flex gap-3">
                  {/* View Button */}
                  <a
                    href={paper.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 text-sm border border-indigo-400/20 px-3 py-1.5 rounded-lg hover:bg-indigo-400/10 transition"
                  >
                    View
                  </a>

                  {/* Delete Button */}
                  <button
                    onClick={() =>
                      handleDelete(paper._id)
                    }
                    className="text-red-400 text-sm border border-red-400/20 px-3 py-1.5 rounded-lg hover:bg-red-400/10 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ManagePapers