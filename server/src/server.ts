import cors from 'cors';
import express, { Express } from 'express';
import { routes } from './routes';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333, () => {
  console.log('Server running on http://localhost:3333');
});
