import express, { Application, Request, Response } from 'express';
import errorMiddleware from './middleware/errors';
import config from './config';
import routes from './routes';

const PORT = config.port || 8080;

const app: Application = express();

app.use(express.json());

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world',
  });
});

app.use(errorMiddleware);

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message: 'This route does not exist',
  });
});

app.listen(PORT, () => {
  console.log(`server is starting at port: ${PORT}`);
});

export default app;
