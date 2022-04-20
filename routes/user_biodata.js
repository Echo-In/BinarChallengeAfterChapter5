const express = require("express");
const router = express.Router();
const userBio = require("../controllers/biodataController");
const restrict = require("../middlewares/restrict");


router.get("/profile", restrict, userBio.read);
router.get("/profile/add", restrict, userBio.create);
router.post("/profile/create", restrict, userBio.post);
router.get("/profile/edit/:id", restrict, userBio.edit);
router.post("/profile/update", restrict, userBio.update);
router.get("/profile/delete/:id", restrict, userBio.delete);


module.exports = router;