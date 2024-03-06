import { Redis } from "ioredis";
import { redis } from "../../../internal/db/redis/driver";
import { saveData } from "./sensor.data";

enum STREAMS {
    STREAM1 = "sensors-data"
}

function receiver(stream: string, messages: string[][], delegate: (req: string) => Promise<void>) {
    messages.forEach((i) => {
        const [id, data] = i as [string, string[]];
        // console.log("key1", data[0], "value1", data[1]);
        // console.log("key2", data[2], "value2", data[3]);
        delegate(data[1]).catch((ex) => console.error(ex));
        redis.xdel(stream, id);
    });
}

async function streamAllocator(stream: string, messages: string[][]) {
    switch (stream) {
        case STREAMS.STREAM1:
            receiver(stream, messages, saveData);
            break;
    }
}

export let streamRedis: Redis;

export const registerStreamTransport = async (): Promise<never> => {
    console.info("[Redis Stream] transport is running");

    const GROUP = String(process.env.RD_GROUP);
    const CONSUMER = String(process.env.RD_CONSUMER); // or hostname may be
    const MSG_LIMIT = 100;
    const BLOCK_TIMEOUT = 1000 * 60; // in ms or 0 - unlimited
    const streams = Object.values(STREAMS) as string[];
    streams.forEach(() => streams.push(">"));
    streamRedis = redis.duplicate();

    while (true) {
        // eslint-disable-next-line prettier/prettier
        const data = await streamRedis.xreadgroup("GROUP", GROUP, CONSUMER, "COUNT", MSG_LIMIT, "BLOCK", BLOCK_TIMEOUT, "NOACK", "STREAMS", ...streams);
        if (data == null) continue;
        const [stream, messages] = data[0] as [string, string[][]];
        streamAllocator(stream, messages);
    }
};
