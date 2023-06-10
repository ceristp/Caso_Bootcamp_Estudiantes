const { Pool } = require("pg")
require("dotenv").config()


const pool = new Pool()

pool.on("error", (err) => {
   console.error(`Unexpected error on idle client`, err)
   process.exit(-1)
})
pool.on("connect", () => {
   console.log("connected to the database!")
})

/* metodos - estructura de consultas */
const query = async (queryConf) => {
   const client = await pool.connect()
   try {
      const res = await client.query(queryConf)
      return res
   } finally {
      client.release()
   }
}

/* exportacion de modulos */
module.exports = {
   query,
}
