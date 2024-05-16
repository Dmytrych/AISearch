import { styled, css } from '@mui/material/styles';
import { Alert, AlertProps } from '@mui/material';

export const StyledAlert = styled(Alert)<AlertProps>(
  ({ theme, severity }) => css`
    ${severity === 'info' &&
    `
      border: 1px solid ${theme.palette.info.main};
    `}
    ${severity === 'error' &&
    `
      border: 1px solid ${theme.palette.error.main};
    `}
    ${severity === 'success' &&
    `
      border: 1px solid ${theme.palette.success.main};
    `}
  `
);
