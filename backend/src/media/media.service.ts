/// <reference types="multer" />
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  private s3Client: S3Client;
  private cloudFrontDomain: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
    this.cloudFrontDomain = process.env.CLOUDFRONT_DOMAIN as string;
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{
    fileName: string;
    storageType: string;
    s3: {
      bucket: string;
      key: string;
      size: number | undefined;
      region: string;
      metadata: {
        uploadedAt: string;
        contentType: string;
      };
    };
    cloudFront: {
      url: string;
    };
  }> {
    const fileExtension = file.originalname.split('.').pop();
    const key = `media/${userId}/${uuidv4()}.${fileExtension}`;

    const res = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_MEDIA_S3_BUCKET_NAME as string,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      fileName: file.originalname,
      storageType: 's3',
      s3: {
        bucket: process.env.AWS_MEDIA_S3_BUCKET_NAME as string,
        key,
        size: res.Size,
        region: process.env.AWS_REGION as string,
        metadata: {
          uploadedAt: new Date().toISOString(),
          contentType: file.mimetype,
        },
      },
      cloudFront: {
        url: this.getMediaUrl(key),
      },
    };
  }

  getMediaUrl(key: string) {
    return `https://${this.cloudFrontDomain}/${key}`;
  }
}
