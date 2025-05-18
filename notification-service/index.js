const { connect } = require('./rabbit')
async function start() {
  const ch = await connect()

  await ch.assertQueue('pagamento.recebido')
  await ch.assertQueue('pagamento.confirmado')

  ch.consume('pagamento.recebido', msg => {
    const data = JSON.parse(msg.content.toString())
    console.log(`📩 Notificação recebida: ${data.usuario} - R$${data.valor}`)
    ch.ack(msg)
  })

  ch.consume('pagamento.confirmado', msg => {
    const data = JSON.parse(msg.content.toString())
    console.log(`✅ Pagamento confirmado: ${data.usuario} - R$${data.valor}`)
    ch.ack(msg)
  })
}