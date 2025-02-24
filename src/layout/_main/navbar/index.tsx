'use client';
import React from 'react';

// mui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Toolbar,
  Stack,
  AppBar,
  Container,
  IconButton,
  Drawer,
  useMediaQuery,
} from '@mui/material';

// components
import Logo from '@/components/logo';

import config from '@/layout/_main/config.json';
import MenuDesktop from '../menuDesktop';
import dynamic from 'next/dynamic';
import { HiMenuAlt3 } from 'react-icons/hi';

// dynamic import components
const Search = dynamic(() => import('@/components/dialog/search'));

// ----------------------------------------------------------------------
export default function Navbar({ ...props }) {
  const { data } = props;
  const { menu } = config;
  const theme = useTheme();
  const isDeskTop = useMediaQuery(theme.breakpoints.up('sm'));
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <AppBar
        sx={{
          boxShadow: 'none',
          position: 'sticky',
          top: -0.5,
          zIndex: 999,
          backdropFilter: 'blur(6px)',
          borderRadius: 0,
          WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
          pr: '0px !important',
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.9),

          '& .toolbar': {
            justifyContent: 'space-between',
            borderRadius: 0,
            px: 0,
            py: 1.5,
            height: 90,
          },
        }}>
        <Container maxWidth='lg'>
          <Toolbar
            disableGutters
            className='toolbar'>
            <Stack
              gap={4}
              direction='row'
              alignItems={'center'}>
              <Logo />
              {isDeskTop && (
                <MenuDesktop
                  navConfig={menu}
                  data={data}
                />
              )}
            </Stack>
            <Stack
              gap={1}
              direction='row'
              alignItems={'center'}>
              <Search />
              <IconButton
                onClick={toggleDrawer(true)}
                color='primary'
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  display: {
                    xs: 'flex',
                    md: 'none',
                  },
                }}>
                <HiMenuAlt3 size={20} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          display: {
            xs: 'flex',
            md: 'none',
          },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            p: 2,
            py: 3,
          },
        }}>
        <MenuDesktop navConfig={menu} />
      </Drawer>
    </>
  );
}
