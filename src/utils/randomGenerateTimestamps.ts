export const randomGenerateTimestamps = (lengthInSec: number) => {
  const hour = (lengthInSec % 86400) / 3600;
  const minute = ((lengthInSec % 86400) % 3600) / 60;
  const second = ((lengthInSec % 86400) % 3600) % 60;

  const arr = [hour, minute, second];

  return arr
    .map((e) => String(Math.floor(Math.random() * e)).padStart(2, '0'))
    .join(':');
};
