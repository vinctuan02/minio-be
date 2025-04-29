import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  GetPresignedDownloadDto,
  GetPresignedReadDto,
  GetPresignedUploadDto,
} from './dto/presigned-url.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: 'us-east-1',
      endpoint: this.configService.get<string>('URL_MINIO'),
      credentials: {
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID_MINIO')!,
        secretAccessKey: this.configService.get<string>(
          'SECRET_ACCESS_KEY_MINIO',
        )!,
      },
      forcePathStyle: true,
    });
  }

  async getPresignedUploadUrl(payload: GetPresignedUploadDto) {
    const { fileName, bucketName, contentType } = payload;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: contentType,
    });
    return await getSignedUrl(this.s3, command, { expiresIn: 10 * 3600 });
  }

  async getPresignedReadUrl(payload: GetPresignedReadDto) {
    const { fileName, bucketName } = payload;
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });
    return await getSignedUrl(this.s3, command, { expiresIn: 10 * 3600 });
  }

  async getPresignedDownloadUrl(payload: GetPresignedDownloadDto) {
    const { fileName, bucketName } = payload;

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ResponseContentDisposition: `attachment; filename="${fileName}"`,
    });
    return await getSignedUrl(this.s3, command, { expiresIn: 10 * 3600 });
  }
}
