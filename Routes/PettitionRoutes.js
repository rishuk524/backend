const express = require('express');
const router = express.Router();

const PettitionController = require("../Controller/PettitionController")
const jwtMiddleware = require("../Middleware/jwtMiddleware")
const jwtMiddlewareTest = require("../Controller/JwtMiddlewareTest")

router.post("/savePettition", jwtMiddleware.jwtMiddleware, PettitionController.pettitonSave)
router.put("/updatePettiton/:id", PettitionController.pettitionUpdate )
router.get("/get-all-pettitons",jwtMiddleware.jwtMiddleware, PettitionController.getAllPettition)
router.get("/get-single-pettiton/:id",jwtMiddleware.jwtMiddleware, PettitionController.singlePettiton)

module.exports = router