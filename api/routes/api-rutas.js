const express = require("express")
const apiCtrl = require("../controllers/api-controller")


const router = express.Router()

/* ROUTES */
router.route("/:resource").get(apiCtrl.getResource)
router.route("/:resource/:id").get(apiCtrl.getResourceByCode)

/* exportacion de modulos */
module.exports = router