function validarCliente(cliente, CPF, email) {
  if (cliente === "" || CPF === "" || email === "") {
    alert("Alguns campos obrigatórios não foram preenchidos");
    return false;
  }

  return true;
}

function formatarCPF(cpf) {
  // remove tudo que não for número
  cpf = cpf.replace(/\D/g, "");

  // aplica a máscara se tiver 11 dígitos
  if (cpf.length === 11) {
    return `CPF: ${cpf.substring(0,3)}.${cpf.substring(3,6)}.${cpf.substring(6,9)}-${cpf.substring(9,11)}`;
  }

  return "CPF inválido";
}




