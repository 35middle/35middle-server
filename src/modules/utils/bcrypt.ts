import * as bcrypt from 'bcrypt';

export const encodePassword = async (rawPassword: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(rawPassword, salt);
};

export const comparePassword = (rawPassword: string, hash: string) => {
  return bcrypt.compareSync(rawPassword, hash);
};
