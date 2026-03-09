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

// 🔹 Create reusable transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT || 465),
  secure: process.env.EMAIL_SECURE
    ? process.env.EMAIL_SECURE === "true"
    : true, // 465 = true, 587 = false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 1,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
  requireTLS: true,
});

const hasEmailEnv = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

if (!hasEmailEnv) {
  console.error(
    "⚠️ Email config missing at startup. Set EMAIL_USER and EMAIL_PASS."
  );
} else {
  transporter.verify((err) => {
    if (err) {
      console.error("⚠️ Email transport verify failed:", err.message);
    } else {
      console.log("✅ Email transport ready");
    }
  });
}

// ✅ Email sending function (returns status, does not throw)
const sendEmail = async (to, subject, html) => {
  const missingEnv = [];
  if (!process.env.EMAIL_USER) missingEnv.push("EMAIL_USER");
  if (!process.env.EMAIL_PASS) missingEnv.push("EMAIL_PASS");

  if (missingEnv.length > 0) {
    const error = `Missing email config: ${missingEnv.join(", ")}`;
    console.error("⚠️ Email send failed:", error);
    return { ok: false, error };
  }

  try {
    const info = await transporter.sendMail({
      from: `"StoneByte" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent to:", to, "MessageId:", info.messageId);
    return { ok: true, info };
  } catch (error) {
    console.error("⚠️ Email send failed:", error.message);
    return { ok: false, error: error.message };
  }
};

module.exports = sendEmail;
