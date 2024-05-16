import { BannerData } from 'src/types/banner';
import { User } from 'src/types/user';

import { ACTION } from './constants';

export type StateType = {
  user: User | null;
  banner: BannerData | null;
  loading: boolean;
  token: null;
};
export type ActionType =
  | {
      type: ACTION.SET_USER;
      payload: User;
    }
  | {
      type: ACTION.RESET_USER;
    }
  | {
      type: ACTION.SET_BANNER;
      payload: BannerData;
    }
  | {
      type: ACTION.RESET_BANNER;
    }
  | {
    type: ACTION.SET_LOADING;
  } | {
    type: ACTION.RESET_LOADING;
  }

