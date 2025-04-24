import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class MinioService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: 'us-east-1',
      endpoint: 'http://45.252.54.163:9000',
      credentials: {
        accessKeyId: 'minioadmin',
        secretAccessKey: 'minioadmin',
      },
      forcePathStyle: true,
    });
  }

  async getPresignedUploadUrl(filename: string) {
    const command = new PutObjectCommand({
      Bucket: 'test',
      Key: filename,
      ContentType: 'application/octet-stream',
    });
    return await getSignedUrl(this.s3, command, { expiresIn: 300 });
  }

  async getPresignedReadUrl(filename: string) {
    const command = new GetObjectCommand({
      Bucket: 'test',
      Key: filename,
    });
    return await getSignedUrl(this.s3, command, { expiresIn: 300 });
  }

  async getPresignedDownloadUrl(filename: string) {
    const command = new GetObjectCommand({
      Bucket: 'test',
      Key: filename,
      ResponseContentDisposition: `attachment; filename="${filename}"`,
    });
    return await getSignedUrl(this.s3, command, { expiresIn: 300 });
  }
}
