const request = require("supertest");
const app = require("../src/app");
const Post = require("../src/models/Post");
const {
  userOne,
  userOneId,
  postOne,
  postId,
  setupDatabase,
} = require("./fixtures/db");

beforeEach(async () => {
  await setupDatabase();
}, 20000);

describe("Post API Test", () => {
  it("Should create a new post", async () => {
    const response = await request(app)
      .post("/api/post")
      .send({
        title: "Post 1",
        description: "Post Description 1",
        author: userOneId,
        categories: "Post Category 1",
      })
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);
    expect(response.body.title).not.toBeNull();
  });

  it("Should not create a new post if not authenticated", async () => {
    const response = await request(app)
      .post("/api/post")
      .send({
        title: "Post 1",
        description: "Post Description 1",
        author: userOneId,
        categories: "Post Category 1",
      })
      .expect(401);
  });

  it("Should not create a new post if the field is empty", async () => {
    const response = await request(app)
      .post("/api/post")
      .send({
        title: "",
        description: "",
        author: "",
        categories: "",
      })
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);

    const post = await Post.findById(response.body._id);
    expect(post).toBeNull();
  });

  it("Should get post", async () => {
    const response = await request(app).get("/api/post").send().expect(200);

    expect(response).not.toBeNull();
  });

  it("Should get a specific post", async () => {
    const response = await request(app)
      .get(`/api/post/${postId}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    expect(response).not.toBeNull();
  });

  it("Should update a post", async () => {
    const response = await request(app)
      .put(`/api/post/${postId}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        title: "Updated Post",
        description: "Updated Post Description",
      })
      .expect(200);
  });

  it("Should delete a post", async () => {
    const response = await request(app)
      .delete(`/api/post/${postId}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    const post = await Post.findById(postId);
    expect(post).toBeNull();
  });
});
