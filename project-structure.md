ashish-portfolio/
├── backend/ ← Express.js + MongoDB (API Server)
└── frontend/ ← React + Tailwind CSS (Client App)

┣ backend/
┃ ┣ config/
┃ ┣ controllers/
┃ ┃ ┣ aboutController.js
┃ ┃ ┣ authController.js
┃ ┃ ┣ blogController.js
┃ ┃ ┣ coinController.js
┃ ┃ ┣ feedbackController.js
┃ ┃ ┣ fresherOpportunityController.js
┃ ┃ ┣ hireController.js
┃ ┃ ┣ homeController.js
┃ ┃ ┣ journeyController.js
┃ ┃ ┣ linkController.js
┃ ┃ ┣ pageAController.js
┃ ┃ ┣ pageBController.js
┃ ┃ ┣ pageCController.js
┃ ┃ ┣ pageDController.js
┃ ┃ ┣ projectController.js
┃ ┃ ┣ skillsController.js
┃ ┃ ┣ timelineController.js
┃ ┃ ┗ visionController.js
┃ ┣ middleware/
┃ ┃ ┣ authMiddleware.js
┃ ┃ ┣ corsConfig.js
┃ ┃ ┗ upload.js
┃ ┣ models/
┃ ┃ ┣ About.js
┃ ┃ ┣ Blog.js
┃ ┃ ┣ Coin.js
┃ ┃ ┣ Feedback.js
┃ ┃ ┣ FresherOpportunity.js
┃ ┃ ┣ Hire.js
┃ ┃ ┣ Home.js
┃ ┃ ┣ Journey.js
┃ ┃ ┣ LinkInfo.js
┃ ┃ ┣ Project.js
┃ ┃ ┣ Timeline.js
┃ ┃ ┗ User.js
┃ ┣ routes/
┃ ┃ ┣ aboutRoutes.js
┃ ┃ ┣ authRoutes.js
┃ ┃ ┣ blogRoutes.js
┃ ┃ ┣ coinRoutes.js
┃ ┃ ┣ feedbackRoutes.js
┃ ┃ ┣ fresherOpportunityRoutes.js
┃ ┃ ┣ hireRoutes.js
┃ ┃ ┣ homeRoutes.js
┃ ┃ ┣ journeyRoutes.js
┃ ┃ ┣ linkRoutes.js
┃ ┃ ┣ pageARoutes.js
┃ ┃ ┣ pageBRoutes.js
┃ ┃ ┣ pageCRoutes.js
┃ ┃ ┣ pageDRoutes.js
┃ ┃ ┣ projectRoutes.js
┃ ┃ ┣ skillsRoutes.js
┃ ┃ ┣ timelineRoutes.js
┃ ┃ ┣ visionRoutes.js
┃ ┃ ┗ startup_guide.pdf
┃ ┣ uploads/
┃ ┃ ┣ 1752770572811-698736347.pdf
┃ ┃ ┗ sample.pdf
┃ ┣ utils/
┃ ┃ ┣ generateToken.js
┃ ┃ ┗ sendEmail.js
┃ ┣ node_modules/
┃ ┣ package.json
┃ ┣ package-lock.json
┃ ┗ server.js
┣ frontend/
┃ ┣ public/
┃ ┣ src/
┃ ┃ ┣ auth/
┃ ┃ ┃ ┣ AuthModal.jsx
┃ ┃ ┃ ┣ ForgotPasswordForm.jsx
┃ ┃ ┃ ┣ LoginForm.jsx
┃ ┃ ┃ ┣ ProfileMenu.jsx
┃ ┃ ┃ ┣ RegisterForm.jsx
┃ ┃ ┃ ┗ ResetPassword.jsx
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ admin/
┃ ┃ ┃ ┃ ┣ BlogForm.jsx
┃ ┃ ┃ ┃ ┣ ContactForm.jsx
┃ ┃ ┃ ┃ ┣ FresherOpportunityForm.jsx
┃ ┃ ┃ ┃ ┣ ProjectForm.jsx
┃ ┃ ┃ ┃ ┣ ServiceForm.jsx
┃ ┃ ┃ ┃ ┣ SkillForm.jsx
┃ ┃ ┃ ┃ ┣ TeamForm.jsx
┃ ┃ ┃ ┃ ┗ TimelineEditor.jsx
┃ ┃ ┃ ┣ BinodAISection.jsx
┃ ┃ ┃ ┣ BlogCard.jsx
┃ ┃ ┃ ┣ ChartBoard.jsx
┃ ┃ ┃ ┣ ChatBubble.jsx
┃ ┃ ┃ ┣ ContactSection.jsx
┃ ┃ ┃ ┣ FeedbackCard.jsx
┃ ┃ ┃ ┣ Footer.jsx
┃ ┃ ┃ ┣ FresherOpportunityList.jsx
┃ ┃ ┃ ┣ HeroSection.jsx
┃ ┃ ┃ ┣ HireForm.jsx
┃ ┃ ┃ ┣ InternshipList.jsx
┃ ┃ ┃ ┣ Navbar.jsx
┃ ┃ ┃ ┣ PageASection.jsx
┃ ┃ ┃ ┣ PageBSection.jsx
┃ ┃ ┃ ┣ PageCSection.jsx
┃ ┃ ┃ ┣ ProjectCard.jsx
┃ ┃ ┃ ┣ ProjectSection.jsx
┃ ┃ ┃ ┣ ScrollingLinks.jsx
┃ ┃ ┃ ┣ ServiceSection.jsx
┃ ┃ ┃ ┣ SkillsSection.jsx
┃ ┃ ┃ ┣ TeamSection.jsx
┃ ┃ ┃ ┣ TimelineCard.jsx
┃ ┃ ┃ ┣ VisionSection.jsx
┃ ┃ ┃ ┗ VoiceRecorder.jsx
┃ ┃ ┣ context/
┃ ┃ ┃ ┗ AuthContext.jsx
┃ ┃ ┣ pages/
┃ ┃ ┃ ┣ Admin/
┃ ┃ ┃ ┃ ┣ AdminDashboard.jsx
┃ ┃ ┃ ┃ ┣ AssistantManager.jsx
┃ ┃ ┃ ┃ ┣ BlogManager.jsx
┃ ┃ ┃ ┃ ┣ FeedbackViewer.jsx
┃ ┃ ┃ ┃ ┣ FresherOpportunityManager.jsx
┃ ┃ ┃ ┃ ┣ JourneyManager.jsx
┃ ┃ ┃ ┃ ┣ ProjectManager.jsx
┃ ┃ ┃ ┃ ┣ SkillManager.jsx
┃ ┃ ┃ ┃ ┗ UserManager.jsx
┃ ┃ ┃ ┣ About.jsx
┃ ┃ ┃ ┣ Assistant.jsx
┃ ┃ ┃ ┣ Blog.jsx
┃ ┃ ┃ ┣ Feedback.jsx
┃ ┃ ┃ ┣ FresherOpportunities.jsx
┃ ┃ ┃ ┣ Home.jsx
┃ ┃ ┃ ┣ Journey.jsx
┃ ┃ ┃ ┣ Login.jsx
┃ ┃ ┃ ┣ OtpEmailPage.jsx
┃ ┃ ┃ ┣ Project.jsx
┃ ┃ ┃ ┣ Register.jsx
┃ ┃ ┃ ┣ VerifyOtpPage.jsx
┃ ┃ ┃ ┗ VerifySuccess.jsx
┃ ┃ ┣ App.css
┃ ┃ ┣ App.js
┃ ┃ ┣ App.test.js
┃ ┃ ┣ index.css
┃ ┃ ┣ index.js
┃ ┃ ┣ logo.svg
┃ ┃ ┣ protector/
┃ ┃ ┣ reportWebVitals.js
┃ ┃ ┗ setupTests.js
┃ ┣ node_modules/
┃ ┣ package.json
┃ ┣ package-lock.json
┃ ┣ postcss.config.js
┃ ┣ tailwind.config.js
┃ ┗ README.md
┣ project-structure.md
┗ python/
