import { runNoSQLDriver } from "../internal/db/nosql/driver";
import { runRedisDriver } from "../internal/db/redis/driver";
import { runSQLDriver } from "../internal/db/sql/driver";
import { runAmqpTransport } from "./amqp";
import { runHttpServer } from "./http";
import { runRedisTransport } from "./redis";

void (async function () {
    await runSQLDriver();
    await runNoSQLDriver();
    // await runRedisDriver();
    // await runRedisTransport();
    // await runAmqpTransport();
    await runHttpServer();
    console.info("System is fully bootstrapped!");
})().catch((ex) => {
    console.error(ex.message);
    process.exit(1);
});
