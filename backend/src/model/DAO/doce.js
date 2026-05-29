import db from '../../config/knex.js';

export const listarDoces = async () => {
  return await db('tb_doce')
    .select('*')
    .orderBy('data_validade', 'asc');
};

export const buscarDocePorId = async (id) => {
  return await db('tb_doce')
    .select('*')
    .where('id_doce', id)
    .first();
};

export const inserirDoce = async (doce) => {
  const [idDoce] = await db('tb_doce').insert(doce);
  return idDoce;
};

export const atualizarDoce = async (id, dados) => {
  const linhasAfetadas = await db('tb_doce')
    .where('id_doce', id)
    .update(dados);
  return linhasAfetadas;
};

export const deletarDoce = async (id) => {
  const linhasAfetadas = await db('tb_doce')
    .where('id_doce', id)
    .del();
  return linhasAfetadas;
};

export const doceExiste = async (id) => {
  const doce = await db('tb_doce')
    .select('id_doce')
    .where('id_doce', id)
    .first();

  return !!doce;
};

export const atualizarStatusDoce = async (id, status) => {
  return await db('tb_doce')
    .where('id_doce', id)
    .update({ status });
};

export const verificarDoceDescartado = async (id) => {
  const doce = await db('tb_doce')
    .select('status')
    .where('id_doce', id)
    .first();

  return doce && doce.status === 'descartado';
};
