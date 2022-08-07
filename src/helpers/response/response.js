const response = {};

response.success = (res, status, msg) => {
  return res.status(status).send({
    status: "success",
    message: msg,
  });
};
response.error = (res, status, msg) => {
  return res.status(status).send({
    status: "error",
    message: msg,
  });
};
response.successHaveData = (res, status, msg, data) => {
  return res.status(status).send({
    status: "success",
    message: msg,
    data,
  });
};
response.successHavePagination = (res, status, msg, data, pagination) => {
  return res.status(status).send({
    status: "success",
    message: msg,
    data,
    pagination,
  });
};

module.exports = response;
