import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor(config: ConfigService) {
    const jwtSecret = config.get<string>('JWT_SECRET') || 'default_jwt_secret';

    if (jwtSecret === 'default_jwt_secret') {
    console.warn('⚠️ WARNING: JWT_SECRET is not set. Using fallback value. Set JWT_SECRET in your .env file for production.');
    }

    super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: jwtSecret,
    });
}
async validate(payload: any) {
    return {
    userId: payload.sub,
    username: payload.username,
    role: payload.role,
    };
}
}
/*
Another option incase JWT_SECRET will not always be present:

ts
Copy
Edit
super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: config.get<string>('JWT_SECRET')!, // ← tells TS this is never undefined
});
*/