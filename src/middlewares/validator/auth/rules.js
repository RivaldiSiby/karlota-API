const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const rulesRegis = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: JoiPassword.string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1),
  gender: Joi.string().valid("male", "female").required(),
});
const rulesLogin = Joi.object({
  email: Joi.string().required().email(),
  password: JoiPassword.string().required(),
});

module.exports = { rulesRegis, rulesLogin };
