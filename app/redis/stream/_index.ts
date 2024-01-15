import { redis } from "../../../internal/db/redis/driver";

export const registerStreamTransport = async (): Promise<never> => {
    console.info("Redis Stream transport is running");

    const GROUP = "test";
    const CONSUMER = String(process.env.RD_CONSUMER); // or hostname may be
    const MSG_LIMIT = 100;
    const BLOCK_TIMEOUT = 1000 * 60; // in ms

    while (true) {
        const data = await redis.xreadgroup(
            "GROUP",
            GROUP,
            CONSUMER,
            "COUNT",
            MSG_LIMIT,
            "BLOCK",
            BLOCK_TIMEOUT,
            "NOACK",
            "STREAMS",
            "stream-1",
            // "stream-2",
            // ">",
            ">"
        );
        if (data == null) continue;
        const [stream, messages] = data[0] as [string, any[]];
        console.log(stream);
        // console.log(messages);
        msgHandler(stream, messages);
    }
};

async function msgHandler(stream: string, messages: any[]) {
    messages.forEach((i) => {
        const [id, data] = i as [string, string[]];
        console.log(id, data);
        console.log("key1", data[0], "value1", data[1]);
        console.log("key2", data[2], "value2", data[3]);
        // redis.xdel(stream, id);
    });
}
