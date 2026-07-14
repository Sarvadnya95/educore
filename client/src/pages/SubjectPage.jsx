import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUnits, getPapers } from '../services/api'
import Navbar from '../components/Navbar'
import UnitAccordion from '../components/UnitAccordion'
import PaperCard from '../components/PaperCard'
import AIPanel from '../components/AIPanel'
import { FaArrowLeft, FaRobot } from 'react-icons/fa'

const SubjectPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [units, setUnits] = useState([])
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [subjectName, setSubjectName] = useState('')
  const [subjectDesc, setSubjectDesc] = useState('')
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
          setSubjectDesc(unitsRes.data[0].subjectId?.description || '')
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
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">

        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-[#437FC7] transition text-sm mb-4"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-[#1A1A2E]">{subjectName || 'Subject'}</h1>
          {subjectDesc && <p className="text-gray-400 text-sm mt-1">{subjectDesc}</p>}
        </div>

        {loading ? (
          <p className="text-gray-400 text-center mt-20">Loading...</p>
        ) : (
          <>
            {/* Units */}
            <div className="space-y-3 mb-8">
              {units.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
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

            {/* Papers */}
            {papers.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-[#1A1A2E] font-semibold text-lg mb-4">Previous Year Papers</h2>
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

      {/* AI Button — fixed bottom right always visible */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-5 right-4 z-40 bg-[#437FC7] text-white px-4 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-200 hover:bg-[#3a6fb0] transition flex items-center gap-2 text-sm"
      >
        <FaRobot /> AI
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