import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(private readonly loggerService: LoggerService) {}

	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl } = req;
		const ip =
			req.ip ||
			req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress;
		const userAgent = req.headers['user-agent'];

		this.loggerService
			.logRequest({
				method,
				url: originalUrl,
				ip: typeof ip === 'string' ? ip : ip?.toString(),
				userAgent: userAgent || '',
			})
			.catch(console.error);

		next();
	}
}
