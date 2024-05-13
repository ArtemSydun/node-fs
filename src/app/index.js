const express = require('express');
const app = express();
const path = require('path')
const morgan = require('morgan')

require('dotenv').config();

const authRouter = require('../routers/authRouter');
const userRouter = require('../routers/userRouter')
const moviesRouter = require('../routers/moviesRouter');
const { statusCode } = require('../helpers/constants');

const staticFilesDirectoryPath = path.join(__dirname, '../../public');


app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static(staticFilesDirectoryPath));

app.use('/auth', authRouter)

app.use('/user', userRouter)

app.use('/movies', moviesRouter);

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
    status: err.status === statusCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === statusCode.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : err.data,
  });
});


module.exports = app
