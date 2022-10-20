import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendForgetPasswordLink(userEmail: string, forgetPasswordLink: string) {
    const emailServiceSnsTopicArn = this.configService.get<string>(
      'app.emailServiceSnsTopicArn',
    );

    const snsRegion = this.configService.get<string>('app.snsRegion');

    const payload = {
      userEmail,
      forgetPasswordLink,
    };

    const sns = new SNSClient({
      region: snsRegion,
      credentials: fromNodeProviderChain(),
    });

    const data = await sns.send(
      new PublishCommand({
        TopicArn: emailServiceSnsTopicArn,
        Message: JSON.stringify(payload),
      }),
    ); // this probably would never fail

    return data.MessageId;
  }
}
