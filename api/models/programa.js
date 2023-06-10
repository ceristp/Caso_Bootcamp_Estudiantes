const client = require("../config/database")

/* Consultas */
/* GET */
const getPrograms = async () => {
   const queryConf = {
      text: "SELECT * FROM Plan_Formativo",
   }
   try {
      const programs = await client.query(queryConf)
      return programs.rows
   } catch (err) {
      console.error(`Error getting programs from DB:\n${err}`)
      throw err
   }
}

const getProgramByCode = async (id) => {
   const queryConf = {
      text: "SELECT * FROM Plan_Formativo WHERE codigo_plan_formativo = $1",
      values: [id],
   }
   try {
      const program = await client.query(queryConf)
      return program.rows[0]
   } catch {
      console.error(`Error getting program by id from DB:\n${err}`)
      throw err
   }
}

/* exportacion de modulos */
module.exports = {
   getPrograms,
   getProgramByCode,
}