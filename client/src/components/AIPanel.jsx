import { useState } from 'react'
import { solveDoubt, generateQuiz, generateSummary } from '../services/api'
import { FaTimes, FaQuestionCircle, FaClipboardList, FaFileAlt, FaRobot } from 'react-icons/fa'

const AIPanel = ({ onClose, subject, unit, topic }) => {
  const [activeTab, setActiveTab] = useState('doubt')
  const [doubt, setDoubt] = useState('')
  const [answer, setAnswer] = useState('')
  const [quiz, setQuiz] = useState([])
  const [summary, setSummary] = useState('')
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDoubt = async () => {
    if (!doubt.trim()) return
    setLoading(true)
    try {
      const res = await solveDoubt({ subject, unit, topic, doubt })
      setAnswer(res.data.answer)
    } catch (err) {
      setAnswer('Something went wrong. Try again.')
    }
    setLoading(false)
  }

  const handleQuiz = async () => {
    setLoading(true)
    setQuiz([])
    setSelected({})
    setSubmitted(false)
    try {
      const res = await generateQuiz({ subject, unit, topics: topic })
      setQuiz(res.data.quiz)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleSummary = async () => {
    setLoading(true)
    setSummary('')
    try {
      const res = await generateSummary({ subject, topic })
      setSummary(res.data.summary)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const getScore = () => {
    return quiz.filter((q, i) => selected[i] === q.correct).length
  }

  const tabs = [
    { id: 'doubt', label: 'Doubt', icon: <FaQuestionCircle /> },
    { id: 'quiz', label: 'Quiz', icon: <FaClipboardList /> },
    { id: 'summary', label: 'Summary', icon: <FaFileAlt /> }
  ]

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white border-l border-gray-100 flex flex-col h-full shadow-2xl">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[#1A1A2E] font-semibold flex items-center gap-2">
              <FaRobot className="text-[#437FC7]" /> AI Assistant
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">{topic || subject || 'Select a topic'}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <FaTimes />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'text-[#437FC7] border-b-2 border-[#437FC7]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Doubt Tab */}
          {activeTab === 'doubt' && (
            <div className="space-y-4">
              <textarea
                value={doubt}
                onChange={(e) => setDoubt(e.target.value)}
                placeholder="Type your doubt here..."
                rows={3}
                className="w-full border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#437FC7] placeholder-gray-400 resize-none"
              />
              <button
                onClick={handleDoubt}
                disabled={loading}
                className="w-full bg-[#437FC7] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3a6fb0] transition disabled:opacity-50"
              >
                {loading ? 'Thinking...' : 'Ask AI →'}
              </button>
              {answer && (
                <div className="bg-[#F8FAFF] border border-gray-100 rounded-xl p-4 text-gray-700 text-sm whitespace-pre-wrap">
                  {answer}
                </div>
              )}
            </div>
          )}

          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <button
                onClick={handleQuiz}
                disabled={loading}
                className="w-full bg-[#437FC7] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3a6fb0] transition disabled:opacity-50"
              >
                {loading ? 'Generating Quiz...' : 'Generate Quiz'}
              </button>

              {quiz.map((q, i) => (
                <div key={i} className="bg-[#F8FAFF] border border-gray-100 rounded-xl p-4">
                  <p className="text-[#1A1A2E] text-sm font-medium mb-3">{i + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => !submitted && setSelected({ ...selected, [i]: j })}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition border ${
                          submitted
                            ? j === q.correct
                              ? 'bg-green-50 border-green-200 text-green-600'
                              : selected[i] === j
                              ? 'bg-red-50 border-red-200 text-red-500'
                              : 'border-gray-100 text-gray-400'
                            : selected[i] === j
                            ? 'bg-blue-50 border-[#437FC7] text-[#437FC7]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {quiz.length > 0 && !submitted && (
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full bg-[#437FC7] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3a6fb0] transition"
                >
                  Submit Answers
                </button>
              )}

              {submitted && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                  <p className="text-[#437FC7] font-semibold text-lg">
                    Score: {getScore()} / {quiz.length}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <button
                onClick={handleSummary}
                disabled={loading}
                className="w-full bg-[#437FC7] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3a6fb0] transition disabled:opacity-50"
              >
                {loading ? 'Generating Summary...' : 'Generate Summary'}
              </button>
              {summary && (
                <div className="bg-[#F8FAFF] border border-gray-100 rounded-xl p-4 text-gray-700 text-sm whitespace-pre-wrap">
                  {summary}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIPanel