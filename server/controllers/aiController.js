const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// DOUBT SOLVER
const solveDoubt = async (req, res) => {
  const { subject, unit, topic, doubt } = req.body
  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: `You are EduCore's AI Study Assistant — a helpful college teacher for BCA students.
Current context: Subject: ${subject || 'General'}, Unit: ${unit || 'General'}, Topic: ${topic || 'General'}.
Rules:
- Answer any question related to computer science, programming, mathematics, or academics clearly and simply
- If the question is completely unrelated to education or academics (like politics, celebrities, sports, personal questions about people), respond with: "Hi! I am EduCore's AI Study Assistant 📚 I am here to help you with your syllabus doubts, quizzes, and topic summaries. I don't have information about people or non-academic topics. Ask me anything about your studies and I will be happy to help!"
- Keep answers simple, clear and suitable for college students
- Never ask the student to specify subject — just answer based on context provided
- Be friendly and encouraging`
        },
        {
          role: 'user',
          content: doubt
        }
      ]
    })
    res.json({ answer: response.choices[0].message.content })
  } catch (error) {
    console.log('SolveDoubt error:', error)
    res.status(500).json({ message: error.message })
  }
}

// QUIZ GENERATOR
const generateQuiz = async (req, res) => {
  const { subject, unit, topics } = req.body
  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: 'You are a college exam question generator. Generate exactly 5 MCQ questions in valid JSON array format only. No extra text, no markdown, no explanation.'
        },
        {
          role: 'user',
          content: `Generate 5 multiple choice questions for BCA college students on:
Subject: ${subject}
Unit: ${unit}
Topics: ${topics}

Respond ONLY with a JSON array like this:
[
  {
    "question": "question here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0
  }
]
correct is the index (0,1,2,3) of the correct option.`
        }
      ]
    })
    let text = response.choices[0].message.content
    text = text.replace(/```json|```/g, '').trim()
    const quiz = JSON.parse(text)
    res.json({ quiz })
  } catch (error) {
    console.log('GenerateQuiz error:', error)
    res.status(500).json({ message: error.message })
  }
}

// TOPIC SUMMARY
const generateSummary = async (req, res) => {
  const { subject, topic } = req.body
  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: 'You are EduCore\'s AI Study Assistant — a helpful college teacher for BCA students. Give clear, concise topic summaries. Always answer even if subject is not specified — use general computer science knowledge. Be friendly and encouraging.'
        },
        {
          role: 'user',
          content: `Give a clear summary of "${topic}" ${subject ? `from ${subject}` : ''} for a BCA college student.
Include:
- Simple definition
- Key points (maximum 5)
- Why it is important
Keep it short and easy to understand.`
        }
      ]
    })
    res.json({ summary: response.choices[0].message.content })
  } catch (error) {
    console.log('GenerateSummary error:', error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { solveDoubt, generateQuiz, generateSummary }
