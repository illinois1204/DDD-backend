import { CommonRedisOptions, Redis } from "ioredis";

export let redis: Redis;

export const runRedisDriver = async (): Promise<void> => {
    const config: CommonRedisOptions = {
        username: process.env.RD_USER || "default",
        password: process.env.RD_USER,
        db: Number(process.env.RD_DB || 0),
        lazyConnect: true
    };
    redis = new Redis(Number(process.env.RD_PORT), String(process.env.RD_HOST), config);
    await redis.connect();
    console.info("Redis connection has been verified");
};
