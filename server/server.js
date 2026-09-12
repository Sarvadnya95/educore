const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

// ✅ Security Headers
app.use(helmet())

// ✅ Compression
app.use(compression())

// ✅ CORS
app.use(cors())

// ✅ Body Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ General Rate Limiter — 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again after 15 minutes' }
})

// ✅ AI Rate Limiter — 10 AI requests per minute per IP
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Too many AI requests, please wait a minute and try again' }
})

// ✅ Auth Rate Limiter — 5 login attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts, please try again after 15 minutes' }
})

// Apply rate limiters
app.use('/api/', generalLimiter)
app.use('/api/ai/', aiLimiter)
app.use('/api/auth/login', authLimiter)

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/subjects', require('./routes/subjects'))
app.use('/api/units', require('./routes/units'))
app.use('/api/topics', require('./routes/topics'))
app.use('/api/papers', require('./routes/papers'))
app.use('/api/ai', require('./routes/ai'))

// ✅ Global Error Handler — never expose raw errors
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(500).json({ message: 'Something went wrong. Please try again.' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))