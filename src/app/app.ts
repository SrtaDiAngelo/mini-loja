import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  carrinho: any[] = [];
  mensagemSucesso: string = '';
  finalizando: boolean = false; 

  produtos = [
    { 
      nome: 'Camiseta', 
      preco: 59.90, 
      imagem: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCRx5uMYImmmwAZp8od93uVAjf2LcQDq9Ah87ibzu2j3M5dEnFW1t6qa6iFL8_RHqI3I5-uHhwTlqLCrFMkQEqplH3gCYqN3FCB8utKaCgDZuS2l6dnpd6kQ' 
    },
    { 
      nome: 'Tênis', 
      preco: 199.90, 
      imagem: 'https://m.media-amazon.com/images/I/71rz8m5QbHL._AC_SX500_.jpg'
    },
    { 
      nome: 'Boné', 
      preco: 39.90, 
      imagem: 'https://mvck.com.br/cdn/shop/files/DSC00623-Editar_540x.jpg?v=1755869370' 
    }
  ];

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
    
    setTimeout(() => {
      this.mensagemSucesso = '';
    }, 1500); 
  }

  removerUm(item: any) {
    if (item.quantidade > 1) {
      item.quantidade--;
    } else {
      this.carrinho = this.carrinho.filter(c => c.nome !== item.nome);
    }
  }

  limparCarrinho() {
    this.carrinho = [];
    this.mensagemSucesso = '';
    this.finalizando = false;
  }

  irParaPagamento() { 
    this.finalizando = true; 
  }

  voltarParaCarrinho() { 
    this.finalizando = false; 
  }

  confirmarPagamento() {
    alert(`Compra de ${this.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} confirmada! 🎉`);
    this.limparCarrinho();
    this.finalizando = false;
  }
}