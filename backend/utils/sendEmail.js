// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, html) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // or "Mailtrap"
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"StoneByte " <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });

//   console.log("✅ Email sent to:", to);
// };

// module.exports = sendEmail;

//deployment issue resolve ...................

const nodemailer = require("nodemailer");

// 🔹 Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Email sending function with non-blocking + error logging
const sendEmail = async (to, subject, html) => {
  try {
    // Send email in background (non-blocking)
    transporter.sendMail(
      {
        from: `"StoneByte" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      },
      (err, info) => {
        if (err) {
          console.error("⚠️ Email send failed:", err.message);
        } else {
          console.log("✅ Email sent to:", to, "MessageId:", info.messageId);
        }
      }
    );
  } catch (error) {
    console.error("❌ sendEmail error:", error.message);
  }
};

module.exports = sendEmail;
