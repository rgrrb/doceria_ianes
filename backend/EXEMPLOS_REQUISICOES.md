# 🚀 Exemplos de Requisições - Doceria Gourmet IANES

Este arquivo contém exemplos prontos para copiar e colar em ferramentas como Postman, Insomnia ou terminal cURL.

## 📋 Índice

1. [Autenticação](#autenticação)
2. [CRUD de Doces](#crud-de-doces)
3. [Descartes](#descartes)

---

## 🔐 Autenticação

### Login

**Endpoint:** `POST /login`

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@doceria.com",
    "senha": "123456"
  }'
```

**Body JSON:**
```json
{
  "email": "joao@doceria.com",
  "senha": "123456"
}
```

---

## 🍰 CRUD de Doces

### 1. Listar todos os doces

**Endpoint:** `GET /doces`

```bash
curl http://localhost:3000/doces
```

### 2. Buscar doce por ID

**Endpoint:** `GET /doces/:id`

```bash
curl http://localhost:3000/doces/1
```

### 3. Cadastrar novo doce (disponível)

**Endpoint:** `POST /doces`

```bash
curl -X POST http://localhost:3000/doces \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 50,
    "peso": 100.00,
    "porcao": 25.00,
    "data_validade": "2026-07-20",
    "massa": "chocolate",
    "recheio": "morango",
    "cobertura": "chocolate",
    "tipo": "bombom"
  }'
```

### 4. Cadastrar doce próximo ao vencimento

**Endpoint:** `POST /doces`

```bash
curl -X POST http://localhost:3000/doces \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 30,
    "peso": 80.00,
    "porcao": 20.00,
    "data_validade": "2026-06-01",
    "massa": "branqueamento",
    "recheio": "doce de leite",
    "cobertura": "ao leite",
    "tipo": "trufa"
  }'
```

### 5. Cadastrar doce vencido

**Endpoint:** `POST /doces`

```bash
curl -X POST http://localhost:3000/doces \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 20,
    "peso": 120.00,
    "porcao": 30.00,
    "data_validade": "2026-05-20",
    "massa": "chocolate",
    "recheio": "ninho",
    "cobertura": "chocolate",
    "tipo": "cupcake"
  }'
```

### 6. Atualizar doce

**Endpoint:** `PUT /doces/:id`

```bash
curl -X PUT http://localhost:3000/doces/1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 40,
    "peso": 110.00,
    "data_validade": "2026-08-15",
    "tipo": "bombom"
  }'
```

### 7. Remover doce

**Endpoint:** `DELETE /doces/:id`

```bash
curl -X DELETE http://localhost:3000/doces/5
```

---

## 🗑️ Descartes

### 1. Registrar descarte

**Endpoint:** `POST /descartes`

```bash
curl -X POST http://localhost:3000/descartes \
  -H "Content-Type: application/json" \
  -d '{
    "fk_id_funcionario": 1,
    "fk_id_doce": 3
  }'
