const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const restrict = require("../middlewares/restrict")


router.get("/user", restrict, userCtrl.read);
router.get("/user/add", restrict, userCtrl.create);
router.post("/user/create", restrict, userCtrl.post);
router.get("/user/edit/:id", restrict, userCtrl.edit);
router.post("/user/update", restrict, userCtrl.update);
router.get("/user/delete/:id", restrict, userCtrl.delete);


module.exports = router;