const client = require("../config/database")

/* GET */
const getCourses = async () => {
   const queryConf = {
      text: "SELECT * FROM Curso",
   }
   try {
      const courses = await client.query(queryConf)
      return courses.rows
   } catch (err) {
      console.error(`Error al obtener los cursos de la base de datos:\n${err}`)
      throw err
   }
}

/* exportacion de modulos */
module.exports = {
   getCourses,
}