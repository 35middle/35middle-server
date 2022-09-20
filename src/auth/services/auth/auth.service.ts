import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<Observable<string>> {
    return from<string>(await bcrypt.hash(password, 8));
  }

  comparePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<unknown> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }
}
