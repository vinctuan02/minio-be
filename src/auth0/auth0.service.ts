import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Auth0UserInfo } from 'src/auth/interfaces/auth.interface';
import { UserAuth0Service } from 'src/user/services/user-auth0.service';
import { LoginEventBody } from './interfaces/auth0.interface';

@Injectable()
export class Auth0Service {
	constructor(
		private readonly userAuth0Service: UserAuth0Service,
		private readonly configService: ConfigService,
	) {}

	async handleWebhook(body: LoginEventBody) {
		const { type, sub, email, name, picture } = body;

		if (type === 'signup') {
			const existing = await this.userAuth0Service.findByAuth0Sub(sub);
			if (!existing) {
				await this.userAuth0Service.createFromAuth0({
					sub,
					email,
					name,
					picture,
				});
			}
		}
	}

	async getUserInfoFromAuth0(req: Request): Promise<Auth0UserInfo | null> {
		const authHeader = req.headers['authorization'];
		const accessToken = authHeader?.startsWith('Bearer ')
			? authHeader.split(' ')[1]
			: null;

		if (!accessToken) return null;

		try {
			const res = await fetch(
				this.configService.get<string>('AUTH0_USERINFO'),
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				},
			);

			if (!res.ok) return null;

			return await res.json();
		} catch {
			return null;
		}
	}
}
