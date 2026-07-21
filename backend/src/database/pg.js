const { Pool } = require("pg");
 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});
 
pool.on("error", (erro) => {
  console.error("Erro inesperado no pool do PostgreSQL:", erro.message);
});
 
module.exports = pool;