const router = require("express").Router();
const cors = require("cors");
const auth = require("../middlewares/auth");
const { commentValidator } = require("../validators/comment-validator");
const CommentController = require('../controllers/CommentController');

router.use(cors());

router.use(
  cors({
    origin: "*",
  })
);

// Authentication Routes
router.post("/", auth, commentValidator, CommentController.createComment);
router.get("/:id", CommentController.getComment);

module.exports = router;