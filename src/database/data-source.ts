import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';

const entitiesPath = __dirname + '/../**/*.entity{.ts,.js}';
const migrationPath = __dirname + '/migrations/*{.ts,.js}';
export const dataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST,
  port: parseInt(process.env.POSTGRES_DB_PORT, 10) || 5431,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  logging: process.env.POSTGRES_DB_LOGGING === 'true',
  entities: [entitiesPath],
  migrations: [migrationPath],
  poolSize: parseInt(process.env.POSTGRES_DB_MAX_CONNECTION, 10) || 100,
  extra: {
    // based on https://node-postgres.com/api/pool
    max: parseInt(process.env.POSTGRES_DB_MAX_CONNECTION, 10) || 100,
  },
};

export default new DataSource(dataSourceOptions);
