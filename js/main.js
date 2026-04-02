const form = document.querySelector("#cadastro");
const campoCliente = document.querySelector("#cliente");
const campoCPF = document.querySelector("#CPF");
const campoEmail = document.querySelector("#email");
const campoId = document.querySelector("#id");
const botaoSalvar = document.querySelector("#salvar");

exibirClientes();
exibirContas(); // já carrega as contas na inicialização

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
// ================== CLIENTES ==================
async function salvarCliente(cliente) {
  try {
    const novoCliente = await cadastrarClienteService(cliente);

    // Cria conta automaticamente vinculada ao cliente
    const novaConta = {
      id: crypto.randomUUID(),
      numero: Math.floor(Math.random() * 1000),
      clienteId: novoCliente.id,
      tipo: "Corrente",
      saldo: 0,
      status: "Ativa",
    };
    await cadastrarContaService(novaConta);

    form.reset();
    exibirClientes();
    exibirContas(); // atualiza lista de contas
  } catch (error) {
    console.log(error);
  }
}


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

async function excluirCliente(event) {
  const result = confirm("Deseja mesmo excluir o cliente?");
  if (result) {
    const id = event.target.dataset.id;

    try {
      // Exclui o cliente
      await excluirClienteService(id);

      // Busca e exclui todas as contas vinculadas
      const contas = await obterContasPorClienteService(id);
      for (const conta of contas) {
        await excluirContaService(conta.id);
      }

      // Atualiza a interface
      exibirClientes();
      exibirContas();
    } catch (erro) {
      console.log(erro);
    }
  }
}


// ================== CONTAS ==================
function editarConta(conta) {
  const novoStatus = prompt("Digite o novo status da conta:", conta.status);
  if (novoStatus) {
    editarContaService({ ...conta, status: novoStatus })
      .then(() => exibirContas())
      .catch(console.log);
  }
}

function excluirConta(id) {
  if (confirm("Deseja mesmo excluir a conta?")) {
    excluirContaService(id)
      .then(() => exibirContas())
      .catch(console.log);
  }
}