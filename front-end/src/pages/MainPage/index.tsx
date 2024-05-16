/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';

import { Card, Stack, CardMedia, Typography, Box, Chip, FormControl, OutlinedInput, InputAdornment, ButtonGroup, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';

import { setLoading, resetLoading, setErrorBanner } from 'src/context/actions';
import { useAppContext } from 'src/context/context';
import { delay } from 'src/utils/delay';
import { Item } from 'src/types/item';
import { ROUTES } from 'src/navigation/routes';
import { api } from 'src/api';

// import { mockItems } from './mock';
import { sortItems, filterItems } from './utils';
import { SortButton } from './SortButton';

export const MainPage: React.FC = () => {
  const { dispatch } = useAppContext();

  const [items, setItems] = useState<Item[]>([]);
  const [initItems, setInitItems] = useState<Item[]>([]);
  const [nameSearch, setNameSearch] = useState('');
  const [labelSearch, setLabelSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(setLoading());
        const response = await api.getItems();       
        setItems(response);
        setInitItems(response);
        dispatch(resetLoading());
      } catch (e) {
        dispatch(resetLoading());
        dispatch(setErrorBanner());
      }
    };

    fetchItems();
  }, []);

  const asyncSearchItems = async (currNameSearch: string, currLabelSearch: string, items: Item[]) => {
    dispatch(setLoading());

    const searched = filterItems(currNameSearch, currLabelSearch, items);
    const sorted = sortBy ? sortItems(sortBy, searched) : searched;

    await delay(500);
    setItems(sorted);
    dispatch(resetLoading());
  };

  const debouncedSearch = useCallback(debounce(asyncSearchItems, 300), []);

  const handleNameSearchChage = (e: any) => {
    setNameSearch(e.target.value);
    
    debouncedSearch(e.target.value, labelSearch, initItems);
  };

  const handleLabelSearchChange = (e: any) => {
    setLabelSearch(e.target.value);

    debouncedSearch(nameSearch, e.target.value, initItems);
  };

  const handleSortByClick = async (type: string) => {
    setSortBy(type);

    dispatch(setLoading());
    
    const sortedItems = sortItems(type, items);
    await delay(500);

    setItems(sortedItems);
    dispatch(resetLoading());
  }

  return (
    <>
      <Stack width="100%" gap="24px" padding="0 5%">
        <Stack width="100%">
          <FormControl fullWidth size='small'>
            <OutlinedInput
              startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
              placeholder='Search by name, description'
              value={nameSearch}
              onChange={handleNameSearchChage}
            />
          </FormControl>
          <Box height="8px" />
          <FormControl fullWidth size='small'>
            <OutlinedInput
              startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
              placeholder='Search by labels'
              value={labelSearch}
              onChange={handleLabelSearchChange}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" gap="8px" alignItems="center">
          <Typography variant='button'>Sort by</Typography>
          <ButtonGroup orientation="horizontal">
            <SortButton 
              type='rated'
              name='Best rated'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='viewed'
              name='Most viewed'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='saved'
              name='Most saved'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='newest'
              name='Newest'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='oldest'
              name='Oldest'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='a-z'
              name='By name A-Z'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='z-a'
              name='By name Z-A'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
          </ButtonGroup>
        </Stack>
      </Stack>
      <Box height="24px" />
      <Stack direction="row" alignItems="center" justifyContent="center" gap="24px" flexWrap="wrap" margin="24px">
        {items.map(value => (
          <Card sx={{ width: '45%', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
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
                {value.name}
              </Typography>
              <Box height="8px" />
              <Typography variant="body2" color="grey.700" maxHeight="2.7rem" overflow="hidden">
                {value.description}
              </Typography>
              <Box height="8px" />
              <Stack direction="row" gap="8px">
                {value.labels.slice(0, 2).map(label => (
                  <Chip label={label} variant="outlined" />
                ))}
              </Stack>
              <Box height="8px" />
              <Stack direction="row" alignItems="center" justifyContent="flex-end" gap="8px">
                <Typography variant='caption' color="grey.700" pt="2px">Views: {value.views} | Saves: {value.saves}</Typography>
                <Rating name="read-only" value={value.rating} readOnly />
              </Stack>
            </Box>
          </Card>
        ))}
      </Stack>
    </>
  );
};