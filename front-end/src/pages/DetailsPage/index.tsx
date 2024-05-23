/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, CardMedia, Typography, Box, Chip, Rating, Divider, Button, TextField, Link, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { setLoading, resetLoading, setErrorBanner, setSuccessBanner } from 'src/context/actions';
import { useAppContext } from 'src/context/context';
import { Item } from 'src/types/item';
import { Rate } from 'src/types/rate';
import { api } from 'src/api';

export const DetailsPage: React.FC = () => {
  const { state: { user }, dispatch } = useAppContext();
  const { id } = useParams();
  const theme = useTheme();

  const [item, setItem] = useState<Item>();
  const [rates, setRates] = useState<Rate[]>();

  const [comment, setComment] = useState<string>();
  const [rate, setRate] = useState<number | null>(0);

  const [savedToLibrary, setSavedToLibrary] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        dispatch(setLoading());
        if (!id) {
          throw new Error();
        }
        const itemResponse = await api.getItem(id);
        const rateResponse = await api.getItemRates(id);
        if (user) {
          const libraryResponse = await api.getLibrary();
          console.log(libraryResponse);
          setSavedToLibrary(libraryResponse.some(value => value.id === Number(id)));
        }
        setItem(itemResponse);
        setRates(rateResponse);
        
        dispatch(resetLoading());
      } catch (e) {
        dispatch(resetLoading());
        dispatch(setErrorBanner());
      }
    };

    fetchItem();
  }, []);

  const handleAddRateClick = async () => {
    try {
      dispatch(setLoading());

      if (!id || !rate) {
        throw new Error();
      }

      await api.rateItem({
        applicationId: Number(id),
        rating: rate,
        comment: comment
      });

      const itemResponse = await api.getItem(id);
      const rateResponse = await api.getItemRates(id);
      setItem(itemResponse);
      setRates(rateResponse);

      dispatch(resetLoading());
      dispatch(setSuccessBanner('Your rating was saved!'));
    } catch (e) {
      dispatch(resetLoading());
      dispatch(setErrorBanner());
    } finally {
      setComment('');
      setRate(0);
    }
  };

  const handleSaveToLibraryClick = async () => {
    try {
      dispatch(setLoading());

      if (!id) {
        throw new Error();
      }

      await api.saveToLibrary(id);

      setSavedToLibrary(true);

      dispatch(resetLoading());
      dispatch(setSuccessBanner('Сервіс збережено до бібліотеки!'));
    } catch (e) {
      dispatch(resetLoading());
      dispatch(setErrorBanner());
    }
  };

  const handleRemoveFromLibraryClick = async () => {
    try {
      dispatch(setLoading());

      if (!id) {
        throw new Error();
      }

      await api.deleteFromLibrary(id);

      setSavedToLibrary(false);

      dispatch(resetLoading());
      dispatch(setSuccessBanner('Сервіс видалено з бібліотеки!'));
    } catch (e) {
      dispatch(resetLoading());
      dispatch(setErrorBanner());
    }
  };

  if (!item) {
    return null;
  }

  const createdAtDate = new Date(item.createdAt);
  const updatedAtDate = new Date(item.updatedAt);

  return (
    <Stack alignItems="center">
      <Stack maxWidth="50%">
        <Stack padding="24px 0" direction="row">
          <Box sx={{ paddingRight: '16px' }}>
            <Link href={item.url} target="_blank">
              <Typography variant="h2">
                {item.name}
              </Typography>
            </Link>
            <Box height="8px" />
            <Typography variant="h4" color="grey.700">
              {item.subtitle}
            </Typography>
            <Box height="16px" />
            <Typography variant="body1" color="grey.700">
              {item.description}
            </Typography>
            <Box height="32px" />
            {item.labels?.length && <Stack direction="row" gap="8px" marginBottom="24px">
              {item.labels?.map(label => (
                <Chip label={label} variant="outlined" />
              ))}
            </Stack>}
            <Stack gap="16px">
              <Rating name="read-only" size='large' value={item.rating} readOnly />
              <Typography variant='body2' color="grey.700" pt="2px">Кількість оцінок: {item.ratedCount}</Typography>
              <Typography variant='body2' color="grey.700" pt="2px">Перегляди: {item.views}</Typography>
              <Typography variant='body2' color="grey.700" pt="2px">Збереження: {item.saves}</Typography>
              <Typography variant="body2" color="grey.700">
                Дата створення: {createdAtDate.toLocaleDateString()} {createdAtDate.toLocaleTimeString()}
              </Typography>
              <Typography variant="body2" color="grey.700">
                Дата оновлення: {updatedAtDate.toLocaleDateString()} {updatedAtDate.toLocaleTimeString()}
              </Typography>
            </Stack>
          </Box>
          <Stack gap="24px">
            <CardMedia
              component="img"
              height="300px"
              sx={{ minWidth: '300px', maxWidth: '300px', borderRadius: '8px' }}
              image={api.getImageUrl(item.imageName)}
            />
            {!!user && (
              savedToLibrary ? (
                <Button variant='outlined' onClick={handleRemoveFromLibraryClick}>
                  — Видалити з бібліотеки
                </Button>
              ) : ( 
                <Button variant='outlined' onClick={handleSaveToLibraryClick}>
                  + Зберегти до бібліотеки
                </Button>
              )
            )}
          </Stack>
        </Stack>
        <Typography variant='h3'>
          {rates?.length || 0} {rates?.length == 1 ? 'Коментар' : 'Коментарів'} {/* TODO S */}
        </Typography>
        {!!user && (
          <Stack 
            border="1px solid" 
            borderColor={theme.palette.grey[300]} 
            borderRadius="4px" 
            gap="24px" 
            padding="24px" 
            margin="24px"
          >
            <Stack direction="row" alignItems="center" gap="8px">
              <Typography variant="body1">
                Rate {item.name}
              </Typography>
              <Rating size='large' value={rate} onChange={(_, newValue) => setRate(newValue)} />
            </Stack>
            <TextField
              label="Коментар (не обов'язково)"
              variant="outlined"
              multiline
              minRows={3}
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button 
              disableRipple
              disabled={!rate}
              variant="outlined" 
              color="primary"
              onClick={handleAddRateClick}
            >
              + Add rate
            </Button>
          </Stack>
        )}
        {!!rates && rates.map((rate, index) => (
          <Stack key={rate.id} gap="8px" paddingTop="16px">
            <Rating size='small' value={rate.rating} readOnly />
            <Typography variant='body1'>{rate.comment}</Typography>
            <Stack direction="row" color={theme.palette.grey[600]} gap="8px" paddingBottom="8px" alignItems="center">
              <PersonIcon height="8px" />
              <Typography variant='body2'>{rate.nickname} - {(new Date(rate.createdAt)).toLocaleDateString()}</Typography>
            </Stack>
            {index !== rates.length - 1 && <Divider />}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
