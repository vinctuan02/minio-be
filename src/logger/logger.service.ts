import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Logger } from './entities/logger.entity';
import { QueryGetListLogDto } from './dto/logger.get-list.dto';
import { DataListSuccessDto } from 'src/common/dto/response.dto';
import { CreateLogDto } from './dto/logger.create.dto';

@Injectable()
export class LoggerService {
	constructor(
		@InjectRepository(Logger)
		private readonly loggerRepository: Repository<Logger>,
	) { }

	async create(data: CreateLogDto): Promise<void> {
		const log = this.loggerRepository.create(data);
		await this.loggerRepository.save(log);
	}

	async getList(query: QueryGetListLogDto): Promise<DataListSuccessDto<Logger>> {
		const { page, pageSize, keyword } = query;

		const queryBuilder = this.loggerRepository.createQueryBuilder('logger')

		if (keyword) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					qb.where('log.content LIKE :content', {
						content: `%${keyword}%`,
					})
						.orWhere('log.email LIKE :email', {
							email: `%${keyword}%`,
						})
						.orWhere('log.userCreatorId LIKE :userCreatorId', {
							userCreatorId: `%${keyword}%`,
						})
						.orWhere('log.ip LIKE :ip', {
							ip: `%${keyword}%`,
						})
						.orWhere('log.country LIKE :country', {
							country: `%${keyword}%`,
						})
						.orWhere('log.city LIKE :city', {
							city: `%${keyword}%`,
						})
						.orWhere('log.originalUrl LIKE :originalUrl', {
							originalUrl: `%${keyword}%`,
						})
						.orWhere('log.statusCode LIKE :statusCode', {
							statusCode: `%${keyword}%`,
						})
						.orWhere('log.userAgent LIKE :userAgent', {
							userAgent: `%${keyword}%`,
						})
						.orWhere('log.note LIKE :note', {
							note: `%${keyword}%`,
						});
				}),
			);
		}

		const [listLoggers, totalItems] = await queryBuilder.getManyAndCount();

		return new DataListSuccessDto<Logger>(listLoggers, {
			currentPage: page,
			pageSize,
			totalItems,
		});
	}
}
