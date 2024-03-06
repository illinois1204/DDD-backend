import { registerEventListTransport } from "../app/redis/event/_index";
import { registerStreamTransport } from "../app/redis/stream/_index";
import { registerSubTransport } from "../app/redis/sub/_index";

export const runRedisTransport = async (): Promise<void> => {
    await registerSubTransport();
    registerStreamTransport();
    registerEventListTransport();
};
