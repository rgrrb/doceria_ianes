# REQUISIÇÕES - API Doceria Gourmet IANES

## Autenticação

### POST /login
Realiza login de funcionário.

**Body:**
```json
{
  "email": "joao@doceria.com",
  "senha": "123"
}
```

**Response (200):**
```json
{
  "id_funcionario": 1,
  "nome": "João Silva",
  "email": "joao@doceria.com"
}
```

**Response (401):**
```json
{
  "status": 401,
  "message": "Email ou senha inválidos"
}
```

---

## Doces

### GET /doces
Lista todos os doces cadastrados.

**Response (200):**
```json
[
  {
    "id_doce": 1,
    "quantidade": 50,
    "peso": 100.00,
    "porcao": 25.00,
    "data_validade": "2026-06-15",
    "massa": "chocolate",
    "recheio": "morango",
    "cobertura": "chocolate",
    "status": "disponivel",
    "tipo": "bombom",
    "created_at": "2026-05-29T10:00:00.000Z",
    "updated_at": "2026-05-29T10:00:00.000Z"
  }
]
```

---

### GET /doces/:id
Busca um doce específico por ID.

**Parametro na URL:** `id` (integer)

**Response (200):**
```json
{
  "id_doce": 1,
  "quantidade": 50,
  "peso": 100.00,
  "porcao": 25.00,
  "data_validade": "2026-06-15",
  "massa": "chocolate",
  "recheio": "morango",
  "cobertura": "chocolate",
  "status": "disponivel",
  "tipo": "bombom",
  "created_at": "2026-05-29T10:00:00.000Z",
  "updated_at": "2026-05-29T10:00:00.000Z"
}
```

---

### POST /doces
Cadastra um novo doce. O status é calculado automaticamente.

**Body:**
```json
{
  "quantidade": 30,
  "peso": 80.00,
  "porcao": 20.00,
  "data_validade": "2026-06-01",
  "massa": "branqueamento",
  "recheio": "doce de leite",
  "cobertura": "ao leite",
  "tipo": "trufa"
}
```

**Campos obrigatórios:**
- `quantidade` (integer)
- `peso` (decimal)
- `porcao` (decimal)
- `data_validade` (date - formato YYYY-MM-DD)
- `massa` (string)
- `recheio` (string)
- `cobertura` (string)
- `tipo` (string)

**Response (201):**
```json
{
  "id_doce": 2,
  "quantidade": 30,
  "peso": 80.00,
  "porcao": 20.00,
  "data_validade": "2026-06-01",
  "massa": "branqueamento",
  "recheio": "doce de leite",
  "cobertura": "ao leite",
  "status": "proximo_vencimento",
  "tipo": "trufa",
  "created_at": "2026-05-29T11:00:00.000Z",
  "updated_at": "2026-05-29T11:00:00.000Z"
}
```

---

### PUT /doces/:id
Atualiza um doce existente.

**Parametro na URL:** `id` (integer)

**Body (todos opcionais):**
```json
{
  "quantidade": 40,
  "peso": 90.00,
  "porcao": 22.00,
  "data_validade": "2026-07-15",
  "massa": "chocolate",
  "recheio": "morango",
  "cobertura": "chocolate",
  "tipo": "trufa"
}
```

**Response (200):**
```json
{
  "id_doce": 2,
  "quantidade": 40,
  "peso": 90.00,
  "porcao": 20.00,
  "data_validade": "2026-07-15",
  "massa": "branqueamento",
  "recheio": "doce de leite",
  "cobertura": "ao leite",
  "status": "disponivel",
  "tipo": "trufa",
  "created_at": "2026-05-29T11:00:00.000Z",
  "updated_at": "2026-05-29T12:00:00.000Z"
}
```

---

### DELETE /doces/:id
Remove um doce. Não é possível remover doce descartado.

**Parametro na URL:** `id` (integer)

**Response (200):**
```json
{
  "id_doce": 2
}
```

**Response (400):**
```json
{
  "status": 400,
  "message": "Não é possível remover um doce que já foi descartado"
}
```

---

## Descartes

### POST /descartes
Registra o descarte de um doce.

**Body:**
```json
{
  "fk_id_funcionario": 1,
  "fk_id_doce": 3
}
```

**Campos obrigatórios:**
- `fk_id_funcionario` (integer) - ID do funcionário que está realizando o descarte
- `fk_id_doce` (integer) - ID do doce a ser descartado

**Response (201):**
```json
{
  "id_historico": 1,
  "data_descarte": "2026-05-29",
  "fk_id_funcionario": 1,
  "fk_id_doce": 3,
  "created_at": "2026-05-29T12:00:00.000Z",
  "nome_funcionario": "João Silva",
  "email_funcionario": "joao@doceria.com",
  "tipo_doce": "cupcake",
  "massa": "chocolate",
  "recheio": "ninho",
  "cobertura": "chocolate",
  "data_validade": "2026-05-20"
}
```

**Response (400):**
```json
{
  "status": 400,
  "message": "Este doce já foi descartado"
}
```

---

### GET /descartes
Lista o histórico completo de descartes com JOIN de funcionário e doce.

**Response (200):**
```json
[
  {
    "id_historico": 1,
    "data_descarte": "2026-05-29",
    "fk_id_funcionario": 1,
    "fk_id_doce": 3,
    "created_at": "2026-05-29T12:00:00.000Z",
    "nome_funcionario": "João Silva",
    "email_funcionario": "joao@doceria.com",
    "tipo_doce": "cupcake",
    "massa": "chocolate",
    "recheio": "ninho",
    "cobertura": "chocolate",
    "data_validade": "2026-05-20"
  }
]
```

---

## Regras de Status

O status do doce é calculado automaticamente com base na data de validade:

| Condição | Status |
|----------|--------|
| Data anterior a hoje | `vencido` |
| Data até 3 dias a partir de hoje | `proximo_vencimento` |
| Data com mais de 3 dias | `disponivel` |
| Doce foi descartado | `descartado` |

---

## Erros Genéricos

**Campos obrigatórios (400):**
```json
{
  "status": 400,
  "message": "Todos os campos são obrigatórios"
}
```

**Parâmetro inválido (400):**
```json
{
  "status": 400,
  "message": "Parâmetro inválido"
}
```

**Recurso não encontrado (404):**
```json
{
  "status": 404,
  "message": "Recurso não encontrado"
}
```

**Erro ao acessar banco de dados (500):**
```json
{
  "status": 500,
  "message": "Erro ao acessar banco de dados"
}
```

---

## Exemplos cURL

### Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@doceria.com","senha":"123"}'
```

### Listar doces
```bash
curl http://localhost:3000/doces
```

### Cadastrar doce
```bash
curl -X POST http://localhost:3000/doces \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 25,
    "peso": 100.00,
    "porcao": 25.00,
    "data_validade": "2026-07-20",
    "massa": "chocolate",
    "recheio": "morango",
    "cobertura": "chocolate",
    "tipo": "brownie"
  }'
```

### Atualizar doce
```bash
curl -X PUT http://localhost:3000/doces/1 \
  -H "Content-Type: application/json" \
  -d '{"quantidade": 40, "peso": 110.00}'
```

### Remover doce
```bash
curl -X DELETE http://localhost:3000/doces/5
```

### Registrar descarte
```bash
curl -X POST http://localhost:3000/descartes \
  -H "Content-Type: application/json" \
  -d '{"fk_id_funcionario": 1, "fk_id_doce": 3}'
```

### Listar descartes
```bash
curl http://localhost:3000/descartes
```
