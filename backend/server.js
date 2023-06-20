const express = require('express');
const { LocalStorage } = require('node-localstorage');
const app = express();
const port = 3000;

const Pedido = require('../Model/pedido');
const Produto = require('../Model/Produto.js');

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

// Rota para obter todos os produtos - LISTAR
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Rota para adicionar um novo pedido
app.post('/pedidos', (req, res) => {
  const pedidoData = req.body;
  const pedido = new Pedido(pedidoData.id, pedidoData.cliente, pedidoData.produto, pedidoData.quantidade);
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
    const pedido = pedidos[pedidoIndex];
    pedido.cliente = pedidoAtualizado.cliente || pedido.cliente;
    pedido.produto = pedidoAtualizado.produto || pedido.produto;
    pedido.quantidade = pedidoAtualizado.quantidade || pedido.quantidade;
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    res.status(200).json(pedido);
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' });
  }
});

// Rota para excluir um pedido existente
app.delete('/pedidos/:id', (req, res) => {
  const pedidoId = parseInt(req.params.id);
  const pedidoIndex = pedidos.findIndex((pedido) => pedido.id === pedidoId);
  if (pedidoIndex !== -1) {
    pedidos.splice(pedidoIndex, 1);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    res.status(200).json({ message: 'Pedido excluído com sucesso' });
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' });
  }
});


app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
