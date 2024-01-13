import { Knex, knex } from "knex";
import Config from "./config";

export let sql: Knex;

export const runSQLDriver = async (): Promise<void> => {
    sql = knex(Config);
    await (sql.client as Knex.Client).releaseConnection(await (sql.client as Knex.Client).acquireConnection());
    console.info("SQL connection has been verified");
};
