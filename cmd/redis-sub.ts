import { registerTransport } from "../app/redis-sub/_index";
import { runRedisDriver } from "../internal/db/redis/driver";

export const runRedisTransport = async (): Promise<void> => {
    await runRedisDriver(String(process.env.RD_HOST), Number(process.env.RD_PORT));
    await registerTransport();
};
