const request = require("supertest");
const app = require("../src/app");
const Category = require("../src/models/Category");
const { userOne, userOneId, postId, postOne,  setupDatabase } = require("./fixtures/db");
const mongoose = require("mongoose");

beforeEach(async () => {
  await setupDatabase();
}, 20000);

describe("Category API Test", () => {
  test("Should create a new comment", async () => {
    const response = await request(app)
      .post("/api/comment")
      .send({
        username: userOne.username,
        comment: "Post Comment",
        postId:  postId
      })
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);
    expect(response.body.comment).not.toBeNull();
  });


  test("Should get all comment for  particular post", async () => {
    const response = await request(app)
      .get(`/api/comment/${postId}`)
      .send()
      .expect(200);
  });


});
