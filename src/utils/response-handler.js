// src/responseHandler.js

const responseHandler = (success, message, data, status = 200) => ({
  success,
  status,
  message,
  data
});

export default responseHandler;
