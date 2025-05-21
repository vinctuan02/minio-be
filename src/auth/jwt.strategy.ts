import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-sxpuj2rwvzuos4jo.us.auth0.com/.well-known/jwks.json',
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'https://minio-api',
      issuer: 'https://dev-sxpuj2rwvzuos4jo.us.auth0.com/',
      algorithms: ['RS256'],
      passReqToCallback: true, 
    });
  }

  async validate(req: Request, payload: any) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    console.log('✅ [JwtStrategy] Token payload received:', payload);

    if (!accessToken) {
      console.warn('⚠️ No access token found in request');
      return payload;
    }

    try {
      const res = await fetch('https://dev-sxpuj2rwvzuos4jo.us.auth0.com/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`❌ /userinfo failed (${res.status}): ${errText}`);
        return payload;
      }

      const userInfo = await res.json();
      console.log('👤 Auth0 User Info:', userInfo);

      return { ...payload, ...userInfo }; // merge nếu muốn req.user có đủ
    } catch (err) {
      console.error('❌ Error fetching /userinfo:', err);
      return payload;
    }
  }
}
