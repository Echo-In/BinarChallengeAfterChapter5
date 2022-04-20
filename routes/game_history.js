const express = require("express");
const router = express.Router();
const gameHistory = require("../controllers/gameHistoryController");
const restrict = require("../middlewares/restrict")


router.get("/game/history", restrict, gameHistory.read);
// router.get("/game/history", gameHistory.read);
router.get("/game/history/add", restrict, gameHistory.create);
router.post("/game/history/create", restrict, gameHistory.post);
router.get("/game/history/edit/:id", restrict, gameHistory.edit);
router.post("/game/history/update", restrict, gameHistory.update);
router.get("/game/history/delete/:id", restrict, gameHistory.delete);


module.exports = router;