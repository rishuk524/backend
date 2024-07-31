const express = require('express');
const router = express.Router();

const PettitionController = require("../Controller/PettitionController")
const jwtMiddleware = require("../Middleware/jwtMiddleware")
const jwtMiddlewareTest = require("../Controller/JwtMiddlewareTest")

router.post("/savePettition", jwtMiddleware.jwtMiddleware, PettitionController.petitionSave)
router.put("/updatePettiton/:id", jwtMiddleware.jwtMiddleware, PettitionController.petitionUpdate )
router.get("/get-all-pettitons",jwtMiddleware.jwtMiddleware, PettitionController.getAllPetitions)
router.get("/get-single-pettiton/:id",jwtMiddleware.jwtMiddleware, PettitionController. singlePetition)

module.exports = router