import express from 'express';
import cors from 'cors';
import db from './config/knex.js';

import {
  login
} from './controller/controller_funcionario.js';

import {
  listarDocesController,
  buscarDocePorIdController,
  cadastrarDoceController,
  atualizarDoceController,
  removerDoceController
} from './controller/controller_doce.js';

import {
  registrarDescarteController,
  listarHistoricoDescartesController
} from './controller/controller_descarte.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const result = await login(email, senha);
  console.log(result)
  return res.status(result.status_code).json(result);
});

app.get('/doces', async (req, res) => {
  const result = await listarDocesController();
  console.log(result)
  return res.status(result.status_code).json(result);
});

app.get('/doces/:id', async (req, res) => {
  const { id } = req.params;
  const result = await buscarDocePorIdController(id);
  return res.status(result.status_code).json(result);
});

app.post('/doces', async (req, res) => {
  console.log('POST /doces - Body:', req.body);
  const result = await cadastrarDoceController(req.body);
  console.log('POST /doces - Result:', result);
  return res.status(result.status_code).json(result);
});

app.put('/doces/:id', async (req, res) => {
  const { id } = req.params;
  const result = await atualizarDoceController(id, req.body);
  return res.status(result.status_code).json(result);
});

app.delete('/doces/:id', async (req, res) => {
  const { id } = req.params;
  const result = await removerDoceController(id);
  return res.status(result.status_code).json(result);
});

app.post('/descartes', async (req, res) => {
  const result = await registrarDescarteController(req.body);
  return res.status(result.status_code).json(result);
});

app.get('/descartes', async (req, res) => {
  const result = await listarHistoricoDescartesController();
  return res.status(result.status_code).json(result);
});

app.get('/', (req, res) => {
  res.json({
    message: 'API Doceria Gourmet IANES',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /login',
        body: {
          email: 'string',
          senha: 'string'
        }
      },
      doces: {
        listar: 'GET /doces',
        buscar: 'GET /doces/:id',
        cadastrar: 'POST /doces',
        atualizar: 'PUT /doces/:id',
        remover: 'DELETE /doces/:id'
      },
      descartes: {
        registrar: 'POST /descartes',
        listar: 'GET /descartes'
      }
    }
  });
});

app.listen(PORT, () => {
  console.log('DOCERIA GOURMET IANES - API' + `  ${PORT}`);
});

export default app;
