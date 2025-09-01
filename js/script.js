async function carregarProdutos() {
  try {
    const resp = await fetch("https://fakestoreapi.com/products");
    const produtos = await resp.json();

    for (let i = produtos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [produtos[i], produtos[j]] = [produtos[j], produtos[i]];
    }

    function renderizar(containerId, qtd) {
      const container = document.getElementById(containerId);
      container.innerHTML = "";
      const selecionados = produtos.splice(0, qtd);
      selecionados.forEach((produto) => {
        const card = document.createElement("div");
        card.classList.add("produto-card");

        card.innerHTML = `
                <img src="${produto.image}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p class="hide">${produto.description.substring(0, 80)}...</p>
                <p>R$ ${produto.price.toFixed(2)}</p>
                <button>COMPRAR</button>
                `;

        container.appendChild(card);
      });
    }

    renderizar("novidades", 8);
    renderizar("maisVendidos", 8);
    renderizar("colecao", 8);
  } catch (error) {
    console.error("Erro ao carregar o produto", error);
    document.getElementById("novidades").innerHTML =
      "<p>Erro ao carregar produtos.</p>";
  }
}

carregarProdutos();
