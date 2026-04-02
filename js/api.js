async function obterClientesService() {
  const resposta = await fetch("http://localhost:3000/clientes");
  return await resposta.json();
}

function obterClientePeloIdService(id) {
  return fetch(`http://localhost:3000/clientes/${id}`).then((resposta) =>
    resposta.json(),
  );
}

async function cadastrarClienteService(cliente) {
  const resposta = await fetch("http://localhost:3000/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });
  return await resposta.json();
}

async function editarClienteService(cliente) {
  const resposta = await fetch(`http://localhost:3000/clientes/${cliente.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });
  return await resposta.json();
}

async function excluirClienteService(id) {
  const resposta = await fetch(`http://localhost:3000/clientes/${id}`, {
    method: "DELETE",
  });
  return await resposta.json();
}

async function obterContasPorClienteService(clienteId) {
  const resposta = await fetch(`http://localhost:3000/contas?clienteId=${clienteId}`);
  return await resposta.json();
}

async function cadastrarContaService(conta) {
  const resposta = await fetch("http://localhost:3000/contas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conta),
  });
  return await resposta.json();
}

async function editarContaService(conta) {
  const resposta = await fetch(`http://localhost:3000/contas/${conta.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conta),
  });
  return await resposta.json();
}

async function excluirContaService(id) {
  const resposta = await fetch(`http://localhost:3000/contas/${id}`, {
    method: "DELETE",
  });
  return await resposta.json();
}

// ================== TRANSAÇÕES ==================
async function obterTransacoesService(contaId) {
  const resposta = await fetch(`http://localhost:3000/transacoes?contaId=${contaId}`);
  return await resposta.json();
}

async function cadastrarTransacaoService(transacao) {
  const resposta = await fetch("http://localhost:3000/transacoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transacao),
  });
  return await resposta.json();
}

// Buscar conta pelo ID
async function obterContaPorIdService(id) {
  try {
    const resposta = await fetch(`http://localhost:3000/contas/${id}`);
    if (!resposta.ok) {
      throw new Error("Erro ao buscar conta pelo id");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro em obterContaPorIdService:", erro);
    return null;
  }
}