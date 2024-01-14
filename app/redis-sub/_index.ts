import { redis } from "../../internal/db/redis/driver";
import { subscriberExample } from "./pullers/subcriber-1";

enum CHANNELS {
    CH1 = "CH1"
}

function channelAllocator(channel: string, msg: string) {
    switch (channel) {
        case CHANNELS.CH1:
            subscriberExample(msg).catch((ex) => console.error(ex));
            break;
    }
}

export const registerTransport = async (): Promise<void> => {
    const subInstance = redis.duplicate();
    await subInstance.subscribe(...Object.values(CHANNELS));
    subInstance.on("message", (channel, msg) => channelAllocator(channel, msg));
    console.info("Redis-Sub transport is running");
};
