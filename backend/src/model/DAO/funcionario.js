import db from '../../config/knex.js';

export const buscarFuncionarioPorEmail = async (email) => {
  return await db('tb_funcionario')
    .select('id_funcionario', 'nome', 'email', 'senha')
    .where('email', email)
    .first();
};

export const buscarFuncionarioPorId = async (id) => {
  return await db('tb_funcionario')
    .select('id_funcionario', 'nome', 'email')
    .where('id_funcionario', id)
    .first();
};

export const listarFuncionarios = async () => {
  return await db('tb_funcionario')
    .select('id_funcionario', 'nome', 'email')
    .orderBy('nome', 'asc');
};

export const funcionarioExiste = async (id) => {
  const funcionario = await db('tb_funcionario')
    .select('id_funcionario')
    .where('id_funcionario', id)
    .first();

  return !!funcionario;
};
