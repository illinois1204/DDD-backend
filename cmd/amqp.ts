import amqpTransport from "amqplib";

export let amqp: amqpTransport.Channel;

export const runAmqpTransport = async () => {
    const connection = await amqpTransport.connect({
        hostname: process.env.AMQP_HOST,
        port: Number(process.env.AMQP_PORT)
        // username: process.env.AMQP_USER,
        // password: process.env.AMQP_PASS
    });
    amqp = await connection.createChannel();
};
