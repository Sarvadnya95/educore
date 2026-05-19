const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'Email already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    })

    res.status(201).json({ message: 'Registered successfully', userId: user._id })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        year: user.year,
        semester: user.semester
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE YEAR & SEMESTER
const updateYearSem = async (req, res) => {
  const { year, semester } = req.body
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { year, semester },
      { new: true, returnDocument: 'after' }
    ).select('-password')

    res.json({
      message: 'Year and semester updated successfully',
      user
    })
  } catch (error) {
    console.log('UpdateYearSem error:', error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { register, login , updateYearSem }