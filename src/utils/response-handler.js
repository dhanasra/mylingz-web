// src/responseHandler.js

const responseHandler = (success, message, status = 200, {data = null}) => ({
  success,
  status,
  message,
  data 
});

export default responseHandler;
