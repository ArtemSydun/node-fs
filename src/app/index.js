const express = require('express');
const app = express();

const userRouter = require('../routers/usersRouter');
const { statusCode } = require('../helpers/constants');

app.use(express.json());

app.use('/users', userRouter)

app.use((_, res) => {
  res.status(statusCode.NOT_FOUND).json({
    status: 'error',
    code: statusCode.NOT_FOUND,
    message: 'Not found',
  });
});

app.use((err, _, res, next) => {
  err.status = err.status ? err.status : statusCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});


module.exports = app
