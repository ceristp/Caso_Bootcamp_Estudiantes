const Region = require("../models/region")
const Course = require("../models/cursos")

/* GET */
const getIndex = async (req, res) => {
   try {
      const regions = await Region.getRegions()
      const courses = await Course.getCourses()

      regions.sort((a, b) => {
         return a.codigo_region - b.codigo_region
      })
      courses.sort((a, b) => {
         return a.codigo_curso - b.codigo_curso
      })

      res.status(200).render("index", {
         regions,
         courses,
      })
   } catch (err) {
      console.error(`Error al obtener las colecciones de DATABASE:\n${err}`)
      res.status(500).send("Error al obtener el INDEX de renderización")
   }
}

/* exportacion de modulos */
module.exports = {
   getIndex,
}