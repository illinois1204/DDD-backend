import { runSQLDriver } from "../internal/db/sql/driver";
import { runHttpServer } from "./http";

void (async function () {
    // await runRedisDriver(String(process.env.RD_HOST), Number(process.env.RD_PORT));
    await runSQLDriver();
    await runHttpServer();
    console.info("System is fully bootstrapped!");
})().catch((ex) => {
    console.error(ex.message);
    process.exit(1);
});
