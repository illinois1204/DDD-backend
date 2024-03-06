import { Redis } from "ioredis";
import { redis } from "../../../internal/db/redis/driver";
import { saveData } from "./sensor.data";

enum CHANNELS {
    CH1 = "sensors-data"
}

function channelBus(channel: string, msg: string) {
    switch (channel) {
        case CHANNELS.CH1:
            saveData(msg).catch((ex) => console.error(ex));
            break;
    }
}

export let subRedis: Redis;

export const registerSubTransport = async (): Promise<void> => {
    subRedis = redis.duplicate();
    await subRedis.subscribe(...Object.values(CHANNELS));
    subRedis.on("message", (channel, msg) => channelBus(channel, msg));
    console.info("[Redis Sub] transport is running");
};
