import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);

    return { user_id: payload.sub, user: payload.user };
  }
}

/*
 * This JwtStrategy class is responsible for handling JWT-based authentication.
 *
 * The JWT token is extracted from the Authorization header using the ExtractJwt.fromAuthHeaderAsBearerToken() function.
 *
 * The extracted token is then validated using the JWT_SECRET from the .env file.
 *
 * If the token is valid, the validate method is called with the payload from the JWT token.
 *
 * The payload, which contains the user details, is then returned as an object with the user_id and user properties.
 *
 * This user object is then attached to the request object in the JwtAuthGuard.
 *
 * This is how the user object is available in the request object in the getProfile method in the AuthController.
 */
