
# 💳 Microsserviços de Pagamento e Notificação

Este projeto implementa um sistema de **pagamento com notificação assíncrona** baseado em **microsserviços com Node.js**, usando **RabbitMQ** para mensageria, **PostgreSQL** como banco de dados e orquestração com **Docker Compose**.

---

## 🧰 Tecnologias Utilizadas

- Node.js + Express
- PostgreSQL
- RabbitMQ
- Docker e Docker Compose

---

## 📂 Estrutura dos Serviços

| Serviço               | Descrição                                                                 |
|------------------------|---------------------------------------------------------------------------|
| `payment-service`      | API REST que processa transações, grava no banco e publica mensagens via RabbitMQ |
| `notification-service` | Serviço que escuta mensagens do RabbitMQ e simula envio de notificações   |
| `postgres`             | Banco de dados relacional que armazena os pagamentos                     |
| `rabbitmq`             | Broker de mensagens para comunicação assíncrona entre os serviços         |

---

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/chrisitancmm/Projeto-pagamento.git
cd Projeto-pagamento
```

### 2. Suba os serviços com Docker Compose

```bash
docker compose up --build
```

Aguarde até todos os serviços estarem prontos. O terminal mostrará logs dos serviços sendo executados.

### 3. Crie a tabela no banco PostgreSQL

Acesse o banco com um cliente (DBeaver, pgAdmin, etc.) ou terminal e conecte-se:

- **Host:** `localhost`
- **Porta:** `5432`
- **Banco:** `pagamentos`
- **Usuário:** `user`
- **Senha:** `password`

Execute o SQL abaixo:

```sql
CREATE TABLE transacoes (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(100),
  valor NUMERIC,
  status VARCHAR(20)
);
```

---

## 📮 Testando o Pagamento

### Envio da requisição:

```bash
curl -X POST http://localhost:3000/pagamento \
  -H "Content-Type: application/json" \
  -d '{"usuario": "joao@email.com", "valor": 150.00}'
```

### Resposta esperada:

```json
{
  "status": "pendente",
  "id": 1
}
```

---

## 🔄 Fluxo de Funcionamento

1. O usuário envia uma solicitação de pagamento
2. O serviço de pagamento:
   - Armazena a transação no banco com status `pendente`
   - Publica uma mensagem `pagamento.recebido`
3. O serviço de notificação:
   - Recebe e exibe a notificação de recebimento
4. Após 3 segundos:
   - O pagamento é confirmado
   - Uma nova mensagem `pagamento.confirmado` é publicada
   - O serviço de notificação exibe a confirmação

---

## 🔎 Acessos Úteis

- **RabbitMQ UI:** [http://localhost:15672](http://localhost:15672)  
  - Usuário: `guest`  
  - Senha: `guest`

- **API de Pagamento:** `http://localhost:3000/pagamento`

---

## ✅ Requisitos

- Docker e Docker Compose instalados
- Portas `5432`, `5672`, `15672` e `3000` liberadas localmente

---

## 📌 Observações

- Este projeto foi desenvolvido com fins educacionais, utilizando arquitetura de microsserviços e comunicação assíncrona.
- A entrega de notificações é simulada com logs no terminal do `notification-service`.

---

## 🧑‍💻 Autor

Christian Mattos Moreira – [@ChristianCMM](https://github.com/christiancmm)
Guilherme Nardi Matos - [@GuiNardiSS](https://github.com/GuiNardiSS)