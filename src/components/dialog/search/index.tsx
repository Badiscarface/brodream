import * as React from 'react';
// icons
import { IoSearchOutline } from 'react-icons/io5';
// mui
import { Dialog, IconButton, Stack, Typography } from '@mui/material';
// components
import Search from './search';

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        onClick={handleClickOpen}
        sx={{
          p: 1,
          px: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 10,
          width: 200,
          cursor: 'pointer',
          color: 'text.primary',
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}>
        <Typography
          variant='body1'
          color='text.secondary'>
          Recherche...
        </Typography>
        <IoSearchOutline size={20} />
      </Stack>
      <IconButton
        onClick={handleClickOpen}
        color='primary'
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          display: {
            xs: 'flex',
            md: 'none',
          },
        }}>
        <IoSearchOutline size={20} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        // sx={{ "& .MuiPaper-root": { width: 800 } }}
        maxWidth={'md'}>
        <Search onClose={handleClose} />
      </Dialog>
    </>
  );
}
