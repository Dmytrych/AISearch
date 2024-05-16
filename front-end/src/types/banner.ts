export enum BannerType {
  success = 'success',
  error = 'error',
  info = 'info',
}
  
export type BannerData = {
  type: BannerType;
  message: string;
};
