import { ACTION, initialState } from './constants';
import { ActionType, StateType } from './types';

export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ACTION.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ACTION.RESET_USER:
      return {
        ...state,
        user: null,
      };

    case ACTION.SET_BANNER:
      return {
        ...state,
        banner: action.payload,
      };

    case ACTION.RESET_BANNER:
      return {
        ...state,
        banner: initialState.banner,
      };

    case ACTION.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ACTION.RESET_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
