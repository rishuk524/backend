const express = require('express');
const router = express.Router();

const PettitionController = require("../Controller/PettitionController")

router.post("/savePettition", PettitionController.pettitonSave)
router.put("/updatePettiton/:id" ,PettitionController.pettitionUpdate )
router.get("/get-all-pettitons", PettitionController.getAllPettition)
router.get("/get-single-pettiton/:id", PettitionController.singlePettiton)

module.exports = router