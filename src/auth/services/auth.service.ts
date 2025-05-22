import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { UserService } from 'src/user/services/user.service';
import { AuthLoginDto } from '../dto/auth.login.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async register(payload: UserCreateDto) {
		return this.userService.createUser(payload);
	}

	async login(user: AuthLoginDto) {
		const { email, password } = user;

		const validatedUser = await this.userService.validateUser(
			email,
			password,
		);

		return this.jwtService.generateToken(validatedUser);
	}
}
