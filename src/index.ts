import express, { Application, Request, Response } from 'express';
import errorMiddleware from './middleware/errors';
import config from './config';
import db from './database';

const PORT = config.port || 8080;

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello world',
  });
});

// db.connect().then(async (client) => {
//   return await client
//     .query('SELECT NOW()')
//     .then((res) => {
//       client.release();
//       console.log(res.rows);
//     })
//     .catch((err) => {
//       client.release();
//       console.log(err.stack);
//     });
// });

app.use(errorMiddleware);

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message: 'This route does not exist',
  });
});

app.listen(PORT, () => {
  console.log(`server is starting at port: ${PORT}`);
});
