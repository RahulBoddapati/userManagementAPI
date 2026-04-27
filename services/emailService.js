const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: ""
  }
})

exports.sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: "your_email@gmail.com",
    to,
    subject,
    html
  })
}