import { ConsumeMessage, Options } from "amqplib";

export interface AmqpRequest extends Omit<ConsumeMessage, "content"> {
    content: string;
}

export const option: Options.Consume = { noAck: true };
