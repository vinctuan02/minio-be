
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, JwtStrategy, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
