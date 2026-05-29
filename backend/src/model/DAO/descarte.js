import db from '../../config/knex.js';

export const inserirDescarte = async (descarte) => {
  const [idHistorico] = await db('tb_historico_descarte').insert(descarte);
  return idHistorico;
};

export const listarHistoricoDescartes = async () => {
  return await db('tb_historico_descarte')
    .select(
      'tb_historico_descarte.*',
      'tb_funcionario.nome as nome_funcionario',
      'tb_funcionario.email as email_funcionario',
      'tb_doce.tipo as tipo_doce',
      'tb_doce.massa',
      'tb_doce.recheio',
      'tb_doce.cobertura',
      'tb_doce.data_validade'
    )
    .join('tb_funcionario', 'tb_historico_descarte.fk_id_funcionario', 'tb_funcionario.id_funcionario')
    .join('tb_doce', 'tb_historico_descarte.fk_id_doce', 'tb_doce.id_doce')
    .orderBy('tb_historico_descarte.data_descarte', 'desc');
};

export const buscarDescartePorId = async (id) => {
  return await db('tb_historico_descarte')
    .select('*')
    .where('id_historico', id)
    .first();
};

export const verificarDoceJaDescartado = async (idDoce) => {
  const descarte = await db('tb_historico_descarte')
    .select('id_historico')
    .where('fk_id_doce', idDoce)
    .first();

  return !!descarte;
};

export const listarDescartesPorFuncionario = async (idFuncionario) => {
  return await db('tb_historico_descarte')
    .select(
      'tb_historico_descarte.*',
      'tb_doce.tipo as tipo_doce',
      'tb_doce.massa',
      'tb_doce.recheio',
      'tb_doce.cobertura'
    )
    .join('tb_doce', 'tb_historico_descarte.fk_id_doce', 'tb_doce.id_doce')
    .where('tb_historico_descarte.fk_id_funcionario', idFuncionario)
    .orderBy('tb_historico_descarte.data_descarte', 'desc');
};
