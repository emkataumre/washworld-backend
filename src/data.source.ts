import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

export const dbConfig: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'test' ? 'washworld_test' : process.env.DB_NAME, // Use the test database if the NODE_ENV is test
  autoLoadEntities: true,
  synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  entities: ['dist/**/*.entity{.ts,.js}'], // This is the path to our entities ([User, Location, Car, Membership, Wash, Hall, Status, Package, Feature, Selfwash, MembershipPackageFeature])
  migrations: ['dist/migrations/*{.ts,.js}'], // This is the path to our migrations (migrations/1717075638272-CreatedTables.ts)
};

const dataSource = new DataSource(dbConfig);
export default dataSource;
