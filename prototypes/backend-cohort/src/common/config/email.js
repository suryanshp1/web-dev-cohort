import nodemailer from "nodemailer"

// use mailtrap or resend for testing smtp
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_EMAIL}" <${process.env.SMTP_FROM_EMAIL}>`,
        to,
        subject,
        html,
    })
}

const sendVerificationEmail = async (email, token) => {
    const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
    await sendMail(
        email,
        "Verify your email",
        `<h2>Welcome!</h2><p><a href="${url}">here</a> to verify your email.</p>`,
    )
}

export {
    sendEmail,
    sendVerificationEmail,
}