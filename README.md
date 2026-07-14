# 🚀 HireTrack ATS

## Applicant Tracking System

HireTrack ATS is a full-stack Applicant Tracking System that helps recruiters manage job postings and applications while allowing candidates to search, apply for jobs, upload resumes, and track application status.

The platform provides separate dashboards for candidates and recruiters with authentication, job management, resume upload, and application tracking features.

---

# ✨ Features

## 👨‍💻 Candidate Features

- User registration and login
- JWT-based authentication
- Candidate profile management
- Browse available jobs
- Search jobs by title, company, and skills
- Apply for jobs
- Upload resume
- Track application status

## 👩‍💼 Recruiter Features

- Recruiter registration and login
- Recruiter dashboard
- Create job postings
- Edit and delete jobs
- View applicants
- View candidate resumes
- Shortlist candidates
- Reject candidates
- Application statistics dashboard

---

# 🛠️ Tech Stack

## Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- Axios
- React Router
- Chart.js

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Resume Upload)

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# 📂 Project Structure

```
HireTrack-ATS
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

# 🔐 Authentication

HireTrack ATS uses JWT authentication for secure login and authorization.

User Roles:

- Candidate
- Recruiter

Each role has a separate dashboard with different functionalities.

---

# ⚙️ Installation and Setup

## Clone Repository

```bash
git clone https://github.com/likithanagesh38-a11y/HireTrack-ATS.git
```

## Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm start
```

## Frontend Setup

```bash
cd client
npm install
npm start
```

---

# 📸 Screenshots

Add screenshots of:

- Login Page
- Candidate Dashboard
- Recruiter Dashboard
- Job Creation Page
- Resume View Feature

---

# 🌐 Live Demo

Frontend:
(Add your Vercel URL)

Backend:
 https://hiretrack-ats.onrender.com

---

# 🔮 Future Enhancements

- AI-based resume screening
- Resume skill matching
- Candidate ranking system
- Email notifications
- Interview scheduling
- Advanced recruiter analytics
- AI-powered recruitment assistant

---

# 👩‍💻 Author

**Likitha Nagesh Moger**

Computer Science Engineering Student

Skills:

- React.js
- Node.js
- MongoDB
- Python
- SQL
- JavaScript

---

# 📄 License

This project is developed for learning and portfolio purposes.
