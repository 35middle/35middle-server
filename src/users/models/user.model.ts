// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type } from 'os';

export interface User {
  id: number;
  email: string;
  password?: string;
  // status: UserStatus;
}

// export enum UserStatus {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
//   NON_EXIST = 'NON_EXIST',
// }

// export type CreateUserDto = {
//   email: string;
//   password?: string;
// };
