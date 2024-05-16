import { styled, css } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(
  ({ theme }) => css`
    & .Mui-disabled input {
      color: ${theme.palette.grey[700]};
      -webkit-text-fill-color: ${theme.palette.grey[700]};
    }
    & input {
      color: ${theme.palette.grey[900]};
      -webkit-text-fill-color: ${theme.palette.grey[900]};
    }
  `
);
