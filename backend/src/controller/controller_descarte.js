import {
  inserirDescarte,
  listarHistoricoDescartes,
  verificarDoceJaDescartado
} from '../model/DAO/descarte.js';

import {
  buscarDocePorId
} from '../model/DAO/doce.js';

import {
  funcionarioExiste
} from '../model/DAO/funcionario.js';

import { MESSAGE_DEFAULT } from '../messages.js';

export const registrarDescarteController = async (dados) => {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    const { fk_id_funcionario, fk_id_doce } = dados;

    if (fk_id_funcionario && fk_id_funcionario != '' && fk_id_funcionario != null && fk_id_funcionario != undefined &&
        fk_id_doce && fk_id_doce != '' && fk_id_doce != null && fk_id_doce != undefined) {

      const doce = await buscarDocePorId(fk_id_doce);

      if (doce) {
        const jaDescartado = await verificarDoceJaDescartado(fk_id_doce);

        if (!jaDescartado) {
          const funcionario = await funcionarioExiste(fk_id_funcionario);

          if (funcionario) {
            const dataDescarte = new Date().toISOString().split('T')[0];

            let result = await inserirDescarte({
              data_descarte: dataDescarte,
              fk_id_funcionario,
              fk_id_doce
            });

            if (result) {
              const { atualizarStatusDoce } = await import('../model/DAO/doce.js');
              await atualizarStatusDoce(fk_id_doce, 'descartado');

              let historico = await listarHistoricoDescartes();
              let descarteCriado = historico.find(h => h.id_historico === result);

              MESSAGE.HEADER.status = MESSAGE_DEFAULT.SUCESS_CREATED.status;
              MESSAGE.HEADER.status_code = MESSAGE_DEFAULT.SUCESS_CREATED.status_code;
              MESSAGE.HEADER.response = descarteCriado;

              return MESSAGE.HEADER;
            } else {
              return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_MODEL;
            }
          } else {
            return MESSAGE_DEFAULT.ERROR_NOT_FOUND;
          }
        } else {
          MESSAGE_DEFAULT.ERROR_BAD_REQUEST.message = 'Este doce já foi descartado';
          return MESSAGE_DEFAULT.ERROR_BAD_REQUEST;
        }
      } else {
        return MESSAGE_DEFAULT.ERROR_NOT_FOUND;
      }
    } else {
      MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS.invalid_field = 'Campos [fk_id_funcionario] ou [fk_id_doce] inválidos';
      return MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

export const listarHistoricoDescartesController = async () => {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    let result = await listarHistoricoDescartes();

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE_DEFAULT.SUCESS_REQUEST.status;
        MESSAGE.HEADER.status_code = MESSAGE_DEFAULT.SUCESS_REQUEST.status_code;
        MESSAGE.HEADER.response.descartes = result;

        return MESSAGE.HEADER;
      } else {
        return MESSAGE_DEFAULT.ERROR_NOT_FOUND;
      }
    } else {
      return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_MODEL;
    }
  } catch (error) {
    return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};
