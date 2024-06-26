import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/roles/role.enum';
import { Connection } from 'typeorm';

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
    // Arrange
    const newUser: CreateUserDto = {
      email: 'test@gmail.com',
      password: '123',
      first_name: 'John',
      last_name: 'Doe',
      birthday: new Date('1990-01-01'),
      roles: [Role.User],
      // add other fields as necessary
    };
    // Act
    return (
      request(app.getHttpServer())
        .post('/auth/signup')
        .send(newUser)
        // Assert
        .expect(200)
    );
  });

  it('/auth/login (POST)', async () => {
    // Arrange
    const newUser: CreateUserDto = {
      email: 'test@gmail.com',
      password: '123',
      first_name: 'John',
      last_name: 'Doe',
      birthday: new Date('1990-01-01'),
      roles: [Role.User],
    };

    await request(app.getHttpServer()).post('/auth/signup').send(newUser);

    // Act
    return (
      request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@gmail.com', password: '123' })
        // Assert
        .expect(200)
    );
  });
});
