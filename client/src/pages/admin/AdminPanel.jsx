import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const AdminPanel = () => {
  const navigate = useNavigate()

  const cards = [
    {
      title: 'Manage Subjects',
      description: 'Add, edit or delete subjects for any year & semester',
      icon: '📚',
      path: '/admin/subjects'
    },
    {
      title: 'Manage Units',
      description: 'Add units inside subjects',
      icon: '📂',
      path: '/admin/units'
    },
    {
      title: 'Manage Topics',
      description: 'Add topics with YouTube video links',
      icon: '🎥',
      path: '/admin/topics'
    },
    {
      title: 'Manage Papers',
      description: 'Upload previous year question papers',
      icon: '📄',
      path: '/admin/papers'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">Admin</p>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Manage all content from here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.path}
              onClick={() => navigate(card.path)}
              className="bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6 cursor-pointer hover:border-indigo-500/50 transition group"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-1">{card.title}</h3>
              <p className="text-gray-500 text-sm">{card.description}</p>
              <div className="mt-4 text-indigo-400 text-sm group-hover:underline">
                Open →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel