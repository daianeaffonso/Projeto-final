function validarCliente(cliente, CPF, email) {
  if (cliente === "" || CPF === "" || email === "") {
    alert("Alguns campos obrigatórios não foram preenchidos");
    return false;
  }

  return true;
}
