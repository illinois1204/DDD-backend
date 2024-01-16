import { Db, MongoClient } from "mongodb";

let noSqlDb: Db;
export let noSqlClient: MongoClient;

export const runNoSQLDriver = async (): Promise<void> => {
    noSqlClient = new MongoClient(String(process.env.MG_HOST), { auth: { username: process.env.MG_USER, password: process.env.MG_PASS } });
    await noSqlClient.connect();
    noSqlDb = noSqlClient.db(process.env.DB_NAME);
    console.info("[NoSQL] connection has been verified");
};

export const noSql = <T extends {}>(modelName: string) => noSqlDb.collection<T>(modelName);
