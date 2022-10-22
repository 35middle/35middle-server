import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  emailServiceSnsTopicArn: process.env.EMAIL_SERVICE_SNS_TOPIC_ARN,
  awsRegion: process.env.AWS_REGION,
}));
