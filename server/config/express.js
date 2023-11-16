import express from 'express';
import morgan from 'morgan';

import applyMiddlewares from '../middlewares';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

applyMiddlewares(app);

const { PORT } = process.env;

app.listen({ port: PORT }, async () => {
  console.log(`app listening on port ${PORT}!`);
});

export default app;
