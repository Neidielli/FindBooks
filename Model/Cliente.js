// import React from 'react';

class Cliente {
  constructor(id, nome, cpfCliente, dataNasc, email) {
    this.id = id;
    this.nome = nome;
    this.cpfCliente = cpfCliente; 
    this.dataNasc = dataNasc; 
    this.email = email; 
  }
}

module.exports = Cliente;