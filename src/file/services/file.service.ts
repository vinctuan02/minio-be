import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { File } from "../entities/file.entity";
import { SubmitUploadFileDto } from "../dto/req/submit-upload.dto";
import { DataListSuccessDto, MetaData } from "src/common/dto/response";
import { QueryGetListFileDto } from "../dto/req/query-get-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from "src/common/functions/functions-password";
@Injectable()
export class FileService {

    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) { }

    async submitUploadFile(payload: SubmitUploadFileDto): Promise<File> {
        const { secretKey } = payload;
        const hashSecretKey = await hashPassword(secretKey);

        const file = await this.fileRepository.create({ ...payload, secretKey: hashSecretKey });
        return this.fileRepository.save(file);
    }

    async getListFile(query: QueryGetListFileDto): Promise<DataListSuccessDto<File>> {
        const { page, pageSize } = query;

        const result = await this.fileRepository.find();
        return new DataListSuccessDto<File>(result, new MetaData(page, pageSize, result.length));
    }
}