```

### 2. Listar histórico de descartes

**Endpoint:** `GET /descartes`

```bash
curl http://localhost:3000/descartes
```

---

## 📝 Coleção Postman

### Importar como JSON

Salve o conteúdo abaixo em um arquivo `doceria-ianes-postman.json` e importe no Postman:

```json
{
  "info": {
    "name": "Doceria Gourmet IANES",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"joao@doceria.com\",\n  \"senha\": \"123456\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["login"]
        }
      }
    },
    {
      "name": "Listar Doces",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/doces",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["doces"]
        }
      }
    },
    {
      "name": "Buscar Doce por ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/doces/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["doces", "1"]
        }
      }
    },
    {
      "name": "Cadastrar Doce",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"quantidade\": 50,\n  \"peso\": 100.00,\n  \"porcao\": 25.00,\n  \"data_validade\": \"2026-07-20\",\n  \"massa\": \"chocolate\",\n  \"recheio\": \"morango\",\n  \"cobertura\": \"chocolate\",\n  \"tipo\": \"bombom\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/doces",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["doces"]
        }
      }
    },
    {
      "name": "Atualizar Doce",
      "request": {
        "method": "PUT",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"quantidade\": 40,\n  \"peso\": 110.00,\n  \"data_validade\": \"2026-08-15\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/doces/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["doces", "1"]
        }
      }
    },
    {
      "name": "Remover Doce",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/doces/5",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["doces", "5"]
        }
      }
    },
    {
      "name": "Registrar Descarte",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"fk_id_funcionario\": 1,\n  \"fk_id_doce\": 3\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/descartes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["descartes"]
        }
      }
    },
    {
      "name": "Listar Descartes",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/descartes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["descartes"]
        }
      }
    }
  ]
}
```

---

## 🎯 Cenários de Teste

### Cenário 1: Fluxo completo

1. **Login**
   ```bash
   curl -X POST http://localhost:3000/login \
     -H "Content-Type: application/json" \
     -d '{"email":"joao@doceria.com","senha":"123456"}'
   ```

2. **Cadastrar doce**
   ```bash
   curl -X POST http://localhost:3000/doces \
     -H "Content-Type: application/json" \
     -d '{
       "quantidade": 25,
       "peso": 100.00,
       "porcao": 25.00,
       "data_validade": "2026-05-28",
       "massa": "chocolate",
       "recheio": "marshmallow",
       "cobertura": "chocolate",
       "tipo": "brownie"
     }'
   ```

3. **Listar doces** (verificar status `proximo_vencimento`)

4. **Registrar descarte**
   ```bash
   curl -X POST http://localhost:3000/descartes \
     -H "Content-Type: application/json" \
     -d '{"fk_id_funcionario": 1, "fk_id_doce": 6}'
   ```

5. **Verificar histórico de descartes**
   ```bash
   curl http://localhost:3000/descartes
   ```

### Cenário 2: Testar validação de status

1. **Cadastrar doce vencido** (data anterior a hoje)
   - Status deve ser: `vencido`

2. **Cadastrar doce próximo do vencimento** (data dentro de 3 dias)
   - Status deve ser: `proximo_vencimento`

3. **Cadastrar doce disponível** (data com mais de 3 dias)
   - Status deve ser: `disponivel`

### Cenário 3: Testar erro de doce descartado

1. **Registrar descarte de um doce**

2. **Tentar remover o mesmo doce**
   - Deve retornar erro: "Não é possível remover um doce que já foi descartado"

3. **Tentar descartar o mesmo doce novamente**
   - Deve retornar erro: "Este doce já foi descartado"

---

## 🔍 Dicas de Debug

### Ver logs do servidor
Os logs são exibidos no terminal onde o servidor está rodando:
- ✅ Conectado ao MySQL
- 🚀 Servidor rodando
- Logs de erros em controllers

### Ver banco de dados diretamente
```sql
-- Ver todos os doces
SELECT * FROM tb_doce ORDER BY data_validade;

-- Ver doces próximos de vencer
SELECT * FROM tb_doce
WHERE DATEDIFF(data_validade, CURDATE()) <= 3
AND status != 'vencido'
AND status != 'descartado';

-- Ver descartes com detalhes
SELECT
  hd.*,
  f.nome as funcionario,
  d.tipo as doce
FROM tb_historico_descarte hd
JOIN tb_funcionario f ON hd.fk_id_funcionario = f.id_funcionario
JOIN tb_doce d ON hd.fk_id_doce = d.id_doce;
```

---

## 📦 Resumo de Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/login` | Login de funcionário |
| GET | `/doces` | Listar todos os doces |
| GET | `/doces/:id` | Buscar doce por ID |
| POST | `/doces` | Cadastrar novo doce |
| PUT | `/doces/:id` | Atualizar doce |
| DELETE | `/doces/:id` | Remover doce |
| POST | `/descartes` | Registrar descarte |
| GET | `/descartes` | Listar histórico de descartes |
