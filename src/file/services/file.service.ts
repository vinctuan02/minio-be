import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataListSuccessDto } from 'src/common/dto/response.dto';
import { hashPassword } from 'src/common/functions/functions-password';
import { Repository } from 'typeorm';
import { QueryGetListFileDto } from '../dto/req/query-get-list.dto';
import { SubmitUploadFileDto } from '../dto/req/submit-upload.dto';
import { File } from '../entities/file.entity';

@Injectable()
export class FileService {
	constructor(
		@InjectRepository(File)
		private readonly fileRepository: Repository<File>,
	) {}

	async submitUploadFile(payload: SubmitUploadFileDto): Promise<File> {
		const { secretKey } = payload;
		const hashSecretKey = await hashPassword(secretKey);

		const file = await this.fileRepository.create({
			...payload,
			secretKey: hashSecretKey,
		});
		return this.fileRepository.save(file);
	}

	async getListFile(
		query: QueryGetListFileDto,
	): Promise<DataListSuccessDto<File>> {
		const { page, pageSize } = query;

		const [result, totalItems] = await this.fileRepository.findAndCount({
			skip: query.skip,
			take: query.pageSize,
		});

		return new DataListSuccessDto<File>(result, {
			currentPage: page,
			pageSize,
			totalItems,
		});
	}
}
