const router = require("express").Router();
const cors = require("cors");
const auth = require("../middlewares/auth");
const { postValidator } = require("../validators/post-validator");
const PostController = require('../controllers/PostController');

router.use(cors());

router.use(
  cors({
    origin: "*",
  })
);

// Authentication Routes
router.post("/", auth, postValidator, PostController.newPost);
router.get("/", PostController.getPost);
router.put("/:id", auth, postValidator, PostController.editPost);
router.get("/:id", auth, PostController.getSpecificPost);
router.delete("/:id", auth, PostController.deletePost);

module.exports = router;