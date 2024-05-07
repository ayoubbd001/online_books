async function sendMessage(message) {
  try {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();
    const queue = "notification_queue";

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    console.log("Message sent to RabbitMQ");
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

export default sendMessage;
