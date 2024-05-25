import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HallsModule } from './halls/halls.module';
import { StatusesModule } from './statuses/statuses.module';
import { UsersModule } from './users/users.module';
import { MembershipsModule } from './memberships/memberships.module';
import { CarsModule } from './cars/cars.module';
import { PackagesModule } from './packages/packages.module';
import { FeaturesModule } from './features/features.module';
import { SelfwashesModule } from './selfwashes/selfwashes.module';
import { WashesModule } from './washes/washes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      }),
      inject: [ConfigService],
    }),
    HallsModule,
    StatusesModule,
    UsersModule,
    MembershipsModule,
    CarsModule,
    PackagesModule,
    FeaturesModule,
    SelfwashesModule,
    WashesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
