/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Card, Stack, CardMedia, Typography, Box, Chip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import { setLoading, resetLoading, setErrorBanner } from 'src/context/actions';
import { useAppContext } from 'src/context/context';
import { Item } from 'src/types/item';
import { ROUTES } from 'src/navigation/routes';
import { api } from 'src/api';

export const LibraryPage: React.FC = () => {
  const { dispatch } = useAppContext();

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(setLoading());
        const response = await api.getLibrary();       
        setItems(response);
        dispatch(resetLoading());
      } catch (e) {
        dispatch(resetLoading());
        dispatch(setErrorBanner());
      }
    };

    fetchItems();
  }, []);

  return (
    <Stack alignItems="center" justifyContent="center" gap="24px" flexWrap="wrap" margin="24px">
      <Typography variant='h3' width="70%">
        Збережені сервіси ШІ
      </Typography>
      {items.map(value => (
        <Card sx={{ width: '70%', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
          <Link to={`${ROUTES.DETAILS}/${value.id}`}>
            <CardMedia
              component="img"
              height="180px"
              sx={{ minWidth: '160px', maxWidth: '180px' }}
              image={api.getImageUrl(value.imageName)}
            />
          </Link>
          <Box width='100%' sx={{ padding: '16px' }}>
            <Typography variant="h4">
              {value.name}і
            </Typography>
            <Box height="8px" />
            <Typography variant="body2" color="grey.700" maxHeight="2.7rem" overflow="hidden">
              {value.description}
            </Typography>
            <Box height="8px" />
            <Stack direction="row" gap="8px">
              {value.labels?.slice(0, 2).map(label => (
                <Chip label={label} variant="outlined" />
              ))}
            </Stack>
            <Box height="8px" />
            <Stack direction="row" alignItems="center" justifyContent="flex-end" gap="8px">
              <Typography variant='caption' color="grey.700" pt="2px">Перегляди: {value.views} | Збереження: {value.saves}</Typography>
              <Rating name="read-only" value={value.rating} readOnly />
            </Stack>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};
