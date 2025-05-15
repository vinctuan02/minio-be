import { Injectable } from '@nestjs/common';
import { GetPresignedReadUrlsDto } from 'src/minoi/dto/presigned-url.dto';
import { MinioService } from 'src/minoi/minio.service';
import { QueryGetListFileDto } from '../dto/req/query-get-list.dto';
import { FileService } from './file.service';
import { PasswordService } from 'src/helper/services/password.service';
import { DataListSuccessDto } from 'src/common/dto/response.dto';
import { FileWithReadUrl } from '../interface/file.interface';

@Injectable()
export class FileUrlService {
	constructor(
		private readonly minioService: MinioService,
		private readonly fileService: FileService,
		private readonly passwordService: PasswordService,
	) { }

	async getListFileUrl(query: QueryGetListFileDto): Promise<DataListSuccessDto<FileWithReadUrl>> {
		const listFile = (await this.fileService.getListFile(query)).item;
		const readPayloads: GetPresignedReadUrlsDto[] = listFile.map((file) => {
			let secretKey = file.secretKey;
			try {
				if (secretKey) {
					secretKey = this.passwordService.decrypt(secretKey);
				}
			} catch (error) {
				secretKey = null;
			}

			return {
				fileId: file.id,
				key: file.key,
				bucketName: file.bucketName,
				endpoint: file.endpoint,
				accessKey: file.accessKey,
				secretKey,
			};
		});

		const presignedReadUrls = await this.minioService.getPresignedReadUrls(readPayloads);

		const filesWithReadUrl = listFile.map((file) => ({
			...file,
			readUrl: presignedReadUrls.get(file.id) ?? null,
		}));

		return new DataListSuccessDto<FileWithReadUrl>(filesWithReadUrl, {
			currentPage: query.page,
			pageSize: query.pageSize,
			totalItems: filesWithReadUrl.length,
		});
	}
}
