import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUnits, getTopics, getPapers } from '../services/api'
import Navbar from '../components/Navbar'
import UnitAccordion from '../components/UnitAccordion'
import PaperCard from '../components/PaperCard'
import AIPanel from '../components/AIPanel'

const SubjectPage = () => {
  const { id } = useParams()
  const [units, setUnits] = useState([])
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [subjectName, setSubjectName] = useState('')
  const [aiOpen, setAiOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState(null)
  const [currentUnit, setCurrentUnit] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unitsRes = await getUnits(id)
        setUnits(unitsRes.data)
        if (unitsRes.data.length > 0) {
          setSubjectName(unitsRes.data[0].subjectId?.name || 'Subject')
        }
        const papersRes = await getPapers(id)
        setPapers(papersRes.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [id])

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">Dashboard → Subject</p>
          <h1 className="text-3xl font-bold text-white">{subjectName || 'Subject'}</h1>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center mt-20">Loading...</p>
        ) : (
          <>
            {/* Units Accordion */}
            <div className="space-y-3 mb-10">
              {units.length === 0 ? (
                <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-10 text-center">
                  <p className="text-gray-400">No units found for this subject.</p>
                </div>
              ) : (
                units.map((unit) => (
                  <UnitAccordion
                    key={unit._id}
                    unit={unit}
                    onTopicClick={(topic) => {
                      setCurrentTopic(topic)
                      setCurrentUnit(unit)
                    }}
                  />
                ))
              )}
            </div>

            {/* Previous Year Papers */}
            {papers.length > 0 && (
              <div className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4">📄 Previous Year Papers</h2>
                <div className="grid gap-3">
                  {papers.map((paper) => (
                    <PaperCard key={paper._id} paper={paper} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* AI Floating Button */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:opacity-90 transition flex items-center gap-2"
      >
       AI 
      </button>

      {/* AI Panel */}
      {aiOpen && (
        <AIPanel
          onClose={() => setAiOpen(false)}
          subject={subjectName}
          unit={currentUnit?.name || ''}
          topic={currentTopic?.title || ''}
        />
      )}
    </div>
  )
}

export default SubjectPage