import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const ENCRYPTION_PASSPHASE = 'Password used to generate key';
const ENCRYPTION_SALT = 'salt';

@Injectable()
export class EncryptionService {
  private algorithm = 'aes-256-ctr';

  private getIv() {
    return randomBytes(16);
  }

  private async getKey() {
    return (await promisify(scrypt)(
      ENCRYPTION_PASSPHASE,
      ENCRYPTION_SALT,
      32,
    )) as Buffer;
  }

  async encryptText(textToEncrypt: string) {
    const alg = this.algorithm;
    const key = await this.getKey();
    const iv = this.getIv();

    const cipher = createCipheriv(alg, key, iv);
    return Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]).toString();
  }

  async decryptText(encryptedText: string) {
    const alg = this.algorithm;
    const key = await this.getKey();
    const iv = this.getIv();

    const decipher = createDecipheriv(alg, key, iv);
    return Buffer.concat([
      decipher.update(encryptedText, 'utf-8'),
      decipher.final(),
    ]).toString();
  }
}
