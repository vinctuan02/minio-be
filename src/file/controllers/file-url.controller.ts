import { Controller, Get, Query } from "@nestjs/common";
import { FileUrlService } from "../services/file-url.service";
import { QueryGetListFileDto } from "../dto/req/query-get-list.dto";

@Controller('file-url')
export class FileUrlController {
    constructor(private readonly fileUrlService: FileUrlService) { }

    @Get()
    async getListFileUrl(@Query() query: QueryGetListFileDto) {
        return this.fileUrlService.getListFileUrl(query);
    }
}
