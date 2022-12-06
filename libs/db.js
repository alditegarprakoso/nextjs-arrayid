const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "", // Kalau credential di taruh di .env file
    database: "db_nextjs_arrayid",
  },
});

export default knex;
