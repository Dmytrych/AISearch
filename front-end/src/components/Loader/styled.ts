
import { styled, CircularProgress } from '@mui/material';

export const LoaderContainer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2); /* Semi-transparent background */
  z-index: 9999; /* Ensure it's above other content */
  overflow: hidden; /* Hide any overflowing content */
`;

export const StyledCircularProgress = styled(CircularProgress)`
  && {
    color: ${(props) => props.theme.palette.primary.main}; /* Use primary color for loader */
  }
`;