const Student = require("../models/estudiante")

/* GET */
const getStudents = async (req, res) => {
   const { region, course } = req.query
   try {
      const students = await Student.getFilteredStudents(region, course)
      res.json(students)
   } catch (err) {
      console.error(`Error al obtener las colecciones de DATABASE:\n${err}`)
      res.status(500).send("Error al obtener el INDEX de estudiantes")
   }
}

/* exportacion de modulos */
module.exports = {
   getStudents,
}