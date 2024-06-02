/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';

import { Card, Stack, CardMedia, Typography, Box, Chip, FormControl, OutlinedInput, InputAdornment, ButtonGroup, Rating, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';

import { setLoading, resetLoading, setErrorBanner, setSuccessBanner } from 'src/context/actions';
import { useAppContext } from 'src/context/context';
import { delay } from 'src/utils/delay';
import { CreateItemData, Item } from 'src/types/item';
import { ROUTES } from 'src/navigation/routes';
import { api } from 'src/api';

import { ItemModal } from 'src/components/ItemModal';

// import { mockItems } from './mock';
import { sortItems, filterItems } from './utils';
import { SortButton } from './SortButton';

export const MainPage: React.FC = () => {
  const { state: { user }, dispatch } = useAppContext();

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

  // DATA RELATED TO ADD ITEM MODAL
  const [openAddItemModal, setAddItemModal] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);

  const handleAddItemSubmit = async (data: CreateItemData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('url', data.url);
    formData.append('subtitle', data.subtitle);
    formData.append('description', data.description);
    formData.append('labels', JSON.stringify(data.labels));
    if (data.image) {
      formData.append('image', data.image);
    }
    
    try {
      dispatch(setLoading());

      await api.addItem(formData);       
      const response = await api.getItems();       
      setItems(response);
      setInitItems(response);

      dispatch(resetLoading());
      dispatch(setSuccessBanner('Новий сервіс доданий успішно!'));
    } catch (e) {
      dispatch(resetLoading());
      dispatch(setErrorBanner());
    }
  };

  const fetchLabels = async (description: string) => {
    try {
      dispatch(setLoading());

      const reponse = await api.getLabels({
        content: description,
      }) || [];
      const labels = reponse.map(value => value.keyword);

      setLabels(labels);

      dispatch(resetLoading());
    } catch (e) {
      dispatch(resetLoading());
      dispatch(setErrorBanner());
    }
  };

  const debouncedFetchLabels = useCallback(debounce(fetchLabels, 1000), []);

  const removeGeneratedLabel = (label: string) => {
    setLabels(prevLabels => prevLabels.filter(value => value !== label));
  }

  return (
    <>
      <Stack width="100%" gap="24px" padding="0 5%">
        <Stack width="100%">
          <FormControl fullWidth size='small'>
            <OutlinedInput
              startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
              placeholder='Пошук в імені, описі'
              value={nameSearch}
              onChange={handleNameSearchChage}
            />
          </FormControl>
          <Box height="8px" />
          <FormControl fullWidth size='small'>
            <OutlinedInput
              startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
              placeholder='Пошук в тегах'
              value={labelSearch}
              onChange={handleLabelSearchChange}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" gap="8px" alignItems="center">
          <Typography variant='button'>Сортування:</Typography>
          <ButtonGroup orientation="horizontal">
            <SortButton 
              type='rated'
              name='Найкращі оцінки'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='viewed'
              name='Найбільше переглядів'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='saved'
              name='Найбільше збережень'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='newest'
              name='Найновіші'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='oldest'
              name='Найстаріші'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='a-z'
              name='За назвою A-Z'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
            <SortButton 
              type='z-a'
              name='За назвою Z-A'
              sortBy={sortBy}
              onClick={handleSortByClick}
            />
          </ButtonGroup>
        </Stack>
        {Boolean(user && user.isAdmin) && (
          <Button variant='outlined' onClick={() => setAddItemModal(true)}>
            + Додати сервіс 
          </Button>
        )}
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
                <Typography variant='caption' color="grey.700" pt="2px">Перегляди: {value.views} | Збереження: {value.saves}</Typography>
                <Rating name="read-only" value={value.rating} readOnly />
              </Stack>
            </Box>
          </Card>
        ))}
      </Stack>
      {openAddItemModal && (
        <ItemModal
          generatedLabels={labels}
          onClose={() => {
            setAddItemModal(false);
            setLabels([]);
          }} 
          onSubmit={handleAddItemSubmit}
          onDescriptionChange={debouncedFetchLabels}
          removeGeneratedLabels={removeGeneratedLabel}
        />
      )}
    </>
  );
};
