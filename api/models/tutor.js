const client = require("../config/database")

/* consultas */
/* GET */
const getTutors = async () => {
   const queryConf = {
      text: "SELECT * FROM Tutor",
   }
   try {
      const tutors = await client.query(queryConf)
      return tutors.rows
   } catch (err) {
      console.error(`Error getting tutors from DB:\n${err}`)
      throw err
   }
}

const getTutorByCode = async (id) => {
   const queryConf = {
      text: "SELECT * FROM Tutor WHERE codigo_tutor = $1",
      values: [id],
   }
   try {
      const tutor = await client.query(queryConf)
      return tutor.rows[0]
   } catch {
      console.error(`Error getting tutor by id from DB:\n${err}`)
      throw err
   }
}

/* exportacion de modulos */
module.exports = {
   getTutors,
   getTutorByCode,
}