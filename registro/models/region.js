const client = require("../config/database")

/* GET */
const getRegions = async () => {
   const queryConf = {
      text: "SELECT * FROM Region",
   }
   try {
      const regions = await client.query(queryConf)
      return regions.rows
   } catch (err) {
      console.error(`Error al obtener regiones de la base de datos:\n${err}`)
      throw err
   }
}

/* exportacion de modulos */
module.exports = {
   getRegions,
}