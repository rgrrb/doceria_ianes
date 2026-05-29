export const MESSAGE_DEFAULT = {
  HEADER: {
    desenvolvedor: 'Roger Ribeiro',
    status: '',
    status_code: 0,
    response: {}
  },
  SUCESS_REQUEST: {
    status: 'success',
    status_code: 200
  },
  SUCESS_CREATED: {
    status: 'success',
    status_code: 201
  },
  ERROR_BAD_REQUEST: {
    status: 'error',
    status_code: 400,
    message: 'Bad Request'
  },
  ERROR_REQUIRED_FIELDS: {
    status: 'error',
    status_code: 400,
    message: 'Required fields are missing',
    invalid_field: ''
  },
  ERROR_NOT_FOUND: {
    status: 'error',
    status_code: 404,
    message: 'Resource not found'
  },
  ERROR_UNAUTHORIZED: {
    status: 'error',
    status_code: 401,
    message: 'Unauthorized'
  },
  ERROR_INTERNAL_SERVER_CONTROLLER: {
    status: 'error',
    status_code: 500,
    message: 'Internal server error - controller'
  },
  ERROR_INTERNAL_SERVER_MODEL: {
    status: 'error',
    status_code: 500,
    message: 'Internal server error - model'
  },
  ERROR_DATABASE: {
    status: 'error',
    status_code: 500,
    message: 'Database error'
  }
};
