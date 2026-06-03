import axios from 'axios'

const API = axios.create({
  baseURL: 'https://educore-backend-y6xs.onrender.com/api'
})

// Automatically add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

// AUTH
export const register = (data) => API.post('/auth/register', data)
export const login = (data) => API.post('/auth/login', data)
export const updateYearSem = (data) => API.put('/auth/update-year-sem', data)

// SUBJECTS
export const getSubjects = (year, semester) => API.get(`/subjects?year=${year}&semester=${semester}`)
export const addSubject = (data) => API.post('/subjects', data)
export const deleteSubject = (id) => API.delete(`/subjects/${id}`)

// UNITS
export const getUnits = (subjectId) => API.get(`/units/${subjectId}`)
export const addUnit = (data) => API.post('/units', data)
export const deleteUnit = (id) => API.delete(`/units/${id}`)

// TOPICS
export const getTopics = (unitId) => API.get(`/topics/${unitId}`)
export const addTopic = (data) => API.post('/topics', data)
export const deleteTopic = (id) => API.delete(`/topics/${id}`)

// PAPERS
export const getPapers = (subjectId) => API.get(`/papers/${subjectId}`)
export const uploadPaper = (data) => API.post('/papers', data)
export const deletePaper = (id) => API.delete(`/papers/${id}`)

// AI
export const solveDoubt = (data) => API.post('/ai/doubt', data)
export const generateQuiz = (data) => API.post('/ai/quiz', data)
export const generateSummary = (data) => API.post('/ai/summary', data)

export const searchContent = (query, year, semester) => 
  API.get(`/subjects/search?query=${query}&year=${year}&semester=${semester}`)