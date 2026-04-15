const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rahu.boddapati@gmail.com",
    pass: "eqwouqyqxebhvxfq"
  }
})

exports.sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: "your_email@gmail.com",
    to,
    subject,
    text
  })
}