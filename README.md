# 🎓 EduCore — College Learning Platform

> **Free, AI-powered syllabus platform for college students**  
> Access your complete syllabus, video lectures, AI assistance, and previous year papers — anytime, anywhere.

## 📌 Problem Statement

College students often miss lectures and have no consistent way to access their syllabus or study materials. There is no single platform where students can find topic-wise video lectures, notes, and previous year papers for their specific semester — for free.

**EduCore solves this.**

---

## ✨ Features

### 👨‍🎓 For Students
- 🔐 **Secure Authentication** — Register, login with JWT-based auth
- 📚 **Year & Semester Based Dashboard** — See only your relevant subjects
- 📖 **Syllabus Accordion** — Navigate subjects → units → topics cleanly
- 🎥 **YouTube Video Lectures** — Watch embedded videos per topic
- 📄 **Previous Year Papers** — Download PDFs instantly
- 🔍 **Global Search** — Search any topic, unit or subject instantly
- 👤 **Profile Management** — Change year/semester anytime

### 🤖 AI Features (Powered by Groq — LLaMA 3)
- 💬 **AI Doubt Solver** — Ask any doubt, get instant answers in context
- 📊 **AI Quiz Generator** — Generate 5 MCQs on any topic instantly
- 📝 **AI Topic Summary** — Get structured notes for any topic in one click

### 🔧 For Admin
- ➕ **Manage Subjects** — Add/delete subjects by year & semester
- 📂 **Manage Units** — Add units inside subjects
- 🎬 **Manage Topics** — Add topics with YouTube links
- 📎 **Upload Papers** — Upload previous year PDFs via Cloudinary

### 📱 Progressive Web App (PWA)
- Install EduCore on your phone like a native app
- Works on Android & iOS — no Play Store needed
- Offline support for visited pages

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js + Vite |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT + bcryptjs |
| **AI** | Groq API (LLaMA 3.3 70B) |
| **File Storage** | Cloudinary |
| **Frontend Deploy** | Vercel |
| **Backend Deploy** | Render |

---

## 📁 Project Structure

```
educore/
├── client/                   # React Frontend
│   ├── public/
│   │   ├── logo.PNG
│   │   ├── manifest.json     # PWA manifest
│   │   └── sw.js             # Service Worker
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── YearSemSelect.jsx
│       │   ├── Dashboard.jsx
│       │   ├── SubjectPage.jsx
│       │   ├── Profile.jsx
│       │   └── admin/
│       │       ├── AdminPanel.jsx
│       │       ├── ManageSubjects.jsx
│       │       ├── ManageUnits.jsx
│       │       ├── ManageTopics.jsx
│       │       └── ManagePapers.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── UnitAccordion.jsx
│       │   ├── VideoPlayer.jsx
│       │   ├── PaperCard.jsx
│       │   └── AIPanel.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       └── services/
│           └── api.js
│
└── server/                   # Node + Express Backend
    ├── models/
    │   ├── user.js
    │   ├── subject.js
    │   ├── unit.js
    │   ├── topic.js
    │   └── paper.js
    ├── routes/
    │   ├── auth.js
    │   ├── subjects.js
    │   ├── units.js
    │   ├── topics.js
    │   ├── papers.js
    │   └── ai.js
    ├── controllers/
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── adminMiddleware.js
    ├── config/
    │   ├── db.js
    │   └── cloudinary.js
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account
- Groq API key

### 1. Clone the Repository

```bash
git clone https://github.com/Sarvadnya95/educore.git
cd educore
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

### 4. Set Admin Role

Register on the platform → go to MongoDB → find your user → change `role` from `student` to `admin`.

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| PUT | `/api/auth/update-year-sem` | Update year & semester |

### Content
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/subjects` | Get subjects by year & sem |
| POST | `/api/subjects` | Add subject (admin) |
| GET | `/api/units/:subjectId` | Get units by subject |
| POST | `/api/units` | Add unit (admin) |
| GET | `/api/topics/:unitId` | Get topics by unit |
| POST | `/api/topics` | Add topic (admin) |
| GET | `/api/papers/:subjectId` | Get papers by subject |
| POST | `/api/papers` | Upload paper (admin) |

### AI
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/ai/doubt` | AI doubt solver |
| POST | `/api/ai/quiz` | AI quiz generator |
| POST | `/api/ai/summary` | AI topic summary |

### Search
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/subjects/search` | Global search |

---

## 📸 Screenshots

> Home Page • Dashboard • Subject Page • AI Assistant • Admin Panel

---

## 🎯 Upcoming Features

- [ ] Progress Tracker — Mark topics as done
- [ ] AI Study Planner — Day by day exam preparation plan
- [ ] Gamification — Points, streaks and leaderboard
- [ ] AI Notes Generator — Auto generate notes per topic
- [ ] Bulk Syllabus Import — Upload via Excel/CSV
- [ ] Analytics Dashboard for Admin

---

## 👨‍💻 Developer

**Sarvadnya** — BCA Student, Sant Gadge Baba Amravati University  
Google Student Ambassador 2026 | Tech Content Creator | Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-pink?style=flat&logo=instagram)](https://instagram.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ for college students — by a college student</p>
