# Doceria Gourmet IANES - API

<img width="1297" height="511" alt="tempo" src="https://github.com/user-attachments/assets/92b4f858-f9da-477b-b43e-2bff31f24579" />


API REST para gerenciamento de estoque de doces, autenticação de funcionários e controle de descarte de produtos.

##  Arquitetura

Este projeto utiliza o padrão **DAO (Data Access Object)** para separação de responsabilidades:

- **model/DAO**: Camada de acesso ao banco de dados
- **controller**: Camada de lógica de negócio
- **server.js**: Todas as rotas centralizadas

## 🛠 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Banco de dados relacional
- **Knex.js** - Query builder SQL
- **CORS** - Compartilhamento de recursos entre origens

## 📁 Estrutura do Projeto

```
backend/
├── package.json                    # Dependências e scripts
├── README.md                       # Documentação
└── src/
    ├── server.js                   # Servidor Express + Rotas
    │
    ├── config/
    │   └── knex.js                 # Configuração MySQL
    │
    ├── controller/
    │   ├── controller_funcionario.js  # Login
    │   ├── controller_doce.js         # CRUD Doces
    │   └── controller_descarte.js     # Descartes
    │
    ├── model/
    │   └── DAO/
    │       ├── funcionario.js      # DAO Funcionário
    │       ├── doce.js             # DAO Doce
    │       └── descarte.js         # DAO Descarte
    │
    └── database/
        └── schema.sql              # Schema MySQL
```


## Próximos Passos

Para produção, considere:
- Implementar JWT para autenticação
- Usar bcrypt para hashing de senhas
- Adicionar variáveis de ambiente com dotenv
- Implementar validação de dados com middleware
- Adicionar testes unitários
- Implementar rate limiting
- Adicionar logging
- Implementar pagination nas listagens
