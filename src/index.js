const express = require("express");
const crypto = require("crypto");
const app = express();

const PORT = 3000;

app.use(express.json());

const users = [{
  id: crypto.randomUUID(),
  name: "Keven",
  city: "Recife",
}];

app.get("/api/user", (request, response) => {
  response.send({ data: users });
});

app.get("/api/user/:id", (request, response) => {
  const { id } = request.params;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return response.status(404).send({
      message: 'User not found'
    });
  }

  return response.send({
    data: users[userIndex]
  });
});

app.post("/api/user", (request, response) => {
  const { name, city } = request.body;

  if (typeof name !== 'string' || typeof city !== 'string') {
    return response.status(400).send({
      message: 'Invalid params'
    });
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    city,
  };
  users.push(user);
  return response.send({
    message: "Usuário criado!",
    data: user
  });
});

// Fazer lógica de Update, recebendo parâmetro de usuário e o body
// Buscando o usuário e atualizando o mesmo

app.patch('/api/user/:id', (request, response) => {
  const { id } = request.params;
  let { name, city } = request.body;

  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return response.status(404).send({
      message: 'User not found'
    });
  }

  let user = users[userIndex];
  if (typeof name === 'string') {
    user.name = name;
  }

  if (typeof city === 'string') {
    user.city = city;
  }

  users[userIndex] = user;
  return response.status(200).send({
    message: 'Resource updated successfully',
    data: user
  });
})

// Fazer lógica de Delete, recebendo o parâmetro do usuário (ID) e removendo o da lista
// Se der certo retornar um objeto com mensagem sucesso!

app.delete('/api/user/:id', (request, response) => {
  const { id } = request.params;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return response.status(404).send({
      message: 'User not found'
    });
  }
  users.splice(userIndex, 1);
  return response.status(200).send({
    message: 'User deleted'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});