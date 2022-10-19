import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  apiPrefix: process.env.API_PREFIX,
  emailServiceSnsTopicArn: process.env.EMAIL_SERVICE_SNS_TOPIC_ARN,
}));
