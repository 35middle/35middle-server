import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = '35middle-dev-assets/videos';
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  });

  async uploadFile(file, fileName) {
    await this.s3_upload(file, this.AWS_S3_BUCKET, fileName);
  }

  async s3_upload(file, bucket, name) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  }
}
