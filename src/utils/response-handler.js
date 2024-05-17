// src/responseHandler.js

const responseHandler = (success, message, status = 200) => ({
  success,
  status,
  message,
});

export default responseHandler;
