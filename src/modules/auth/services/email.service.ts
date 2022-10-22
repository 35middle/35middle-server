import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(private readonly configService: ConfigService) {}

  async sendForgetPasswordLink(userEmail: string, forgetPasswordLink: string) {
    const emailServiceSnsTopicArn = this.configService.get<string>(
      'aws.emailServiceSnsTopicArn',
    );

    const awsRegion = this.configService.get<string>('aws.awsRegion');

    const payload = {
      userEmail,
      forgetPasswordLink,
    };

    const sns = new SNSClient({
      region: awsRegion,
      credentials: fromNodeProviderChain(),
    });

    try {
      this.logger.log(`Sending forget password link to ${userEmail}`);
      const data = await sns.send(
        new PublishCommand({
          TopicArn: emailServiceSnsTopicArn,
          Message: JSON.stringify(payload),
        }),
      ); // this probably would never fail
      return data.MessageId;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
