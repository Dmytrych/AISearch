import React, { useState, useCallback, useEffect } from 'react';

import { Button, Typography, Modal, Stack, IconButton, TextField, Chip, Tooltip } from '@mui/material';
import { useDropzone, FileRejection } from 'react-dropzone';

import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';

import { CreateItemData } from 'src/types/item';

import { Container, DropImageContainer, RemoveButton, ImageContainer } from './styled';

interface Props {
  data?: CreateItemData;
  generatedLabels: string[];
  onClose: () => void;
  onSubmit: (data: CreateItemData) => void;
  onDescriptionChange: (desctiption: string) => void;
  removeGeneratedLabels: (label: string) => void;
}

export const defaultData = {
  name: '',
  subtitle: '',
  url: '',
  description: '',
  labels: [],
  image: undefined,
};

export const ItemModal: React.FC<Props> = ({ data = defaultData, generatedLabels, onClose, onSubmit, onDescriptionChange, removeGeneratedLabels }) => {
  const [name, setName] = useState(data.name);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [url, setUrl] = useState(data.url);
  const [description, setDescription] = useState(data.description);
  const [labels, setLabels] = useState(data.labels);
  const [image, setImage] = useState(data.image);
  const [imageError, setImageError] = useState('');

  const [newLabel, setNewLabel] = useState('');
  const [newLabelError, setNewLabelError] = useState('');

  const isEditFlow = !!data.name;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles?.length) {
      setImageError('');
      setImage(acceptedFiles[0]);
    }
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    setImageError(fileRejections[0].errors[0].message);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    onDrop,
    onDropRejected
  })

  const handleDeleteLabel = (label: string) => () => {
    setLabels(prevLabels => prevLabels.filter(value => value !== label));
  };

  const handleAddLabel = () => {
    if (labels.includes(newLabel)) {
      setNewLabelError('Введіть унікальне ключове слово.');
      return;
    }

    setLabels(prev => [...prev, newLabel]);
    setNewLabel('');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    setDescription(value);
    onDescriptionChange(value);
  }

  const handleSubmit = () => {
    onSubmit({
      name,
      subtitle,
      url,
      description,
      labels,
      image,
    });
    onClose();
  };

  const handleAddGeneratedLabel = (label: string) => () => {
    setLabels((prev) => {
      if (prev.includes(label)) {
        return prev;
      }

      return [...prev, label];
    });
    removeGeneratedLabels(label);
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Stack height="cack(100%-104px)" overflow="scroll">
        <Stack direction="row" justifyContent="flex-end" color="grey.600">
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Stack>
        <Typography variant='h3' color="grey.900" textAlign="center" mt="-32px">
          {isEditFlow ? 'Редагувати сервіс' : 'Додати сервіс'}
        </Typography>
        
        <Stack direction="row" my="32px" gap="16px">
          {typeof image === "string" ? (
            <ImageContainer flex={1}>
              <img src={image} />
            </ImageContainer>
          ) :
            image ? (
              <ImageContainer flex={1}>
                <RemoveButton color="primary" onClick={() => setImage(undefined)}>
                  <CloseIcon sx={{ fontSize: '24px' }} />
                </RemoveButton>
                <img src={URL.createObjectURL(image)} />
              </ImageContainer>
            ) : (
              <DropImageContainer flex={1} {...getRootProps()}>
                <input {...getInputProps()} />
                {imageError ? (
                  <Typography variant='body2' color="error" whiteSpace="pre-wrap" textAlign="center" padding="16px">
                    {imageError}
                  </Typography> 
                  ) : (
                  <Typography variant='body2' color="grey.700" whiteSpace="pre-wrap" textAlign="center" padding="16px">
                    {
                      isDragActive ?
                        'Drop the files here ...' :
                        "Drag 'n' drop some files here \n or click to select files."
                    }
                  </Typography>
                )}
              </DropImageContainer>
            )}
          <Stack gap="24px" flex={1}>
            <TextField
              label="Назва"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Підзаголовок"
              variant="outlined"
              fullWidth
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <TextField
              label="Посилання"
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Stack>
        </Stack>
        <TextField
          label="Опис"
          variant="outlined"
          multiline
          minRows={3}
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />

        {!!labels.length && (
          <Stack direction="row" gap="16px" marginTop="32px" alignItems="center" flexWrap="wrap">
            <Stack direction="row" gap="4px" alignItems="center" color="grey.700">
              <Typography variant="body2">
                Ключові слова:
              </Typography>
              <Tooltip arrow title="Додайте власні або згенеровані ключові слова до опису серісу" placement='top'>
                <InfoIcon />
              </Tooltip>
            </Stack>
           
            {labels.map(label => (
              <Chip label={label} color="primary" onDelete={handleDeleteLabel(label)} />
            ))}
          </Stack>
        )}
        <Stack direction="row" gap="16px" marginTop="16px" alignItems="center" flexWrap="wrap">
          <Stack direction="row" gap="4px" alignItems="center" color="grey.700">
            <Typography variant="body2">
              Ключові слова згенеровані автоматично:
            </Typography>
            <Tooltip arrow title="Ключові слова згереновані на основі опису сервісу ШІ" placement='top'>
              <InfoIcon />
            </Tooltip>
          </Stack>
        {!!generatedLabels.length && (
          generatedLabels.map(label => (
            <Chip label={label} color="primary" onDelete={handleAddGeneratedLabel(label)} deleteIcon={<AddIcon />} />
          ))
        )}
        </Stack>

        <Stack width="50%" direction="row" gap="8px" marginY="16px" justifyContent="center">
          <TextField
            label="Створити ключове слово"
            variant="outlined"
            fullWidth
            value={newLabel}
            size='small'
            onChange={(e) => {
              setNewLabel(e.target.value);
              setNewLabelError('');
            }}
            error={!!newLabelError}
            helperText={newLabelError}
          />
          <Button
            color='primary'
            variant='outlined' 
            disabled={!newLabel || !!newLabelError}
            onClick={handleAddLabel} 
            sx={{ height: '40px' }}
          >
            <AddIcon sx={{ fontSize: '24px' }} />
          </Button>
        </Stack>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" color="grey.600" pt="64px">
          <Button 
            color='primary'
            variant='contained'
            disabled={
              !name ||
              !subtitle ||
              !url ||
              !description || 
              !image
            }
            onClick={handleSubmit}
          >
            {isEditFlow ? 'Зберегти' : 'Створити'} 
          </Button>
        </Stack>
      </Container>
    </Modal>
  )
};
