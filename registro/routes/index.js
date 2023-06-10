const express = require("express")
const indexCtrl = require("../controllers/index-controller")


const rutas = express.Router()

/* ROUTES */
rutas.route("/").get(indexCtrl.getIndex)

/* exportacion de modulos */
module.exports = rutas