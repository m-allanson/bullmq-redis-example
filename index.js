import Redis from "ioredis";
import { Queue, QueueEvents } from "bullmq";

const REDIS_URL = process.env.REDIS_URL;
const redis = new Redis(REDIS_URL);

while (redis.status === "connecting") {
  await sleep(100);
}

console.log("redis is: ", redis.status);

const queueName = "foo";
const jobQueue = new Queue(queueName, { connection: redis });

// This will throw errors
// const queueEvents = new QueueEvents(queueName);

// Instead, provide a connection to use the options from your existing ioredis instance
const queueEvents = new QueueEvents(queueName, { connection: redis });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}