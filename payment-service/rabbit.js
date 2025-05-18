const amqp = require('amqplib')
let channel

async function connect() {
  const connection = await amqp.connect('amqp://guest:guest@rabbitmq')
  channel = await connection.createChannel()
}

async function publish(queue, msg) {
  if (!channel) await connect()
  await channel.assertQueue(queue)
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)))
}

module.exports = { publish }
