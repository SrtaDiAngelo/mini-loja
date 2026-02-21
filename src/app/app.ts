import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  // 1. ESTADOS DA LOJA
  carrinho: any[] = [];
  mensagemSucesso: string = '';
  finalizando: boolean = false; 
  logado: boolean = false;
  exibirLogin: boolean = true;
  historicoPedidos: any[] = [];
  exibirHistorico: boolean = false;
  emailDigitado: string = '';
  senhaDigitada: string = '';

  // 2. LISTA DE PRODUTOS
  produtos = [
    { 
      nome: 'Camiseta', 
      preco: 59.90, 
      categoria: 'camisetas',
      imagem: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCRx5uMYImmmwAZp8od93uVAjf2LcQDq9Ah87ibzu2j3M5dEnFW1t6qa6iFL8_RHqI3I5-uHhwTlqLCrFMkQEqplH3gCYqN3FCB8utKaCgDZuS2l6dnpd6kQ' 
    },
    { 
      nome: 'Tênis', 
      preco: 199.90, 
      categoria: 'calcados',
      imagem: 'https://m.media-amazon.com/images/I/71rz8m5QbHL._AC_SX500_.jpg'
    },
    { 
      nome: 'Boné', 
      preco: 39.90, 
      categoria: 'acessorios',
      imagem: 'https://mvck.com.br/cdn/shop/files/DSC00623-Editar_540x.jpg?v=1755869370' 
    }
  ];

  produtosFiltrados: any[] = [...this.produtos];

  // 3. FUNÇÕES DE FILTRO E CARRINHO
  filtrar(tipo: string) {
    if (tipo === 'todos') {
      this.produtosFiltrados = this.produtos;
    } else {
      this.produtosFiltrados = this.produtos.filter(p => p.categoria === tipo);
    }
  }

  get total(): number {
    return this.carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  }

  adicionar(produto: any) {
    const itemExistente = this.carrinho.find(item => item.nome === produto.nome);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.carrinho.push({ ...produto, quantidade: 1 });
    }
    this.mensagemSucesso = `${produto.nome} adicionado! ✅`;
    setTimeout(() => this.mensagemSucesso = '', 1500); 
  }


  confirmarPagamento(metodo: string) {
    const novoPedido = {
      data: new Date().toLocaleString(),
      itens: [...this.carrinho],
      valorTotal: this.total,
      formaPagamento: metodo 
    };

    this.historicoPedidos.unshift(novoPedido);
    
    alert(`Compra no ${metodo} confirmada! 🎉`);
    
    this.carrinho = [];
    this.finalizando = false;
  }

  irParaPagamento() { this.finalizando = true; }
  voltarParaCarrinho() { this.finalizando = false; }
  
 
  verMeusPedidos() { 
    this.exibirHistorico = true; 
  }
  voltarParaLoja() { 
    this.exibirHistorico = false; 
  }

  fazerLogin() {
    if (this.emailDigitado === 'li@loja.com' && this.senhaDigitada === '123456') {
      this.logado = true;
      this.exibirLogin = false;
    } else {
      alert('Dados incorretos!');
    }
  }

  logout() {
    this.logado = false;
    this.exibirLogin = true;
    this.exibirHistorico = false;
  }
}