async function exibirClientes() {
  try {
    const resposta = await obterClientesService();
    renderizaClientes(resposta);
  } catch (error) {
    console.log(error);
  }
}

function renderizaClientes(clientes) {
  const listaClientes = document.querySelector("#lista-clientes");
  listaClientes.innerHTML = "";

  clientes.forEach((cliente) => {
    const divCol = criaElemento(
      "div",
      "col-12 col-sm-6 col-md-4 col-lg-3 mb-3",
    );
    const divCard = criaElemento("div", "card");
    const divCardBody = criaElemento("div", "card-body");

    const h5 = criaElemento("h5", "card-title");
    h5.innerText = cliente.cliente;

    const paragrafoCPF = criaElemento("p", "card-text");
    paragrafoCPF.innerText = cliente.CPF;

    const paragrafoEmail = criaElemento("p", "card-text");
    paragrafoEmail.innerText = cliente.email;

    const divBotoes = criaElemento("div", "d-flex gap-2");

    const botaoEditar = criaElemento("button", "btn btn-primary");
    botaoEditar.innerText = "Editar";
    botaoEditar.setAttribute("data-id", cliente.id);
    botaoEditar.addEventListener("click", preencheFormularioEdicao);

    const botaoExcluir = criaElemento("button", "btn btn-danger");
    botaoExcluir.innerText = "Excluir";
    botaoExcluir.setAttribute("data-id", cliente.id);
    botaoExcluir.addEventListener("click", excluirCliente);

    divCardBody.append(h5, paragrafoCPF, paragrafoEmail, divBotoes);
    divBotoes.append(botaoEditar, botaoExcluir);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);
    listaClientes.appendChild(divCol);
  });
}

// Cria dinamicamente o elemento, adiciona as classes e retorna o elemento criado
function criaElemento(elemento, classes) {
  const novoElemento = document.createElement(elemento);
  novoElemento.classList.add(...classes.split(" "));
  //   classes.split(" ").forEach((classe) => novoElemento.classList.add(classe));
  return novoElemento;
}
