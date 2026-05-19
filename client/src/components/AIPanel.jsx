import { useState } from 'react'
import { solveDoubt, generateQuiz, generateSummary } from '../services/api'

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

  const tabs = ['doubt', 'quiz', 'summary']

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-md bg-[#1E293B] border-l border-gray-700/50 flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold">🤖 AI Assistant</h2>
            <p className="text-gray-500 text-xs mt-0.5">{topic || subject || 'Select a topic'}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition text-xl">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700/50">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'doubt' ? '💬 Doubt' : tab === 'quiz' ? '📊 Quiz' : '📝 Summary'}
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
                className="w-full bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 resize-none"
              />
              <button
                onClick={handleDoubt}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Thinking...' : 'Ask AI →'}
              </button>
              {answer && (
                <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-4 text-gray-300 text-sm whitespace-pre-wrap">
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
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Generating Quiz...' : '⚡ Generate Quiz'}
              </button>

              {quiz.map((q, i) => (
                <div key={i} className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-4">
                  <p className="text-white text-sm font-medium mb-3">{i + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => !submitted && setSelected({ ...selected, [i]: j })}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition border ${
                          submitted
                            ? j === q.correct
                              ? 'bg-green-500/10 border-green-500/30 text-green-400'
                              : selected[i] === j
                              ? 'bg-red-500/10 border-red-500/30 text-red-400'
                              : 'border-gray-700 text-gray-500'
                            : selected[i] === j
                            ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                            : 'border-gray-700 text-gray-400 hover:border-gray-500'
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
                  className="w-full bg-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
                >
                  Submit Answers
                </button>
              )}

              {submitted && (
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center">
                  <p className="text-indigo-400 font-semibold text-lg">
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
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Generating Summary...' : '📝 Generate Summary'}
              </button>
              {summary && (
                <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-4 text-gray-300 text-sm whitespace-pre-wrap">
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