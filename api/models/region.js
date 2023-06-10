const client = require("../config/database")

/* Consultas */
/* GET */
const getRegions = async () => {
   const queryConf = {
      text: "SELECT * FROM Region",
   }
   try {
      const regions = await client.query(queryConf)
      return regions.rows
   } catch (err) {
      console.error(`Error getting regions from DB:\n${err}`)
      throw err
   }
}

const getRegionByCode = async (id) => {
   const queryConf = {
      text: "SELECT * FROM Region WHERE codigo_region = $1",
      values: [id],
   }
   try {
      const region = await client.query(queryConf)
      return region.rows[0]
   } catch {
      console.error(`Error getting region by id from DB:\n${err}`)
      throw err
   }
}

/* exportacion de modulos */
module.exports = {
   getRegions,
   getRegionByCode,
}