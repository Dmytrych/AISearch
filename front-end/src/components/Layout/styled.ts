import { Box, styled } from '@mui/material';

import { Link } from 'react-router-dom';

const headerHeight = '100px';

export const MainContainer = styled(Box)`
  min-height: 100dvh;
`;

export const HeaderContainer = styled(Box)(
  ({ theme }) => `
    width: 100%;
    height: ${headerHeight};
    position: fixed;
    top: 0;
    z-index: 10;

    padding: 0 80px;
    background-color: ${theme.palette.background.paper};
    border-bottom: 1px solid ${theme.palette.grey[300]};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
);

export const Container = styled(Box)`
  height: calc(100dvh - ${headerHeight});
  width: 100%;
  margin-top: ${headerHeight};
  position: fixed;
  display: flex;
`;

export const Content = styled(Box)(
  ({ theme }) => `
  width: 100%;
  padding: 32px 24px 40px;
  overflow-y: auto;
  background-color: ${theme.palette.background.default};
`
);

export const StyledLink = styled(Link)(
  ({ theme }) => `
   display: flex;
   flex-direction: row;
   align-items: center;
   height: 100%;
   gap: 8px; 

   color: ${theme.palette.grey[900]};

   & svg {
    font-size: 1.3rem;
  }

   &:hover {
    color: ${theme.palette.primary.main};

    & svg {
      font-size: 1.6rem;
    }
   }
`
);

