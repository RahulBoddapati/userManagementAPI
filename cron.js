if (process.env.NODE_ENV !== "test") {
  const cron = require("node-cron")
  const { Op } = require("sequelize")
  const { User } = require("./models")
  const redis = require("./redis")
  const emailService = require("./services/emailService")

  cron.schedule("0 * * * *", async () => {
    console.log("Running cleanup job")

    try {
      const users = await User.findAll({
        where: {
          verificationToken: {
            [Op.ne]: null
          }
        }
      })

      for (const user of users) {
        const createdAt = new Date(user.createdAt)
        const diffHours = (Date.now() - createdAt) / (1000 * 60 * 60)

        if (diffHours >= 12 && diffHours < 13) {
          const alreadySent = await redis.get(`reminder_${user.id}`)

          if (!alreadySent) {
            console.log("Sending reminder email to:", user.email)

            await emailService.sendEmail(
              user.email,
              "Reminder: Verify Your Account",
              `
                <p>You haven't verified your account yet.</p>
                <p>Please click below:</p>
                <a href="http://localhost:3000/api/verify?token=${user.verificationToken}">
                  Verify Account
                </a>
              `
            )

            await redis.set(
              `reminder_${user.id}`,
              "sent",
              "EX",
              60 * 60 * 24
            )
          }
        }

        if (diffHours >= 24) {
          await user.destroy()
          console.log("Deleted unverified user:", user.id)
        }
      }
    } catch (err) {
      console.error("Cron job error:", err)
    }
  })
}