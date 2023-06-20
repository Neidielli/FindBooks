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

// Rota para obter todos os produtos
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

// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const produtoData = req.body;
  const produto = new Produto(produtoData.id, produtoData.titulo, produtoData.genero, produtoData.autor, produtoData.preco);
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
    const produto = produtos[produtoIndex];
    produto.titulo = produtoAtualizado.titulo || produto.titulo;
    produto.genero = produtoAtualizado.genero || produto.genero;
    produto.autor = produtoAtualizado.autor || produto.autor;
    produto.preco = produtoAtualizado.preco || produto.preco;
    localStorage.setItem('produtos', JSON.stringify(produtos));
    res.status(200).json(produto);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Rota para excluir um produto existente
app.delete('/produtos/:id', (req, res) => {
  const produtoId = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex((produto) => produto.id === produtoId);
  if (produtoIndex !== -1) {
    produtos.splice(produtoIndex, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});


app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
