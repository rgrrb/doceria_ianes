import {
  listarDoces,
  buscarDocePorId,
  inserirDoce,
  atualizarDoce as atualizarDoceDB,
  deletarDoce,
  verificarDoceDescartado
} from '../model/DAO/doce.js';

import { MESSAGE_DEFAULT } from '../messages.js';

const calcularStatus = (dataValidade) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const validade = new Date(dataValidade);
  validade.setHours(0, 0, 0, 0);

  const diferencaDias = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

  if (diferencaDias < 0) {
    return 'vencido';
  } else if (diferencaDias <= 3) {
    return 'proximo_vencimento';
  } else {
    return 'disponivel';
  }
};

export const listarDocesController = async () => {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    let result = await listarDoces();

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE_DEFAULT.SUCESS_REQUEST.status;
        MESSAGE.HEADER.status_code = MESSAGE_DEFAULT.SUCESS_REQUEST.status_code;
        MESSAGE.HEADER.response.doces = result;

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

export const buscarDocePorIdController = async (id) => {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (id != '' && id != null && id != undefined && id > 0 && !isNaN(id)) {
      let result = await buscarDocePorId(parseInt(id));

      if (result) {
        MESSAGE.HEADER.status = MESSAGE_DEFAULT.SUCESS_REQUEST.status;
        MESSAGE.HEADER.status_code = MESSAGE_DEFAULT.SUCESS_REQUEST.status_code;
        MESSAGE.HEADER.response = result;

        return MESSAGE.HEADER;
      } else {
        return MESSAGE_DEFAULT.ERROR_NOT_FOUND;
      }
    } else {
      MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido';
      return MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

export const cadastrarDoceController = async (dados) => {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    const {
      quantidade,
      peso,
      porcao,
      data_validade,
      massa,
      recheio,
      cobertura,
      tipo
    } = dados;

    if (quantidade && quantidade != '' && quantidade != null && quantidade != undefined &&
      peso && peso != '' && peso != null && peso != undefined &&
      porcao && porcao != '' && porcao != null && porcao != undefined &&
      data_validade && data_validade != '' && data_validade != null && data_validade != undefined &&
      massa && massa != '' && massa != null && massa != undefined &&
      recheio && recheio != '' && recheio != null && recheio != undefined &&
      cobertura && cobertura != '' && cobertura != null && cobertura != undefined &&
      tipo && tipo != '' && tipo != null && tipo != undefined) {

      const status = calcularStatus(data_validade);

      let result = await inserirDoce({
        quantidade,
        peso,
        porcao,
        data_validade,
        massa,
        recheio,
        cobertura,
        status,
        tipo
      });

      if (result) {
        let doceCadastrado = await buscarDocePorId(result);

        MESSAGE.HEADER.status = MESSAGE_DEFAULT.SUCESS_CREATED.status;
        MESSAGE.HEADER.status_code = MESSAGE_DEFAULT.SUCESS_CREATED.status_code;
        MESSAGE.HEADER.response = doceCadastrado;

        return MESSAGE.HEADER;
      } else {
        return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS.invalid_field = 'Campos obrigatórios não preenchidos';
      return MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    console.error('Erro ao cadastrar doce:', error);
    return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

export const atualizarDoceController = async (id, dados) => {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (id != '' && id != null && id != undefined && id > 0 && !isNaN(id)) {
      const doceExistente = await buscarDocePorId(parseInt(id));

      if (doceExistente) {
        const {
          quantidade,
          peso,
          porcao,
          data_validade,
          massa,
          recheio,
          cobertura,
          tipo
        } = dados;

        const novoStatus = data_validade ? calcularStatus(data_validade) : doceExistente.status;

        const dadosAtualizacao = {
          quantidade: quantidade || doceExistente.quantidade,
          peso: peso || doceExistente.peso,
          porcao: porcao || doceExistente.porcao,
          data_validade: data_validade || doceExistente.data_validade,
          massa: massa || doceExistente.massa,
          recheio: recheio || doceExistente.recheio,
          cobertura: cobertura || doceExistente.cobertura,
          status: novoStatus,
          tipo: tipo || doceExistente.tipo
        };

        let result = await atualizarDoceDB(parseInt(id), dadosAtualizacao);

        if (result) {
          let doceAtualizado = await buscarDocePorId(parseInt(id));

          MESSAGE.HEADER.status = MESSAGE_DEFAULT.SUCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE_DEFAULT.SUCESS_REQUEST.status_code;
          MESSAGE.HEADER.response = doceAtualizado;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_MODEL;
        }
      } else {
        return MESSAGE_DEFAULT.ERROR_NOT_FOUND;
      }
    } else {
      MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido';
      return MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

export const removerDoceController = async (id) => {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (id != '' && id != null && id != undefined && id > 0 && !isNaN(id)) {
      const doceExistente = await buscarDocePorId(parseInt(id));

      if (doceExistente) {
        const descartado = await verificarDoceDescartado(parseInt(id));

        if (!descartado) {
          let result = await deletarDoce(parseInt(id));

          if (result) {
            MESSAGE.HEADER.status = MESSAGE_DEFAULT.SUCESS_REQUEST.status;
            MESSAGE.HEADER.status_code = MESSAGE_DEFAULT.SUCESS_REQUEST.status_code;
            MESSAGE.HEADER.response = { id_doce: parseInt(id) };

            return MESSAGE.HEADER;
          } else {
            return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_MODEL;
          }
        } else {
          MESSAGE_DEFAULT.ERROR_BAD_REQUEST.message = 'Não é possível remover um doce que já foi descartado';
          return MESSAGE_DEFAULT.ERROR_BAD_REQUEST;
        }
      } else {
        return MESSAGE_DEFAULT.ERROR_NOT_FOUND;
      }
    } else {
      MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido';
      return MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};
