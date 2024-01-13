import { ConsumeMessage } from "amqplib";
import { amqp } from "../../cmd/amqp";
import { saveData } from "./pullers/sensor.data";
import { AmqpRequest, option } from "./settings";

function receiver(delegate: (req: AmqpRequest) => Promise<void>) {
    return (msg: ConsumeMessage | null) => {
        if (msg) delegate({ ...msg, content: msg.content.toString() }).catch((ex) => console.error(ex));
    };
}

async function syncQueues() {
    await amqp.assertQueue("sensors-data");
}

export const registerTransport = async (withSyncQueues = true): Promise<void> => {
    if (withSyncQueues == true) await syncQueues();
    amqp.consume("sensors-data", receiver(saveData), option);
};
