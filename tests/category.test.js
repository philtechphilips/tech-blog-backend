const request = require("supertest");
const app = require("../src/app");
const Category = require("../src/models/Category");
const { userOne, userOneId, categoryOne, categoryId, setupDatabase } = require("./fixtures/db");

beforeEach(async () => {
  await setupDatabase();
}, 20000);

describe("Category API Test", () => {
  test("Should create a new category", async () => {
    const response = await request(app)
      .post("/api/category")
      .send({
        name: "New category",
      })
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);
    expect(response.body.category).not.toBeNull();
  });


  test("Should not create a new category if not authenticated", async () => {
    const response = await request(app)
      .post("/api/category")
      .send({
        name: "New category",
      })
      .expect(401);
  });


  test("Should not create a new category if the name is empty", async () => {
    const response = await request(app)
      .post("/api/category")
      .send({
        name: "",
      })
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);

    const category = await Category.findById(response.body._id);
    expect(category).toBeNull();
  });


  test("Should get category", async () => {
    const response = await request(app).get("/api/category").send().expect(200);

    expect(response).not.toBeNull();
  });


  test("Should get a specific category", async () => {
    const response = await request(app)
    .get(`/api/category/${categoryId}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    expect(response).not.toBeNull();
  });


  test("Should update a category", async () => {
    const response = await request(app)
    .put(`/api/category/${categoryId}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "Updated Category"
    })
    .expect(200);

    const category = await Category.findById(categoryId);
    expect(category.name).toEqual("Updated Category");
  });


  test("Should delete a category", async () => {
    const response = await request(app)
    .delete(`/api/category/${categoryId}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    const category = await Category.findById(categoryId);
    expect(category).toBeNull();
  });

 

});
