/* eslint-disable @typescript-eslint/no-explicit-any */
export const delay = (delayInms: number, response?: any) => {
  return new Promise(resolve => setTimeout(() => resolve(response), delayInms));
};
