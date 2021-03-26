import userRouter from './users.route'

export default (app) => {
  app.use('/', userRouter);
};

