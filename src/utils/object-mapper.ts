/* eslint-disable no-restricted-syntax */
export const objectMapper = <T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> => {
  const newObj: Partial<T> = {};

  for (const k in obj) {
    if (keys.some((key) => key.toLowerCase() === k.toLowerCase())) {
      newObj[k] = obj[k];
    }
  }

  return newObj;
};
