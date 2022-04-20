const express = require("express");
const router = express.Router();
const userAPI = require("../controllers/userAPIController");
const apiRestrict = require("../middlewares/apiRestrict")

router.get("/api/v1/user", apiRestrict, userAPI.read);
router.post("/api/v1/user/add", apiRestrict, userAPI.create);
router.put("/api/v1/user/update/:id", apiRestrict, userAPI.update);
router.delete("/api/v1/user/delete", apiRestrict, userAPI.delete);
router.post("/api/v1/user/login", userAPI.login);

module.exports = router;