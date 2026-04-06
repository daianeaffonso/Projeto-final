# 💰 Gerenciador Financeiro

## 📌 Descrição
Este projeto é um sistema bancário acadêmico que permite o gerenciamento de **clientes, contas e transações**.  
Ao cadastrar um cliente (com validações de CPF e email), o sistema cria automaticamente uma conta vinculada.  
O painel possibilita a gestão de clientes, contas e o registro de depósitos e saques, com histórico de transações.

## 🎯 Funcionalidades
### Gestão de Clientes
- Listar clientes (Nome, CPF, Email)
- Criar novo cliente
- Editar cliente
- Deletar cliente
- Validações: campos obrigatórios e email contendo `@`

### Gestão de Contas
- Listar contas (Número, Cliente, Tipo, Saldo)
- Criar conta (Corrente/Poupança, saldo inicial 0)
- Editar status da conta (Ativa/Inativa)
- Deletar conta

### Transações
- Registrar depósito (atualiza saldo)
- Registrar saque (valida saldo suficiente)
- Listar histórico de transações (Data, Tipo, Valor, Saldo Novo)

## ⚙️ Tecnologias Utilizadas
- **HTML5**
- **CSS**
- **Bootstrap** (formatação e responsividade)
- **JavaScript** (lógica e validações)
- **JSON Server** (simulação de banco de dados)

## 📂 Estrutura do Projeto
``` 
banco-frontend/
├── index.html
├── styles/
│   └── style.css
├── js/
│   ├── api.js          # fetch das chamadas
│   ├── ui.js           # renderização
│   ├── validacao.js    # validações
│   └── main.js         # lógica principal
├── db.json             # base de dados simulada
└── README.md
```

## 🚀 Como Executar
1. Clone este repositório:
   ```bash
   git clone https://github.com/daianeaffonso/Projeto-final

Instale o JSON Server (se ainda não tiver):
npm install -g json-server

Inicie o servidor:
json-server --watch db.json

Abra o index.html no navegador para acessar o painel.

🧪 Observações

    Algumas validações não foram implementadas, pois o projeto foi desenvolvido em contexto acadêmico.

    O foco foi atender aos requisitos obrigatórios do enunciado: Sistema Bancário.

👥 Autores

    Daiane (@daianeaffonso)

📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
Caso seja utilizado ou expandido, recomenda-se aplicar uma licença como MIT.
