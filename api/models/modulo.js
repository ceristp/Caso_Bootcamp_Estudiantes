const client = require("../config/database.js")

/* Consultas */
/* GET */
const getModules = async () => {
   const queryConf = {
      text: "SELECT * FROM Modulo",
   }
   try {
      const modules = await client.query(queryConf)
      return modules.rows
   } catch (err) {
      console.error(`Error getting modules from DB:\n${err}`)
      throw err
   }
}

const getModuleByCode = async (id) => {
   const queryConf = {
      text: "SELECT * FROM Modulo WHERE codigo_modulo = $1",
      values: [id],
   }
   try {
      const module = await client.query(queryConf)
      return module.rows[0]
   } catch {
      console.error(`Error getting module by id from DB:\n${err}`)
      throw err
   }
}

/* exportacion de modulos */
module.exports = {
   getModules,
   getModuleByCode,
}