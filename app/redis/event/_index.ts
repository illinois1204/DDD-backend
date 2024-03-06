import { Redis } from "ioredis";
import { redis } from "../../../internal/db/redis/driver";
import { saveData } from "./sensor.data";

enum EVENTS {
    EVENT1 = "ev1"
}

function eventBus(event: string, msg: string) {
    switch (event) {
        case EVENTS.EVENT1:
            saveData(msg).catch((ex) => console.error(ex));
            break;
    }
}

export let eventRedis: Redis;

export const registerEventListTransport = async (): Promise<never> => {
    eventRedis = redis.duplicate();
    const BLOCK_TIMEOUT = 60; // in seconds or 0 - unlimited
    console.info("[Redis EventList] transport is running");

    while (true) {
        const data = await eventRedis.blpop(...Object.values(EVENTS), BLOCK_TIMEOUT);
        if (data == null) continue;
        const [event, message] = data;
        eventBus(event, message);
    }
};
