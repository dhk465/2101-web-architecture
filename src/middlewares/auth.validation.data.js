// 
// used to validate the strings for registering and logging in
//

const Joi = require('@hapi/joi')

// register
const signUpValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).required()
  });
  return schema.validate(data);
}

// login
const logInValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).required()
  });
  return schema.validate(data);
}

module.exports = {
  signUpValidation,
  logInValidation
}