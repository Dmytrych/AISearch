import { styled, css } from '@mui/material/styles';
import { IconButton, Stack } from '@mui/material';

export const Container = styled(Stack)(
  ({ theme }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 80%;
    width: 800px;
    max-width: 800px;
    background-color: ${theme.palette.background.paper};
    border: 2px solid ${theme.palette.grey[100]},
    box-shadow: 24px;
    border-radius: 8px;
    padding: 32px;
  `
);

export const DropImageContainer = styled(Stack)(
    ({ theme }) => css`
    border: 1px solid ${theme.palette.grey[400]};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
  `
);

export const ImageContainer = styled(Stack)(
  css`
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    height: 214px;
  `
);

export const RemoveButton = styled(IconButton)(
  ({ theme }) => css`
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 50;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid ${theme.palette.primary.main};
  `
);