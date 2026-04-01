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

async function salvarCliente(cliente) {
  try {
    await cadastrarClienteService(cliente);
    form.reset();
    exibirClientes();
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


