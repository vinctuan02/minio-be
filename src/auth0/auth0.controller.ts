import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Auth0Service } from './auth0.service';

@Controller('auth0')
export class Auth0Controller {
	constructor(private readonly auth0Service: Auth0Service) {}

	@Post('webhook')
	@HttpCode(200)
	handleWebhook(@Body() body: any) {
		return this.auth0Service.handleWebhook(body);
	}
}
