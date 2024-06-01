import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
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
import { MembershipPackageFeaturesModule } from './membership-package-features/membership-package-features.module';
import { dbConfig } from './data.source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load the .env file
    TypeOrmModule.forRoot(dbConfig), // Connect to the database
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
    MembershipPackageFeaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
