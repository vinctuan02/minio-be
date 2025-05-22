import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { Public } from './decorators/auth.decorators';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('register')
	async register(@Body() payload: UserCreateDto) {
		return this.authService.register(payload);
	}

	@Public()
	@Post('login')
	async login(@Body() payload: AuthLoginDto) {
		return this.authService.login(payload);
	}
}
