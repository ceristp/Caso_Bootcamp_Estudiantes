const express = require("express")
const studentCtrl = require("../controllers/student-controller")


const rutas = express.Router()

/* ROUTES */
rutas.route("/").get(studentCtrl.getStudents)

/* exportacion de modulos */
module.exports = rutas
