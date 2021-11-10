import 'reflect-metadata';
import express, { Request, Response, RequestHandler } from 'express';
import { ValidationError } from 'express-validation';
import routes from './config/routers';
import { createConnection } from 'typeorm';
import dbConfig from './config/db';

/**
 * Configuration express server
 */
const PORT = process.env.PORT;
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

/**
 * Configuration API
 */
app.use('/api/', routes);

/**
 * ValidationError middleware
 */
app.use((err: ValidationError, req: Request, res: Response, next: RequestHandler) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

/**
 * Connect to postgres database use typeorm
 */
createConnection(dbConfig).then(
  () => {
    console.log('Connected DB');

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  },
  (error) => {
    console.error(error);
  },
);
