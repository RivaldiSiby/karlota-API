const response = require("../../../helpers/response/response");
const { rulesLogin, rulesRegis } = require("./rules");

const authValidator = {};

authValidator.regis = (req, res, next) => {
  console.log(req.body);
  const result = rulesRegis.validate(req.body);
  if (result.error) {
    return response.error(res, 400, result.error.message);
  }
  next();
};
authValidator.login = (req, res, next) => {
  const result = rulesLogin.validate(req.body);
  if (result.error) {
    return response.error(res, 400, result.error.message);
  }
  next();
};

module.exports = authValidator;
