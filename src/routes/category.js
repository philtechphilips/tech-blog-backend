const router = require("express").Router();
const User = require("../models/User");
const cors = require("cors");
const auth = require("../middlewares/auth");
const { categoryValidator } = require("../validators/category-validator");
const CategoryController = require('../controllers/CategoryController');

router.use(cors());

router.use(
  cors({
    origin: "*",
  })
);

// Authentication Routes
router.post("/", auth, categoryValidator, CategoryController.newCategory);
router.get("/", CategoryController.getCategory);
router.put("/:id", auth, categoryValidator, CategoryController.editCategory);
router.get("/:id", auth, CategoryController.getSpecificCategory);
router.delete("/:id", auth, CategoryController.deleteCategory);

module.exports = router;