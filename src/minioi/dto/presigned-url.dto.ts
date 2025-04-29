import { IsNotEmpty } from 'class-validator';

export class GetPresignedUploadDto {
  @IsNotEmpty()
  fileName: string;

  @IsNotEmpty()
  bucketName: string;

  @IsNotEmpty()
  contentType: string;
}

export class GetPresignedReadDto {
  @IsNotEmpty()
  fileName: string;

  @IsNotEmpty()
  bucketName: string;
}

export class GetPresignedDownloadDto {
  @IsNotEmpty()
  fileName: string;

  @IsNotEmpty()
  bucketName: string;
}
