# 🚀 HireTrack ATS

A full-stack **Applicant Tracking System (ATS)** built using the **MERN Stack**. HireTrack ATS is a recruitment management platform that helps recruiters efficiently manage job postings and applications while allowing candidates to search jobs, apply, upload resumes, and track their application progress through a secure web application.

---

## 🌟 Features

## 👨‍💻 Candidate Features

* ✅ User Registration & Login
* ✅ JWT-based Authentication
* ✅ Candidate Profile Management
* ✅ Browse Available Jobs
* ✅ Search Jobs by:

  * Job Title
  * Company Name
  * Required Skills
* ✅ Apply for Jobs
* ✅ Upload Resume (PDF)
* ✅ Track Application Status
* ✅ View Personal Profile

---

## 👩‍💼 Recruiter Features

* ✅ Recruiter Registration & Login
* ✅ Recruiter Dashboard
* ✅ Create Job Postings
* ✅ Edit Job Postings
* ✅ Delete Job Postings
* ✅ View Applicants
* ✅ View Candidate Resumes
* ✅ Shortlist Candidates
* ✅ Reject Candidates
* ✅ Application Statistics Dashboard

---

# 🛠️ Tech Stack

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Tailwind CSS
* Axios
* React Router DOM
* Chart.js

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer
* Cloudinary

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# 📂 Project Structure

```
HireTrack-ATS
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication & Authorization

HireTrack ATS uses **JWT (JSON Web Token)** authentication to provide secure login and role-based access control.

### User Roles

* 👨‍💻 Candidate
* 👩‍💼 Recruiter

Each user role has a dedicated dashboard with specific permissions and features.

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/likithanagesh38-a11y/HireTrack-ATS.git

cd HireTrack-ATS
```

---

# Backend Setup

Navigate to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the server folder:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Start backend server:

```bash
npm start
```

---

# Frontend Setup

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
VITE_API_URL=https://hiretrack-ats.onrender.com
```

Run frontend:

```bash
npm run dev
```

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](./screenshots/home.png)

### 🔐 Login Page

![Login Page](./screenshots/login.png)

### 📝 Register Page

![Register Page](./screenshots/register.png)

### 👨‍💻 Candidate Dashboard

![Candidate Dashboard](./screenshots/candidate-dashboard.png)

### 👩‍💼 Recruiter Dashboard

![Recruiter Dashboard](./screenshots/recruiter-dashboard.png)

### 👤 Profile Page

![Profile Page](./screenshots/profile.png)

### 💼 Create Job

![Create Job](./screenshots/create-job.png)

### 📋 View Applicants

![View Applicants](./screenshots/view-applicants.png)
---

# 🌐 Live Demo

## Frontend

https://hire-track-ats.vercel.app

## Backend API

https://hiretrack-ats.onrender.com

---

# 🚀 Future Enhancements

* 🤖 AI Resume Screening
* 🎯 Resume Skill Matching
* 📊 Candidate Ranking System
* 📈 Advanced Recruiter Analytics Dashboard
* 🧠 AI Recruitment Assistant
* 📄 Automated Resume Analysis
* 📧 Email Notifications for Application Updates

---

# 📌 Project Status

✅ Completed
✅ Deployed
✅ Portfolio Ready
🔄 Future AI features planned

---

# 👩‍💻 Author

**Likitha Nagesh Moger**

Computer Science and Engineering Student

### Skills

* React.js
* Node.js
* Express.js
* MongoDB
* JavaScript
* Python
* SQL
* Git & GitHub

GitHub:

https://github.com/likithanagesh38-a11y

---

# 📄 License

This project is developed for educational, learning, and portfolio purposes.

---

# ⭐ Support

If you find this project useful, consider giving this repository a ⭐ on GitHub.

Thank you for visiting **HireTrack ATS** 🚀
