import 'dotenv/config';  // Ensure environment variables are loaded
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/**/*.entity{.js,.ts}'],
};

console.log('dataSourceOptions', dataSourceOptions)
  
export default new DataSource(dataSourceOptions);