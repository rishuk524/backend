const express = require('express');
const router = express.Router();

const NoticeController = require("../Controller/NoticeController")
const jwtMiddleware = require("../Middleware/jwtMiddleware")


router.post("/save-Notice-Pettition", jwtMiddleware.jwtMiddleware,NoticeController.NoticepetitionSave)
router.put("/update-Notice-Pettiton/:id", jwtMiddleware.jwtMiddleware, NoticeController.NoticepetitionUpdate)
router.get("/get-all-Notice-pettitons1",jwtMiddleware.jwtMiddleware, NoticeController.getAllNoticePetitions)
router.get("/get-single-Notice-pettiton/:id",jwtMiddleware.jwtMiddleware, NoticeController. singleNoticePetition)

module.exports = router