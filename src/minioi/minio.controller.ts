import { Controller, Get, Query } from '@nestjs/common';

import { MinioService } from './minio.service';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Get('presigned-upload')
  async getUploadUrl(@Query('filename') filename: string) {
    return this.minioService.getPresignedUploadUrl(filename);
  }

  @Get('presigned-read')
  async getReadUrl(@Query('filename') filename: string) {
    return this.minioService.getPresignedReadUrl(filename);
  }

  @Get('presigned-download')
  async getDownloadUrl(@Query('filename') filename: string) {
    return this.minioService.getPresignedDownloadUrl(filename);
  }
}
