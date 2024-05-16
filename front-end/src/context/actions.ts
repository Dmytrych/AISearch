import { BannerData, BannerType } from 'src/types/banner';
import { User } from 'src/types/user';

import { ACTION } from './constants';

export const setUser = (value: User) => ({
  type: ACTION.SET_USER,
  payload: value,
});

export const resetUser = () => ({
  type: ACTION.RESET_USER,
});

const setBanner = (payload: BannerData) => ({
  type: ACTION.SET_BANNER,
  payload,
});

export const setErrorBanner = (message?: string) =>
  setBanner({
    message: message || 'Something went wrong. Please try again.',
    type: BannerType.error,
  });

export const setSuccessBanner = (message: string) =>
  setBanner({ message, type: BannerType.success });

export const resetBanner = () => ({
  type: ACTION.RESET_BANNER,
});

export const setLoading = () => ({
  type: ACTION.SET_LOADING,
});

export const resetLoading = () => ({
  type: ACTION.RESET_LOADING,
});
