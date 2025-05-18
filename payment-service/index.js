const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const rabbit = require('./rabbit')

const app = express()
app.use(bodyParser.json())

app.post('/pagamento', async (req, res) => {
  const { usuario, valor } = req.body

  // 1. Insere no banco com status "pendente"
  const result = await db.insertTransacao(usuario, valor)

  // 2. Publica evento de recebimento
  await rabbit.publish('pagamento.recebido', {
    id: result.id,
    usuario,
    valor
  })

  // Simula confirmação
  setTimeout(async () => {
    await db.confirmarTransacao(result.id)
    await rabbit.publish('pagamento.confirmado', {
      id: result.id,
      usuario,
      valor
    })
  }, 3000)

  res.send({ status: 'pendente', id: result.id })
})

app.listen(3000, () => console.log('Payment Service na porta 3000'))
