const form = document.querySelector("#cadastro");
const campoCliente = document.querySelector("#cliente");
const campoCPF = document.querySelector("#CPF");
const campoEmail = document.querySelector("#email");
const campoId = document.querySelector("#id");
const botaoSalvar = document.querySelector("#salvar");

exibirClientes();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const action = event.target.dataset.action;

  const cliente = campoCliente.value;
  const CPF = (campoCPF.value);
  const email = campoEmail.value;
  const id = (campoId.value);

  if (!validarCliente(cliente, CPF, email)) {
    return;
  }

  if (action === "editar") {
    editarCliente({ id, cliente, CPF, email });
  } else {
    salvarCliente({ cliente, CPF, email });
  }
});


function preencheFormularioEdicao(event) {
  const id = event.target.dataset.id;
  obterClientePeloIdService(id)
    .then((resposta) => {
      campoCliente.value = resposta.cliente;
      campoCPF.value = resposta.CPF;
      campoEmail.value = resposta.email;
      campoId.value = resposta.id;
      form.setAttribute("data-action", "editar");
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function editarCliente(clienteEditado) {
  editarClienteService(clienteEditado)
    .then(() => {
      form.setAttribute("data-action", "salvar");
      form.reset();
      exibirClientes();
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function excluirCliente(event) {
  const result = confirm("Deseja mesmo excluir o cliente?");
  if (result) {
    const id = event.target.dataset.id;
    excluirClienteService(id)
      .then((resposta) => {
        console.log(resposta);
        exibirClientes();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
}

async function excluirContaPorClienteService(clienteId) {
  // Busca todas as contas do cliente
  const contas = await obterContasPorClienteService(clienteId);

  // Exclui cada conta encontrada
  for (const conta of contas) {
    await fetch(`http://localhost:3000/contas/${conta.id}`, {
      method: "DELETE",
    });
  }
}

async function salvarCliente(cliente) {
  try {
    const novoCliente = await cadastrarClienteService(cliente);

    // Criar conta vinculada ao cliente recém-criado
    const novaConta = {
      id: Date.now(), // gera id único
      numero: Math.floor(Math.random() * 9000) + 1000, // número fictício
      clienteId: novoCliente.id, // vincula ao cliente
      tipo: "Corrente",
      saldo: 0,
      status: "Ativa"
    };

    await cadastrarContaService(novaConta);

    form.reset();
    exibirClientes();
  } catch (error) {
    console.log(error);
  }
}



async function carregarDados() {
  const clientes = await obterClientesService();
  const select = document.getElementById("clienteSelect");

  clientes.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.cliente;
    select.appendChild(option);
  });

  select.addEventListener("change", async () => {
    const clienteId = parseInt(select.value);
    const contasCliente = await obterContasPorClienteService(clienteId);

    const div = document.getElementById("dadosConta");
    div.innerHTML = "";

    if (contasCliente.length > 0) {
      contasCliente.forEach(conta => {
        div.innerHTML += `
          <p>ID: ${clienteId}</p>
          <p>Número: ${conta.numero}</p>
          <p>Tipo: ${conta.tipo}</p>
          <p>Saldo: ${conta.saldo}</p>
          <p>Status: ${conta.status}</p>
          <hr>
        `;
      });
    } else {
      div.innerHTML = "<p>Esse cliente não possui contas cadastradas.</p>";
    }
  });
}

carregarDados();


