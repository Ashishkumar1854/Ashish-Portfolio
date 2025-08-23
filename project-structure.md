ashish-portfolio/
├── backend/ ← Express.js + MongoDB (API Server)
└── frontend/ ← React + Tailwind CSS (Client App)

backend/
├── config/ ← MongoDB config
│ └── db.js
│
├── controllers/ ← Route handlers (business logic)
│ ├── authController.js
│ ├── blogController.js
│ ├── feedbackController.js
│ ├── hireController.js
│ ├── homeController.js
│ ├── internshipController.js
│ ├── journeyController.js
│ ├── linkController.js
│ ├── pageAController.js
│ ├── projectController.js
│ ├── skillsController.js
│ ├── teamController.js
│ ├── timelineController.js
│ └── visionController.js
│
├── middleware/ ← Auth & utility middlewares
│ ├── authMiddleware.js
│ ├── corsConfig.js
│ └── upload.js
│
├── models/ ← Mongoose schemas
│ ├── Blog.js
│ ├── contact.js
│ ├── Feedback.js
│ ├── Hire.js
│ ├── Home.js
│ ├── Internship.js
│ ├── Journey.js
│ ├── LinkInfo.js
│ ├── Project.js
│ ├── service.js
│ ├── Skill.js
│ ├── teamMember.js
│ ├── Timeline.js
│ └── User.js
│
├── routes/ ← Route files for each section
│ ├── authRoutes.js
│ ├── blogRoutes.js
│ ├── contactRoutes.js
│ ├── feedbackRoutes.js
│ ├── hireRoutes.js
│ ├── homeRoutes.js
│ ├── internshipRoutes.js
│ ├── journeyRoutes.js
│ ├── linkRoutes.js
│ ├── pageARoutes.js
│ ├── projectRoutes.js
│ ├── serviceRoutes.js
│ ├── skills.js
│ ├── teamRoutes.js
│ ├── timelineRoutes.js
│ └── visionRoutes.js
│
├── utils/ ← Helpers (non-middleware)
│ ├── generateToken.js
│ └── sendEmail.js
│
├── uploads/ ← Uploaded files (images etc.)
│
├── server.js ← Entry point (Express app)
├── package.json
└── package-lock.json

frontend/
├── public/ ← Static assets
│ └── (index.html, images...)
│
├── src/
│ ├── auth/ ← Auth components
│ │ ├── AuthModal.jsx
│ │ ├── ForgotPasswordForm.jsx
│ │ ├── LoginForm.jsx
│ │ ├── ProfileMenu.jsx
│ │ ├── RegisterForm.jsx
│ │ └── ResetPassword.jsx
│ │
│ ├── components/ ← UI sections
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ ├── BlogCard.jsx
│ │ ├── ContactSection.jsx
│ │ ├── FeedbackCard.jsx
│ │ ├── HeroSection.jsx
│ │ ├── HireForm.jsx
│ │ ├── InternshipList.jsx
│ │ ├── PageASection.jsx
│ │ ├── PageBSection.jsx
│ │ ├── ProjectCard.jsx
│ │ ├── ScrollingLinks.jsx
│ │ ├── ServiceSection.jsx
│ │ ├── SkillsSection.jsx
│ │ ├── TeamSection.jsx
│ │ ├── TimelineCard.jsx
│ │ ├── VisionSection.jsx
│ │ ├── ChartBoard.jsx
│ │ ├── ChatBubble.jsx
│ │ └── VoiceRecorder.jsx
│ │
│ ├── components/admin/ ← Admin-specific forms
│ │ ├── BlogForm.jsx
│ │ ├── InternshipForm.jsx
│ │ ├── ProjectForm.jsx
│ │ ├── ServiceForm.jsx
│ │ ├── SkillForm.jsx
│ │ ├── TeamForm.jsx
│ │ └── TimelineEditor.jsx
│ │
│ ├── context/
│ │ └── AuthContext.jsx
│ │
│ ├── pages/ ← Main page-level components
│ │ ├── About.jsx
│ │ ├── Assistant.jsx
│ │ ├── Blog.jsx
│ │ ├── Feedback.jsx
│ │ ├── Home.jsx
│ │ ├── Internship.jsx
│ │ ├── Journey.jsx
│ │ ├── Login.jsx
│ │ ├── OtpEmailPage.jsx
│ │ ├── Project.jsx
│ │ ├── Register.jsx
│ │ ├── VerifyOtpPage.jsx
│ │ └── VerifySuccess.jsx
│ │
│ ├── pages/admin/ ← Admin dashboards (per section)
│ │ ├── AdminDashboard.jsx
│ │ ├── AssistantManager.jsx
│ │ ├── BlogManager.jsx
│ │ ├── FeedbackViewer.jsx
│ │ ├── InternshipManager.jsx
│ │ ├── JourneyManager.jsx
│ │ ├── ProjectManager.jsx
│ │ ├── SkillManager.jsx
│ │ └── TeamManager.jsx
│ │
│ ├── App.js
│ ├── App.css
│ ├── App.test.js
│ ├── index.js
│ ├── index.css
│ ├── logo.svg
│ ├── reportWebVitals.js
│ └── setupTests.js
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── package-lock.json
└── README.md

15august polish kr rhe h

backend/
├── controllers/
│ ├── blogController.js
│ ├── coinController.js
├── models/
│ ├── Blog.js
│ ├── Coin.js
│ └── Activity.js
├── routes/
│ ├── blogRoutes.js
│ └── coinRoutes.js
└── middleware/
└── adminAuth.js

frontend/
├── pages/
│ └── Blog.jsx
├── components/
│ └── BlogCard.jsx
├── components/admin/
│ └── BlogForm.jsx
└── context/
└── AuthContext.jsx
