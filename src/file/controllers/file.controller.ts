import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FileService } from "../services/file.service";
import { SubmitUploadFileDto } from "../dto/req/submit-upload.dto";
import { ResponseSuccessDto } from "src/common/dto/response";
import { DataListSuccessDto } from "src/common/dto/response";
import { QueryGetListFileDto } from "../dto/req/query-get-list.dto";
import { File } from "../entities/file.entity";

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post()
    async submitUploadFile(@Body() payload: SubmitUploadFileDto): Promise<ResponseSuccessDto<File>> {
        const result = await this.fileService.submitUploadFile(payload);
        return new ResponseSuccessDto(200, 'Success', result);
    }

    @Get()
    async getListFile(@Query() query: QueryGetListFileDto): Promise<ResponseSuccessDto<DataListSuccessDto<File>>> {
        const result = await this.fileService.getListFile(query);
        return new ResponseSuccessDto(200, 'Success', result);
    }
}

