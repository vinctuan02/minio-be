import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { AuthLoginDto } from './dto/auth.login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() payload: UserCreateDto) {
        return this.authService.register(payload);
    }

    @Post('login')
    async login(@Body() payload: AuthLoginDto) {
        return this.authService.login(payload);
    }
}
