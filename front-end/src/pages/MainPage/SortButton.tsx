import React from 'react';

import { Button } from '@mui/material';

type Props = {
  type: string;
  name: string;
  sortBy: string;
  onClick: (type: string) => void;
}

export const SortButton: React.FC<Props> = ({ type, name, sortBy, onClick }) => {
  const handleClick = () => {
    onClick(type);
  };

  return (
    <Button 
      size="small" 
      key={type}
      onClick={handleClick} 
      variant={sortBy === type ? "contained" : 'outlined'}
    >
      {name}
    </Button>
  )
};