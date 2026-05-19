const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// DOUBT SOLVER
const solveDoubt = async (req, res) => {
  const { subject, unit, topic, doubt } = req.body;
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: "user",
          content: `You are a helpful teacher. A student is studying ${subject}, specifically ${unit} - ${topic}.
          Their doubt is: ${doubt}
          Please explain in simple and clear language suitable for a college student.`,
        },
      ],
    });
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.log("SolveDoubt error:", error);
    res.status(500).json({ message: error.message });
  }
};

// QUIZ GENERATOR
const generateQuiz = async (req, res) => {
  const { subject, unit, topics } = req.body;
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: "user",
          content: `Generate 5 multiple choice questions for a college student studying ${subject} - ${unit}.
          Topics covered: ${topics}
          
          Respond ONLY with a JSON array, no extra text, no markdown, like this:
          [
            {
              "question": "question here",
              "options": ["A", "B", "C", "D"],
              "correct": 0
            }
          ]
          correct is the index of correct option (0,1,2,3)`,
        },
      ],
    });
    let text = response.choices[0].message.content;
    text = text.replace(/\`\`\`json|\`\`\`/g, "").trim();
    const quiz = JSON.parse(text);
    res.json({ quiz });
  } catch (error) {
    console.log("GenerateQuiz error:", error);
    res.status(500).json({ message: error.message });
  }
};

// TOPIC SUMMARY
const generateSummary = async (req, res) => {
  const { subject, topic } = req.body;
  try {
    const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: "user",
          content: `Give a clear and concise summary of the topic "${topic}" from the subject "${subject}" for a college student.
          Include:
          - Simple explanation
          - Key points (maximum 5)
          Keep it short and easy to understand.`,
        },
      ],
    });
    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    console.log("GenerateSummary error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { solveDoubt, generateQuiz, generateSummary };
