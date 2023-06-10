const express = require("express")
const exphbs = require("express-handlebars")
const indexRoute = require("./routes")
const studentRoute = require("./routes/rutas")
const path = require("path")


const PORT = process.env.PORT || 3000
const publicDir = path.join(__dirname, "public")
const app = express()


app.use(express.static(publicDir))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* carpeta views */
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

/* ROUTES */
app.use("/", indexRoute)
app.use("/students", studentRoute)

app.listen(PORT, () => console.log(`Servidor funcionando en el puerto http://localhost:${PORT}`))