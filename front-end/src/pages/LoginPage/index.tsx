import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from 'src/context/context';
import { setLoading, resetLoading, setErrorBanner, setUser } from 'src/context/actions';
import { api } from 'src/api';
import { ROUTES } from 'src/navigation/routes';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);

  const { dispatch } = useAppContext();

  const handleLoginClick = async () => {
    if (!isLoginForm) {
      setIsLoginForm(true);
      return;
    }

    try {
      dispatch(setLoading());
      
      const response = await api.login({
        email,
        password
      });
      if ((response as unknown as { error: string }).error) {
        // BE returns error as a response with code 200
        throw new Error('Invalid credentials');
      }
      localStorage.setItem("access_token", response.token);
      dispatch(setUser(response));
      navigate(ROUTES.MAIN);

      dispatch(resetLoading());
    } catch (e) {
      localStorage.setItem("access_token", '');
      dispatch(resetLoading());
      dispatch(setErrorBanner((e as Error).message));
    }
  };

  const handleRegisterClick = async () => {
    if (isLoginForm) {
      setIsLoginForm(false);
      return;
    }

    try {
      dispatch(setLoading());
      
      await api.register({
        nickname,
        email,
        password
      });
      const response = await api.login({
        email,
        password
      });
      if ((response as unknown as { error: string }).error) {
        // BE returns error as a response with code 200
        throw new Error('Invalid credentials');
      }
      localStorage.setItem("access_token", response.token);
      dispatch(setUser(response));
      navigate(ROUTES.MAIN);

      dispatch(resetLoading());
    } catch (e) {
      localStorage.setItem("access_token", '');
      dispatch(resetLoading());
      dispatch(setErrorBanner());
    }
  };

  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <Stack width="30%" marginBottom="10%">
        <Typography variant="h2" color="primary">
          {isLoginForm ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Box height="24px" />  
        <Stack gap="16px">
          {!isLoginForm && (
            <TextField
              label="Nickname"
              variant="outlined"
              fullWidth
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Stack direction="row" mt="40px" gap="24px">
          <Button 
            fullWidth 
            disableRipple
            variant={isLoginForm ? "contained" : "outlined"}
            color="primary" 
            onClick={handleLoginClick}
          >
            Sign In
          </Button>
          <Button 
            fullWidth 
            disableRipple
            variant={!isLoginForm ? "contained" : "outlined"}
            color="primary" 
            onClick={handleRegisterClick}
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
