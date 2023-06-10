const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(async () => {
  await setupDatabase();
}, 20000);

describe("User API Test", () => {
  it("Should signup a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: "Andrew",
        email: "andrew@exmple.com",
        password: "MyPass777!",
      })
      .expect(201);

    // Assert that the database was change correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
      user: {
        username: "Andrew",
        email: "andrew@exmple.com",
      },
      token: user.tokens[0].token,
    });

    expect(user.password).not.toBe("MyPass777!");
  });

  it("Should login a user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
  });

  it("Should not login a user if password is incorrect", async () => {
    await request(app)
      .post("/api/auth/login")
      .send({
        email: "andrew@exmple.com",
        password: "wrongpassword",
      })
      .expect(400);
  });

  it("Should not login a user if email is incorrect", async () => {
    await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrongemail@email.com",
        password: "MyPass777!",
      })
      .expect(400);
  });

  it("Should not login if no parameter is sent", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "",
        password: "",
      })
      .expect(200);
    const user = await User.findById(userOneId);
    expect(user.tokens.length).toBe(1);
  });

  it("Should get logout a user", async () => {
    await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });
});
