import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { useAppContext } from 'src/context/context';
import { setLoading, resetLoading, setErrorBanner } from 'src/context/actions';
import { api } from 'src/api';
import { User } from 'src/types/user';

import { StyledTextField } from './styled';

export const ProfilePage: React.FC = () => {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState<User>();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const { dispatch } = useAppContext();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch(setLoading());
        const response = await api.getProfile();   
        setProfile(response);
        setNickname(response.nickname);
        setEmail(response.email);
     
        dispatch(resetLoading());
      } catch (e) {
        dispatch(resetLoading());
        dispatch(setErrorBanner());
      }
    };

    fetchProfile();
  }, []);

  const handleMainButtonClick = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    try {
      dispatch(setLoading());
      
      const response = await api.editProfile({
        nickname,
        email,
      });
      setProfile(response);

      dispatch(resetLoading());
      setEditMode(false);
    } catch (e) {
      setNickname(profile?.nickname || '');
      setEmail(profile?.email || '');
      setEditMode(false);
      dispatch(resetLoading());
      dispatch(setErrorBanner((e as Error).message));
    }
  };

  const handleCancelClick = () => {
    setNickname(profile?.nickname || '');
    setEmail(profile?.email || '');
    setEditMode(false);
  };

  const createdAtDate = profile?.createdAt ? new Date(profile.createdAt) : null;

  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <Stack width="30%" marginBottom="10%">
        <Stack direction="row" gap="8px" alignItems="center">
          <PersonIcon fontSize="large" color="primary" />
          <Typography variant="h2" color="primary">
            Профіль
          </Typography>
        </Stack>
        <Box height="24px" />  
        <Stack gap="16px">
          <StyledTextField
            disabled={!editMode}
            label="Ім'я"
            variant="outlined"
            fullWidth
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <StyledTextField
            disabled={!editMode}
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
        <Stack gap="8px" marginTop="16px" alignItems="flex-end">
          {createdAtDate && <Typography variant="body2" color="grey.700">
            Дата створення: {createdAtDate.toLocaleDateString()} {createdAtDate.toLocaleTimeString()}
          </Typography>}
        </Stack>
        <Stack direction="row" mt="24px" gap="24px">
          <Button 
            fullWidth 
            disableRipple
            variant="contained"
            color="primary" 
            onClick={handleMainButtonClick}
          >
            {editMode ? 'Зберегти' : 'Редагувати'}
          </Button>
          {editMode && <Button
            fullWidth 
            disableRipple
            variant="outlined"
            color="primary" 
            onClick={handleCancelClick}
          >
            Відміна
          </Button>}
        </Stack>
      </Stack>
    </Stack>
  );
};
