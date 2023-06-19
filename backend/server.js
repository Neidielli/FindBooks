const express = require('express');
const { LocalStorage } = require('node-localstorage');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulação de banco de dados em memória
const localStorage = new LocalStorage('./localStorage');
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Rota para obter todos os pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Rota para obter todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Rota para adicionar um novo pedido
app.post('/pedidos', (req, res) => {
  const pedido = req.body;
  pedido.id = pedidos.length + 1;
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  res.status(201).json(pedido);
});

// Rota para atualizar um pedido existente
app.put('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);
  const pedidoAtualizado = req.body;
  const pedidoIndex = pedidos.findIndex((pedido) => pedido.id === pedidoId);
  if (pedidoIndex !== -1) {
    pedidos[pedidoIndex] = { ...pedidos[pedidoIndex], ...pedidoAtualizado };
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    res.status(200).json(pedidos[pedidoIndex]);
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' });
  }
});

// Rota para excluir um pedido existente
app.delete('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);
  pedidos = pedidos.filter((pedido) => pedido.id !== pedidoId);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  res.status(200).json({ message: 'Pedido excluído com sucesso' });
});

// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const produto = req.body;
  produto.id = produtos.length + 1;
  produtos.push(produto);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  res.status(201).json(produto);
});

// Rota para atualizar um produto existente
app.put('/produtos/:id', (req, res) => {
  const produtoId = parseInt(req.params.id);
  const produtoAtualizado = req.body;
  const produtoIndex = produtos.findIndex((produto) => produto.id === produtoId);
  if (produtoIndex !== -1) {
    produtos[produtoIndex] = { ...produtos[produtoIndex], ...produtoAtualizado };
    localStorage.setItem('produtos', JSON.stringify(produtos));
    res.status(200).json(produtos[produtoIndex]);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Rota para excluir um produto existente
app.delete('/produtos/:id', (req, res) => {
  const produtoId = parseInt(req.params.id);
  produtos = produtos.filter((produto) => produto.id !== produtoId);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  res.status(200).json({ message: 'Produto excluído com sucesso' });
});


app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});


