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
  GetPresignedReadUrlsDto,
  GetPresignedUploadDto,
} from './dto/presigned-url.dto';

@Injectable()
export class MinioService {
  private createS3Client(endpoint: string, accessKey: string, secretKey: string): S3Client {
    return new S3Client({
      region: 'us-east-1',
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      forcePathStyle: true,
    });
  }

  async getPresignedUploadUrl(payload: GetPresignedUploadDto) {
    const { endpoint, accessKey, secretKey, bucketName, key, contentType } = payload;

    const s3 = this.createS3Client(endpoint, accessKey, secretKey);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    return await getSignedUrl(s3, command, { expiresIn: 10 * 3600 });
  }

  async getPresignedReadUrl(payload: GetPresignedReadDto) {
    const { key, bucketName, endpoint, accessKey, secretKey } = payload;

    const s3 = this.createS3Client(endpoint, accessKey, secretKey);

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return await getSignedUrl(s3, command, { expiresIn: 10 * 3600 });
  }

  async getPresignedReadUrls(readPayloads: GetPresignedReadUrlsDto[]): Promise<Map<string, string>> {
    const result = new Map<string, string>();

    await Promise.all(
      readPayloads.map(async (readPayload) => {
        const { fileId, key, bucketName, endpoint, accessKey, secretKey } = readPayload;
        const s3Client = this.createS3Client(endpoint, accessKey, secretKey);

        const getCommand = new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        });

        const presignedReadUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 10 * 3600 });
        result.set(fileId, presignedReadUrl);
      })
    );

    return result;
  }

  async getPresignedDownloadUrl(payload: GetPresignedDownloadDto) {
    const { key, bucketName, endpoint, accessKey, secretKey } = payload;

    const s3 = this.createS3Client(endpoint, accessKey, secretKey);

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
      ResponseContentDisposition: `attachment; filename="${key}"`,
    });

    return await getSignedUrl(s3, command, { expiresIn: 10 * 3600 });
  }
}
