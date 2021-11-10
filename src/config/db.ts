import { ConnectionOptions } from 'typeorm';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Product, Category],
  synchronize: true,
};

export default config;
