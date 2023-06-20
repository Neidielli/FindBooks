// import React from 'react';

class Pedido {
  constructor(id, cliente, itemPedido, statusPedido, valorTotal) {
    this.id = id;
    this.cliente = cliente; // pegar do cliente
    this.itemPedido = itemPedido; // é um vetor de produto
    this.statusPedido = statusPedido; // processar no back
    this.valorTotal = valorTotal; // Processar no back
  }
}

module.exports = Pedido;
