import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import YearSemSelect from './pages/YearSemSelect'
import Dashboard from './pages/Dashboard'
import SubjectPage from './pages/SubjectPage'
import Profile from './pages/Profile'

// Admin Pages
import AdminPanel from './pages/admin/AdminPanel'
import ManageSubjects from './pages/admin/ManageSubjects'
import ManageUnits from './pages/admin/ManageUnits'
import ManageTopics from './pages/admin/ManageTopics'
import ManagePapers from './pages/admin/ManagePapers'

// Components
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl text-blue-600">Loading...</p>
    </div>
  )

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Student Routes */}
      <Route path="/select-year-sem" element={
        <ProtectedRoute><YearSemSelect /></ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/subject/:id" element={
        <ProtectedRoute><SubjectPage /></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>
      } />
      <Route path="/admin/subjects" element={
        <ProtectedRoute adminOnly={true}><ManageSubjects /></ProtectedRoute>
      } />
      <Route path="/admin/units" element={
        <ProtectedRoute adminOnly={true}><ManageUnits /></ProtectedRoute>
      } />
      <Route path="/admin/topics" element={
        <ProtectedRoute adminOnly={true}><ManageTopics /></ProtectedRoute>
      } />
      <Route path="/admin/papers" element={
        <ProtectedRoute adminOnly={true}><ManagePapers /></ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
