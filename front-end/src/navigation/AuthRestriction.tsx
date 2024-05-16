import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppContext } from 'src/context/context';

import { ROUTES } from './routes';

type Props = {
  children: React.ReactNode;
};

export const AuthRestriction: React.FC<Props> = ({ children }) => {
  const { state: { user } } = useAppContext();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return children;
};
