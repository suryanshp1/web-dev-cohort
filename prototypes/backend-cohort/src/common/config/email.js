import nodemailer from "nodemailer"

// use mailtrap or resend for testing smtp
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `${process.env.SMTP_FROM_EMAIL}`,
        to,
        subject,
        html,
    })
}

const sendVerificationEmail = async (email, token) => {
    await transporter.sendMail({
        from: `${process.env.SMTP_FROM_EMAIL}`,
        email,
        subject,
        html,
    })
}

export {
    sendEmail,
    sendVerificationEmail,
}