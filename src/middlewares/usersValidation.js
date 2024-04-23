const Joi = require('joi');
const { statusCode } = require('../helpers/constants');

const validate = (schema, body, next) => {
  if (Object.keys(body).length === 0) {
    return next({
      status: statusCode.BAD_REQUEST,
      message: 'missing fields',
    });
  }
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: statusCode.BAD_REQUEST,
      message: `${message.replace(/"/g, '')}`,
    });
  }
  next();
};

const schemaCreateUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().alphanum().min(7).max(12).required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  age: Joi.number().min(18).required(),
});

const schemaUpdateUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string().alphanum().min(7).max(12).optional(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  age: Joi.number().min(18).optional(),
});


const validateCreateUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

const validateUpdateUser = (req, res, next) => {
  return validate(schemaUpdateUser, req.body, next);
};

module.exports = { validateCreateUser, validateUpdateUser };
