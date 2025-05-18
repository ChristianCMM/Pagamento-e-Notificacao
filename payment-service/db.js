const { Pool } = require('pg')

const pool = new Pool({
  host: 'postgres',
  user: 'user',
  password: 'password',
  database: 'pagamentos'
})

async function insertTransacao(usuario, valor) {
  const res = await pool.query(
    'INSERT INTO transacoes (usuario, valor, status) VALUES ($1, $2, $3) RETURNING id',
    [usuario, valor, 'pendente']
  )
  return res.rows[0]
}

async function confirmarTransacao(id) {
  await pool.query('UPDATE transacoes SET status = $1 WHERE id = $2', ['confirmado', id])
}

module.exports = { insertTransacao, confirmarTransacao }
