const express = require("express");
const router = express.Router();
const loginUser = require("../controllers/loginController");
const restrict = require("../middlewares/restrict");
// const apiRestrict = require("../middlewares/apiRestrict");


router.get("/", (req, res) => res.render("login",  {error: '',}) );
router.get("/loginhistory", restrict, loginUser.read);
router.get("/register", (req, res) => res.render("login/register",  {error: '',}) );
router.post("/register", loginUser.signup);
router.post("/login", loginUser.login);
router.get("/logout", loginUser.logout);

module.exports = router;