Ashish-Portfolio/
├── backend/
├── frontend/
├── project-structure.md
└── python/

backend/
├── config/
│ ├── cloudinary.js
│ └── db.js
│
├── controllers/
│ ├── aboutController.js
│ ├── adminDashboardController.js
│ ├── adminHireController.js
│ ├── assistantController.js
│ ├── authController.js
│ ├── blogController.js
│ ├── commentController.js
│ ├── feedbackController.js
│ ├── fresherOpportunityController.js
│ ├── hireController.js
│ ├── homeController.js
│ ├── journeyController.js
│ ├── likeController.js
│ ├── linkController.js
│ ├── pageAController.js
│ ├── pageBController.js
│ ├── pageCController.js
│ ├── pageDController.js
│ ├── projectController.js
│ ├── shareController.js
│ ├── skillsController.js
│ ├── streakController.js
│ ├── timelineController.js
│ └── visionController.js
│
├── middleware/
│ ├── authMiddleware.js
│ ├── corsConfig.js
│ └── upload.js
│
├── models/
│ ├── About.js
│ ├── AssistantQA.js
│ ├── Blog.js
│ ├── Coin.js
│ ├── Comment.js
│ ├── Feedback.js
│ ├── FresherOpportunity.js
│ ├── Hire.js
│ ├── Home.js
│ ├── Journey.js
│ ├── Like.js
│ ├── LinkInfo.js
│ ├── Project.js
│ ├── Share.js
│ ├── Timeline.js
│ ├── User.js
│ └── Vision.js
│
├── routes/
│ ├── aboutRoutes.js
│ ├── adminHireRoutes.js
│ ├── adminRoutes.js
│ ├── assistantRoutes.js
│ ├── authRoutes.js
│ ├── blogRoutes.js
│ ├── feedbackRoutes.js
│ ├── fresherOpportunityRoutes.js
│ ├── hireRoutes.js
│ ├── homeRoutes.js
│ ├── journeyRoutes.js
│ ├── linkRoutes.js
│ ├── pageARoutes.js
│ ├── pageBRoutes.js
│ ├── pageCRoutes.js
│ ├── pageDRoutes.js
│ ├── projectRoutes.js
│ ├── skillsRoutes.js
│ ├── timelineRoutes.js
│ └── visionRoutes.js
│
├── utils/
│ ├── cloudinaryHelper.js
│ ├── generateToken.js
│ └── sendEmail.js
│
├── uploads/
│ └── sample.pdf
│
├── node_modules/
├── package.json
├── package-lock.json
└── server.js

frontend/
├── node_modules/
│
├── public/
│ └── (default Vite public assets)
│
├── src/
│ ├── App.css
│ ├── App.js
│ ├── App.test.js
│ ├── index.css
│ ├── index.js
│ ├── logo.svg
│ ├── reportWebVitals.js
│ ├── setupTests.js
│
│ ├── auth/
│ │ ├── AuthModal.jsx
│ │ ├── ForgotPasswordForm.jsx
│ │ ├── LoginForm.jsx
│ │ ├── ProfileMenu.jsx
│ │ ├── RegisterForm.jsx
│ │ └── ResetPassword.jsx
│
│ ├── components/
│ │ ├── admin/
│ │ │ ├── AdminHireList.jsx
│ │ │ ├── ContactForm.jsx
│ │ │ ├── FresherOpportunityForm.jsx
│ │ │ ├── HireModal.jsx
│ │ │ ├── ProjectForm.jsx
│ │ │ ├── ServiceForm.jsx
│ │ │ ├── SkillForm.jsx
│ │ │ ├── TeamForm.jsx
│ │ │ └── TimelineEditor.jsx
│ │ │
│ │ ├── BinodAISection.jsx
│ │ ├── BlogCard.jsx
│ │ ├── BlogHero.jsx
│ │ ├── ChartBoard.jsx
│ │ ├── ChatBubble.jsx
│ │ ├── ContactSection.jsx
│ │ ├── FeedbackCard.jsx
│ │ ├── FeedbackForm.jsx
│ │ ├── FeedbackList.jsx
│ │ ├── Footer.jsx
│ │ ├── FresherOpportunityList.jsx
│ │ ├── HeroSection.jsx
│ │ ├── InternshipList.jsx
│ │ ├── Navbar.jsx
│ │ ├── PageASection.jsx
│ │ ├── PageBSection.jsx
│ │ ├── PageCSection.jsx
│ │ ├── Pagination.jsx
│ │ ├── ProfileDrawer.jsx
│ │ ├── ProjectCard.jsx
│ │ ├── ProjectSection.jsx
│ │ ├── ScrollingLinks.jsx
│ │ ├── ServiceSection.jsx
│ │ ├── Sidebar.jsx
│ │ ├── SkillsSection.jsx
│ │ ├── TeamSection.jsx
│ │ ├── TimelineCard.jsx
│ │ ├── VisionSection.jsx
│ │ └── VoiceRecorder.jsx
│
│ ├── config/
│ │ └── navItems.js
│
│ ├── context/
│ │ ├── AuthContext.jsx
│ │ └── ThemeContext.js
│
│ ├── hooks/
│ │ └── useAssistantLogic.js
│
│ ├── protector/
│ │ └── ProtectedRoute.jsx
│
│ ├── pages/
│ │ ├── About.jsx
│ │ ├── Admin/
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── AssistantManager.jsx
│ │ │ ├── BlogManager.jsx
│ │ │ ├── FeedbackViewer.jsx
│ │ │ ├── FresherOpportunityManager.jsx
│ │ │ ├── JourneyManager.jsx
│ │ │ ├── ProjectManager.jsx
│ │ │ ├── SkillManager.jsx
│ │ │ └── TeamManager.jsx
│ │ ├── Assistant.jsx
│ │ ├── Blog.jsx
│ │ ├── BlogDetail.jsx
│ │ ├── Feedback.jsx
│ │ ├── FresherOpportunities.jsx
│ │ ├── HireAdmin.jsx
│ │ ├── HireForm.jsx
│ │ ├── Home.jsx
│ │ ├── Journey.jsx
│ │ ├── JourneyPage.jsx
│ │ ├── Login.jsx
│ │ ├── OtpEmailPage.jsx
│ │ ├── Project.jsx
│ │ ├── Register.jsx
│ │ ├── SingleBlog.jsx
│ │ ├── VerifyOtpPage.jsx
│ │ └── VerifySuccess.jsx
│
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
