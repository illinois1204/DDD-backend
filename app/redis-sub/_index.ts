import { redis } from "../../internal/db/redis/driver";
import { saveData } from "./pullers/sensor.data";

enum CHANNELS {
    CH1 = "sensors-data"
}

function channelAllocator(channel: string, msg: string) {
    switch (channel) {
        case CHANNELS.CH1:
            saveData(msg).catch((ex) => console.error(ex));
            break;
    }
}

export const registerTransport = async (): Promise<void> => {
    const subInstance = redis.duplicate();
    await subInstance.subscribe(...Object.values(CHANNELS));
    subInstance.on("message", (channel, msg) => channelAllocator(channel, msg));
    console.info("Redis-Sub transport is running");
};
