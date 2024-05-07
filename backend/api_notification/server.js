import amqp from "amqplib";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3007;

const rabbitUrl = "amqp://localhost:5672";

app.listen(port, (err) => {
  if (err) {
    console.log("error listen to port", port);
  } else {
    console.log("service livre listen to port", port);
  }
});

async function consumeMessages() {
  try {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();
    const queue = "notification_queue";

    await channel.assertQueue(queue, { durable: true });
    console.log("Waiting for messages...");

    channel.consume(queue, (msg) => {
      const message = JSON.parse(msg.content.toString());
      console.log("Received message:", message);

      switch (message.eventType) {
        case "new_emprunt_added":
          handleNewEmpruntAdded(message.emprunt);
          break;
        case "emprunt_returned":
          handleEmpruntReturned(message.emprunt);
          break;
        case "new_livre_added":
          handleNewLivreAdded(message.livre);
        default:
          console.log("Unknown message type:", message.eventType);
      }

      channel.ack(msg);
    });
  } catch (error) {
    console.error(error);
  }
}

// Handler function for new emprunt added event
// function handleNewEmpruntAdded(emprunt) {
//   // Logic to send notification email to the client
//   console.log("Sending notification email for new emprunt:", emprunt);
// }

// function handleEmpruntReturned(emprunt) {
//   console.log("Sending notification email for returned emprunt:", emprunt);
// }

function handleNewLivreAdded(livre) {
  console.log("Sending notification email for new livre added:", livre);
}

consumeMessages();
