import {
  buscarFuncionarioPorEmail
} from '../model/DAO/funcionario.js';

import { MESSAGE_DEFAULT } from '../messages.js';

export const login = async (email, senha) => {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (email && email != '' && email != null && email != undefined &&
        senha && senha != '' && senha != null && senha != undefined) {

      console.log('Tentando login com email:', email);
      let result = await buscarFuncionarioPorEmail(email);
      console.log('Resultado do banco:', result);

      if (result) {
        if (result.senha === senha) {
          const { senha: _, ...funcionarioData } = result;

          MESSAGE.HEADER.status = MESSAGE_DEFAULT.SUCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE_DEFAULT.SUCESS_REQUEST.status_code;
          MESSAGE.HEADER.response = funcionarioData;

          return MESSAGE.HEADER;

        } else {
          return MESSAGE_DEFAULT.ERROR_UNAUTHORIZED;
        }
      } else {
        return MESSAGE_DEFAULT.ERROR_UNAUTHORIZED;
      }
    } else {
      MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributos [email] ou [senha] inválidos';
      return MESSAGE_DEFAULT.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};
