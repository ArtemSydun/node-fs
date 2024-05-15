import express, { Express } from 'express';
import { Request, Response, NextFunction } from 'express';
import { statusCode } from '../helpers/constants';
import userRouter from '../routers/usersRouter';

export const app: Express = express();

app.use(express.json());

app.use('/users', userRouter)

app.use((_, res) => {
  res.status(statusCode.NOT_FOUND).json({
    status: 'error',
    code: statusCode.NOT_FOUND,
    message: 'Not found',
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status ? err.status : statusCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

export default app;
