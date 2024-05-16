import { StateType } from './types';

export enum ACTION {
  SET_USER = 'SET_USER',
  RESET_USER = 'RESET_USER',
  SET_BANNER = 'SET_BANNER',
  RESET_BANNER = 'RESET_BANNER',
  SET_LOADING = 'SET_LOADING',
  RESET_LOADING = 'RESET_LOADING',
  SET_TOKEN = 'SET_TOKEN',
  RESET_TOKEN = 'RESET_TOKEN'
}

export const initialState: StateType = {
  user: null,
  banner: null,
  loading: false,
  token: null
};
