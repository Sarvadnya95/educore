import { useState, useEffect } from 'react'
import { getTopics } from '../services/api'
import VideoPlayer from './VideoPlayer'

const UnitAccordion = ({ unit, onTopicClick }) => {
  const [open, setOpen] = useState(false)
  const [topics, setTopics] = useState([])
  const [activeTopic, setActiveTopic] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && topics.length === 0) {
      fetchTopics()
    }
  }, [open])

  const fetchTopics = async () => {
    setLoading(true)
    try {
      const res = await getTopics(unit._id)
      setTopics(res.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleTopicClick = (topic) => {
    setActiveTopic(activeTopic?._id === topic._id ? null : topic)
    onTopicClick(topic)
  }

  return (
    <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl overflow-hidden">
      {/* Unit Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#253347] transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 text-sm font-bold">
            {unit.order}
          </div>
          <span className="text-white font-semibold">{unit.name}</span>
        </div>
        <span className="text-gray-500 text-lg">{open ? '▲' : '▼'}</span>
      </button>

      {/* Topics */}
      {open && (
        <div className="border-t border-gray-700/50">
          {loading ? (
            <p className="text-gray-500 text-sm p-4">Loading topics...</p>
          ) : topics.length === 0 ? (
            <p className="text-gray-500 text-sm p-4">No topics added yet.</p>
          ) : (
            topics.map((topic) => (
              <div key={topic._id} className="border-b border-gray-700/30 last:border-0">
                {/* Topic Row */}
                <button
                  onClick={() => handleTopicClick(topic)}
                  className="w-full px-6 py-3 flex items-center justify-between hover:bg-[#253347] transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-400 text-sm">▶</span>
                    <span className="text-gray-300 text-sm">{topic.title}</span>
                  </div>
                  <span className="text-gray-600 text-xs">
                    {activeTopic?._id === topic._id ? '▲' : '▼'}
                  </span>
                </button>

                {/* Video + Notes */}
                {activeTopic?._id === topic._id && (
                  <div className="px-6 pb-4">
                    {topic.youtubeLink ? (
                      <VideoPlayer url={topic.youtubeLink} />
                    ) : (
                      <p className="text-gray-500 text-sm">No video added yet.</p>
                    )}
                    <div className="mt-3 bg-[#0F172A] rounded-xl p-4">
                      <p className="text-gray-500 text-sm">📝 Notes — Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default UnitAccordion