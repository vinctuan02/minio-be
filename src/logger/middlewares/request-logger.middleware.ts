import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger.service';
import { lookup } from 'geoip-lite';
import { getClientIp } from 'request-ip';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(private readonly loggerService: LoggerService) { }

	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl } = req;

		let userId: string | undefined = undefined;
		let userEmail: string | undefined = undefined;
		let userAgent: string | undefined = undefined;
		let clientIp: string | undefined = undefined;
		let clientCountry: string | undefined = undefined;
		let clientCity: string | undefined = undefined;


		res.on('close', () => {

			userAgent = this.getHeadersProp(req, 'user-agent');
			clientIp =
				this.getHeadersProp(req, 'client-ip') ??
				getClientIp(req) ??
				req.ip;

			const geo = lookup(clientIp);
			if (geo) {
				clientCountry = geo?.country;
				clientCity = geo?.city;
			}

			const { statusCode } = res;

			// const dataToken: AccessToken | null = await this.jwtService
			// 	.getTokenPayload(req)
			// 	.catch(() => null);
			// if (dataToken) {
			// 	userId = dataToken.id;
			// 	userEmail = dataToken.sub;
			// }

			this.loggerService
				.create({
					ip: clientIp,
					method,
					originalUrl,
					userAgent,
					status: statusCode >= 200 && statusCode < 400,
					city: clientCity,
					country: clientCity
				})
				.catch(console.error);
		});

		next();
	}

	private getHeadersProp(req: Request, key: string) {
		return req.headers[key] as string;
	}
}
