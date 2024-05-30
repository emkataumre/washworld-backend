import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/roles/role.enum';
import { Connection, getConnection } from 'typeorm';

describe('AuthController (e2e)', () => {
  let app;

  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = moduleFixture.get<Connection>(Connection);
    await connection.synchronize(true); // This will drop and recreate the database schema
  });

  it('/auth/signup (POST)', () => {
    const newUser: CreateUserDto = {
      email: 'test@gmail.com',
      password: '123',
      first_name: 'John',
      last_name: 'Doe',
      birthday: new Date('1990-01-01'),
      roles: [Role.User],
      // add other fields as necessary
    };

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUser)
      .expect(200);
  });

  it('/auth/login (POST)', async () => {
    // First, sign up a new user
    const newUser: CreateUserDto = {
      email: 'test@gmail.com',
      password: '123',
      first_name: 'John',
      last_name: 'Doe',
      birthday: new Date('1990-01-01'),
      roles: [Role.User],
      // add other fields as necessary
    };

    await request(app.getHttpServer()).post('/auth/signup').send(newUser);

    // Then, try to log in with the new user
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@gmail.com', password: '123' })
      .expect(200);
  });
});
