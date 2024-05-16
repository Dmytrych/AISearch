import React, { useReducer } from 'react';

import { reducer } from './reducer';
import { initialState } from './constants';
import { Context } from './context';

interface Props {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}
