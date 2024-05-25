import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const dbConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: 'all',
    logger: 'file',
    synchronize: true,
    autoLoadEntities: true,
    migrations: [
        path.join(
            __dirname,
            '../modules/infrastructure/database/migrations/*{.ts,.js}',
        ),
    ],
} as TypeOrmModuleOptions;

const config = new DataSource(dbConfig as any);
config
    .initialize()
    .then(() => {
        console.log('Connected to the database successfully.');
    })
    .catch((err) => {
        console.error('Error trying to connect to the database', err);
    });

export default config;
