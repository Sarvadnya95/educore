import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { FaBook, FaLayerGroup, FaVideo, FaFileAlt, FaChevronRight } from 'react-icons/fa'

const AdminPanel = () => {
  const navigate = useNavigate()

  const cards = [
    {
      title: 'Manage Subjects',
      description: 'Add, edit or delete subjects for any year & semester',
      icon: <FaBook className="text-[#437FC7] text-xl" />,
      path: '/admin/subjects'
    },
    {
      title: 'Manage Units',
      description: 'Add units inside subjects',
      icon: <FaLayerGroup className="text-[#437FC7] text-xl" />,
      path: '/admin/units'
    },
    {
      title: 'Manage Topics',
      description: 'Add topics with YouTube video links',
      icon: <FaVideo className="text-[#437FC7] text-xl" />,
      path: '/admin/topics'
    },
    {
      title: 'Manage Papers',
      description: 'Upload previous year question papers',
      icon: <FaFileAlt className="text-[#437FC7] text-xl" />,
      path: '/admin/papers'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-1">Admin</p>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all content from here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.path}
              onClick={() => navigate(card.path)}
              className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer hover:border-[#437FC7] hover:shadow-md transition group shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#F0F7FF] rounded-xl flex items-center justify-center">
                  {card.icon}
                </div>
                <FaChevronRight className="text-gray-300 group-hover:text-[#437FC7] transition" />
              </div>
              <h3 className="text-[#1A1A2E] font-semibold text-lg mb-1">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel