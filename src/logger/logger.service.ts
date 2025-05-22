import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerEntity } from './entities/logger.entity';

@Injectable()
export class LoggerService {
	constructor(
		@InjectRepository(LoggerEntity)
		private readonly loggerRepository: Repository<LoggerEntity>,
	) {}

	async logRequest(data: {
		method: string;
		url: string;
		ip?: string;
		userAgent?: string;
	}): Promise<void> {
		const log = this.loggerRepository.create(data);
		await this.loggerRepository.save(log);
	}
}
