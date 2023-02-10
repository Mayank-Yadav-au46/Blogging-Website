const { Router } = require("express");
const {
  signup,
  login,
  logout,
  postBlog,
  getBlogs,
  privateBlog,
  get_email,
} = require("../controller/user_controller");

const router = new Router();

const { verify_token } = require("../middleware/auth_middleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/getBlogs", getBlogs);

router.use(verify_token);

router.get("/userpage/email", get_email);
router.post("/userpage/logut", logout);
router.post("/userpage/postBlog", postBlog);
router.get("/userpage/privateBlog", privateBlog);

module.exports = router;
