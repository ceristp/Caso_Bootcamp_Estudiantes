const { Pool } = require("pg")
require("dotenv").config()


const pool = new Pool()

/* error */
pool.on("error", (err) => {
   console.error(`Unexpected error on idle client`, err)
   process.exit(-1)
})

/* conectado */
pool.on("connect", () => {
   console.log("connected to the database!")
})


/* metodos */
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