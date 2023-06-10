const client = require("../config/database")

/* consultas */
/* GET */
const getCourses = async () => {
   const queryConf = {
      text: "SELECT * FROM Curso",
   }
   try {
      const courses = await client.query(queryConf)
      return courses.rows
   } catch (err) {
      console.error(`Error getting courses from DB:\n${err}`)
      throw err
   }
}

const getCourseByCode = async (id) => {
   const queryConf = {
      text: "SELECT * FROM Curso WHERE codigo_curso = $1",
      values: [id],
   }
   try {
      const course = await client.query(queryConf)
      return course.rows[0]
   } catch {
      console.error(`Error getting course by id from DB:\n${err}`)
      throw err
   }
}

/* exportacion de modulos */
module.exports = {
   getCourses,
   getCourseByCode,
}