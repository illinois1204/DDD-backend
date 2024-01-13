import { CommonRedisOptions, Redis } from "ioredis";

export let redis: Redis;

export const runRedisDriver = async (host: string, port: number, config?: CommonRedisOptions): Promise<void> => {
    redis = new Redis(port, host, { ...config, lazyConnect: true });
    await redis.connect();
    console.info("Redis connection has been verified");
};
