const amqp = require('amqplib')

async function connect() {
  const connection = await amqp.connect('amqp://guest:guest@rabbitmq')
  const channel = await connection.createChannel()
  return channel
}

module.exports = { connect }
