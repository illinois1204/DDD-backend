import { runSQLDriver } from "../internal/db/sql/driver";
import { runAmqpTransport } from "./amqp";
import { runHttpServer } from "./http";
import { runRedisTransport } from "./redis-sub";

void (async function () {
    await runSQLDriver();
    await runRedisTransport();
    await runAmqpTransport();
    await runHttpServer();
    console.info("System is fully bootstrapped!");
})().catch((ex) => {
    console.error(ex.message);
    process.exit(1);
});
