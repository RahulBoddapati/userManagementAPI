const authService = require("../services/authService")

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const token = await authService.login(email, password)

    res.json({ token })

  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}
