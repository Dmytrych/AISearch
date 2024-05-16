import { Typography, Stack } from '@mui/material';

import { Outlet } from 'react-router-dom';

import SmartToyIcon from '@mui/icons-material/SmartToy';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { resetUser } from 'src/context/actions';

import { Container, Content, HeaderContainer, MainContainer, StyledLink } from './styled';
import { ROUTES } from 'src/navigation/routes';
import { useAppContext } from 'src/context/context';

export const Layout: React.FC = () => {
  const { state: { user }, dispatch } = useAppContext();
  const logout = () => {
    localStorage.setItem("access_token", '');
    dispatch(resetUser());
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <StyledLink to={ROUTES.MAIN}>
          <SmartToyIcon sx={{ fontSize: '2.5rem !important' }} />
          <Typography variant="h1" textTransform="uppercase">
            Ai Tools
          </Typography>
        </StyledLink>

        {user ? (
          <Stack direction="row" alignItems="center" height="100%" gap="32px">
            <StyledLink to={ROUTES.LIBRARY}>
              <AutoStoriesIcon />
              <Typography variant='h4' textTransform="uppercase">
                Library
              </Typography>
            </StyledLink>

            <StyledLink to={ROUTES.PROFILE}>
              <PersonIcon />
              <Typography variant='h4' textTransform="uppercase">
                Profile
              </Typography>
            </StyledLink>

            <StyledLink to={ROUTES.MAIN} onClick={logout}>
              <LogoutIcon />
              <Typography variant='h4' textTransform="uppercase">
                Sign Out
              </Typography>
            </StyledLink>
          </Stack>
        ) : (
          <StyledLink to={ROUTES.LOGIN}>
            <LoginIcon />
            <Typography variant='h4' textTransform="uppercase">
              Sign In
            </Typography>
          </StyledLink>
        )}
      </HeaderContainer>

      <Container>
        <Content>
          <Outlet />
        </Content>
      </Container>
    </MainContainer>
  );
};
