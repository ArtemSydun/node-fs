const Joi = require("joi");
const { statusCode } = require("../helpers/constants");

const validate = (schema, body, next) => {
  if (Object.keys(body).length === 0) {
    return next({
      status: statusCode.BAD_REQUEST,
      message: "missing fields",
    });
  }
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: statusCode.BAD_REQUEST,
      message: `${message.replace(/"/g, "")}`,
    });
  }
  next();
};

const schemaCreateUser = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).max(18).required(),
});

const schemaCredentialsUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  password: Joi.string().min(6).max(18).required(),
});

const validateCreateUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

const validateCredentialsUser = (req, res, next) => {
  return validate(schemaCredentialsUser, req.body, next);
};

module.exports = { validateCreateUser, validateCredentialsUser };
