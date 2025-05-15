import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth.login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async register(payload: UserCreateDto) {
        return this.userService.createUser(payload);
    }

    async login(payload: AuthLoginDto) {
        const { email, password } = payload;
    }
}
