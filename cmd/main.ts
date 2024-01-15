import { runRedisDriver } from "../internal/db/redis/driver";
import { runSQLDriver } from "../internal/db/sql/driver";
import { runAmqpTransport } from "./amqp";
import { runHttpServer } from "./http";
import { runRedisTransport } from "./redis";

void (async function () {
    await runSQLDriver();
    await runRedisDriver(String(process.env.RD_HOST), Number(process.env.RD_PORT), { db: Number(process.env.RD_DB || 0) });
    await runRedisTransport();
    await runAmqpTransport();
    await runHttpServer();
    console.info("System is fully bootstrapped!");
})().catch((ex) => {
    console.error(ex.message);
    process.exit(1);
});
