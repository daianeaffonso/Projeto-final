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

    const botaoEditar = criaElemento("button", "btn btn-success");
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

// ================== CONTAS ==================
async function exibirContas() {
  const clientes = await obterClientesService();
  const listaContas = document.getElementById("lista-contas");
  listaContas.innerHTML = "";

  for (const cliente of clientes) {
    const contas = await obterContasPorClienteService(cliente.id);
    contas.forEach(conta => {
      const divCol = criaElemento("div", "col-md-4 mb-3");
      const divCard = criaElemento("div", "card");
      const divCardBody = criaElemento("div", "card-body");

      const h5 = criaElemento("h5", "card-title");
      h5.innerText = `Conta ${conta.numero}`;

      const pCliente = criaElemento("p", "card-text");
      pCliente.innerText = `Cliente: ${cliente.cliente}`;

      const pTipo = criaElemento("p", "card-text");
      pTipo.innerText = `Tipo: ${conta.tipo}`;

      const pSaldo = criaElemento("p", "card-text");
      pSaldo.innerText = `Saldo: R$ ${conta.saldo}`;

      const pStatus = criaElemento("p", "card-text");
      pStatus.innerText = `Status: ${conta.status}`;

      const divBotoes = criaElemento("div", "d-flex gap-2 mt-2");
      const botaoEditar = criaElemento("button", "btn btn-success");
      botaoEditar.innerText = "Editar";
      botaoEditar.addEventListener("click", () => editarConta(conta));

      const botaoExcluir = criaElemento("button", "btn btn-danger btn-sm");
      botaoExcluir.innerText = "Excluir";
      botaoExcluir.addEventListener("click", () => excluirConta(conta.id));

      divBotoes.append(botaoEditar, botaoExcluir);
      divCardBody.append(h5, pCliente, pTipo, pSaldo, pStatus, divBotoes);
      divCard.appendChild(divCardBody);
      divCol.appendChild(divCard);
      listaContas.appendChild(divCol);
    });
  }
}

// ================== TRANSAÇÕES ==================


async function exibirTransacoes(contaId) {
  const lista = document.getElementById("lista-transacoes");
  lista.innerHTML = "";

  const transacoes = await obterTransacoesService(contaId);

  if (transacoes.length === 0) {
    lista.innerHTML = `<tr><td colspan="5">Nenhuma transação encontrada para esta conta.</td></tr>`;
    return;
  }

  transacoes.forEach(t => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${t.data}</td>
      <td>${t.tipo}</td>
      <td class="${t.tipo === 'deposito' ? 'entrada' : 'saida'}">R$ ${t.valor.toFixed(2)}</td>
      <td>${t.descricao}</td>
      <td>R$ ${t.novoSaldo.toFixed(2)}</td>
    `;
    lista.appendChild(linha);
  });
}