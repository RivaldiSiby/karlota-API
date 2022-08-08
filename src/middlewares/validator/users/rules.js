const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const rulesUpdateProfile = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string().valid("male", "female"),
  description: Joi.string(),
});
const rulesUpdatePassword = Joi.object({
  oldPassword: JoiPassword.string().required(),
  newPassword: JoiPassword.string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
});

module.exports = { rulesUpdateProfile, rulesUpdatePassword };
