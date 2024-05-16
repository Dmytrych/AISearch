import { useContext, createContext } from 'react';

import { initialState } from './constants';

export const Context = createContext({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (value?: any) => value,
});

export const useAppContext = () => useContext(Context);
