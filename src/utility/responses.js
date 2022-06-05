const successResponse = (data) => {
  const result = {
    isSuccess: "true",
    message: "success",
    code: 200,
    data: data,
  };
  return result;
};

const notFoundResponse = (message) => {
  const result = {
    isSuccess: "false",
    message: message,
    code: 404,
    data: null,
  };
  return result;
};

const internalFailureResponse = (data) => {
  const result = {
    isSuccess: "false",
    message: "internal server error",
    code: 500,
    data: data,
  };
  return result;
};

const authFailureResponse = (message) => {
  const result = {
    isSuccess: "false",
    message: message,
    code: 401,
    data: null,
  };
  return result;
};

const conflictResponse = (message) => {
  const result = {
    isSuccess: "false",
    message: message,
    code: 409,
    data: null,
  };
  return result;
};

const badRequestResponse = (message) => {
  const result = {
    isSuccess: "false",
    message: message,
    code: 400,
    data: null,
  };
  return result;
};

module.exports = {
  successResponse,
  internalFailureResponse,
  badRequestResponse,
  authFailureResponse,
  notFoundResponse,
  conflictResponse,
};
