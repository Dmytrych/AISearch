import {
  Typography,
  IconButton,
  Snackbar,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

import { resetBanner } from 'src/context/actions';
import { useAppContext } from 'src/context/context';

import { StyledAlert } from './styled';

export const Banner: React.FC = () => {
  const { state: { banner }, dispatch } = useAppContext();

  const handleClose = () => {
    dispatch(resetBanner());
  };

  const handleSnackbarClose = (
    _: React.SyntheticEvent | Event,
    reason: string
  ) => {
    if (reason === 'timeout') {
      handleClose();
    }
  };

  return (
    <Snackbar
      key={new Date().getTime()}
      open={Boolean(banner)}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleSnackbarClose}
    >
      <StyledAlert
        iconMapping={{
          success: <CheckCircleIcon />,
          error: <ErrorIcon />,
          info: <InfoIcon />
        }}
        severity={banner?.type}
        action={
          <IconButton onClick={handleClose}>
            <CloseIcon height="18px" width="18px" />
          </IconButton>
        }
      >
        <Typography variant="body1" whiteSpace="pre-line">
          {banner?.message}
        </Typography>
      </StyledAlert>
    </Snackbar>
  );
};
  