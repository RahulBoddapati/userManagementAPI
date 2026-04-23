const request = require("supertest")
const app = require("../app")

describe("Login API", () => {
  it("should fail with wrong credentials", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "wrong@test.com",
        password: "wrong"
      })

    expect(res.statusCode).toBe(401)
  })
})