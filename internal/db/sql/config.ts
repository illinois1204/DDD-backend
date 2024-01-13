import { Knex } from "knex";

const Config: Knex.Config = {
    client: "pg",
    connection: {
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT || 5432),
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.DB_NAME
    },
    migrations: {
        tableName: "changeLog"
    }
};

export default Config;
module.exports = Config;
