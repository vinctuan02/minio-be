import { Controller, Get, Query } from '@nestjs/common';

import { MinioService } from './minio.service';
import {
  GetPresignedDownloadDto,
  GetPresignedReadDto,
  GetPresignedUploadDto,
} from './dto/presigned-url.dto';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Get('presigned-upload')
  async getUploadUrl(@Query() payload: GetPresignedUploadDto) {
    return this.minioService.getPresignedUploadUrl(payload);
  }

  @Get('presigned-read')
  async getReadUrl(@Query() payload: GetPresignedReadDto) {
    return this.minioService.getPresignedReadUrl(payload);
  }

  @Get('presigned-download')
  async getDownloadUrl(@Query() payload: GetPresignedDownloadDto) {
    return this.minioService.getPresignedDownloadUrl(payload);
  }
}
