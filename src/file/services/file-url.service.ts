import { Injectable } from "@nestjs/common";
import { MinioService } from "src/minioi/minio.service";
import { QueryGetListFileDto } from "../dto/req/query-get-list.dto";
import { DataListSuccessDto } from "src/common/dto/response";
import { FileService } from "./file.service";
import { GetPresignedReadUrlsDto } from "src/minioi/dto/presigned-url.dto";

@Injectable()
export class FileUrlService {
    constructor(
        private readonly minioService: MinioService,
        private readonly fileService: FileService
    ) { }

    async getListFileUrl(query: QueryGetListFileDto) {
        const listFile = (await this.fileService.getListFile(query)).item;
        const readPayloads: GetPresignedReadUrlsDto[] = listFile.map(file => ({
            fileId: file.id,
            key: file.key,
            bucketName: file.bucketName,
            endpoint: file.endpoint,
            accessKey: file.accessKey,
            secretKey: file.secretKey,
        }));
        const presignedReadUrls = await this.minioService.getPresignedReadUrls(readPayloads);
        return presignedReadUrls;
    }
}
