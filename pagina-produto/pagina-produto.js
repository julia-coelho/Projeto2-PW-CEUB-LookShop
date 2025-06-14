const baseURL = (document.currentScript && document.currentScript.src.split('pagina-produto/')[0]) || '';

function carregarProduto() {
  const dados = JSON.parse(sessionStorage.getItem('produtoSelecionado'));
  if (!dados) return;

  const img = document.getElementById('imagem-produto');
  const nome = document.getElementById('nome-produto');
  const preco = document.getElementById('preco-produto');

  if (img) img.src = dados.img;
  if (nome) nome.textContent = dados.nome;
  if (preco) preco.textContent = `R$ ${parseFloat(dados.preco).toFixed(2)}`;
}

let quantidade = 1;

function atualizarQuantidade() {
  const span = document.getElementById('quantidade');
  if (span) span.textContent = quantidade;
}

document.addEventListener('DOMContentLoaded', () => {
  carregarProduto();
  atualizarQuantidade();

  const menos = document.getElementById('menos');
  const mais = document.getElementById('mais');
  const btnAdd = document.getElementById('btn-adicionar-carrinho');

  if (menos) {
    menos.addEventListener('click', () => {
      if (quantidade > 1) {
        quantidade--;
        atualizarQuantidade();
      }
    });
  }

  if (mais) {
    mais.addEventListener('click', () => {
      quantidade++;
      atualizarQuantidade();
    });
  }

  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      if (!usuarioLogado) {
        window.location.href = baseURL + 'authentication/login.html';
        return;
      }

      const dados = JSON.parse(sessionStorage.getItem('produtoSelecionado'));
      if (!dados) return;

      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const itemExistente = carrinho.find((p) => p.id === dados.id);
      if (itemExistente) {
        itemExistente.quantidade += quantidade;
      } else {
        carrinho.push({
          id: dados.id,
          nome: dados.nome,
          preco: parseFloat(dados.preco),
          quantidade,
        });
      }
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      window.location.href = baseURL + 'cart/carrinho.html';
    });
  }
});
