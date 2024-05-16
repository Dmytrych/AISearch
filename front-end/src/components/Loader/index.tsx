import React from 'react';

import { useAppContext } from 'src/context/context';

import { LoaderContainer, StyledCircularProgress } from './styled';

export const Loader: React.FC = () => {
  const { state: { loading } } = useAppContext();

  if (loading) {
    return (
      <LoaderContainer>
        <StyledCircularProgress size={64} />
      </LoaderContainer>
    );
  }

  return null;
};
