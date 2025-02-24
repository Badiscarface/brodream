'use client';
import React from 'react';
import NextLink from 'next/link';

// mui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Typography,
  Container,
  Stack,
  Box,
  IconButton,
  Grid,
  Link,
  Fab,
  Divider,
} from '@mui/material';

// components
import NewsLetter from './newsletter';
import Logo from '@/components/logo';

// icons
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import { MdOutlineCall } from 'react-icons/md';

const SOCIAL_MEDIA_LINK = [
  {
    linkPath: 'https://www.facebook.com',
    icon: <FaFacebookF size={18} />,
  },
  {
    linkPath: 'https://www.instagram.com',
    icon: <FaInstagram size={18} />,
  },
  {
    linkPath: 'https://www.linkedin.com',
    icon: <FaLinkedinIn size={18} />,
  },
];

const ADDRESS = [
  {
    name: 'Ohio St. South Gate, CA 90280',
    icon: <MdOutlineLocationOn />,
  },
  {
    name: 'johndoe@yahoo.com',
    linkPath: '/',
    icon: <FiMail fontSize={20} />,
  },
  {
    name: '+1 386-688-3295',
    linkPath: '/',
    icon: <MdOutlineCall />,
  },
];

const MAIN_LINKS = [
  {
    heading: 'Ressources',
    listText1: 'Contactez-nous',
    listLink1: '/contact',
    listText2: 'Produits',
    listLink2: '/products',
    listText3: 'Broderie',
    listLink3: '/broderie',
    listText4: 'Impression de numéros',
    listLink4: '/number-printing',
  },
  {
    heading: 'À propos de nous',
    listText1: 'À propos de nous',
    listLink1: '/about',
    listText2: 'Politique de confidentialité',
    listLink2: '/privacy-policy',
    listText3: 'Termes et Conditions',
    listLink3: '/terms-and-conditions',
    listText4: 'Politique de retour de remboursement',
    listLink4: '/refund-return-policy',
  },
];

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: (theme) => alpha(theme.palette.info.light, 0.1),
        py: 4,
        mt: 7,
        overflow: 'hidden',
        position: 'relative',
      }}>
      <Container>
        <Grid
          container
          spacing={4}>
          <Grid
            item
            md={4}>
            <Stack spacing={3}>
              <Logo />
              <Typography
                variant='body1'
                color='text.secondary'>
                Nous sommes des experts en communication textile, prêts à vous
                offrir des solutions simples et efficaces. Faites confiance à
                notre expertise pour une communication réussie !
              </Typography>
              <Stack>
                {ADDRESS.map((item, idx) => (
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    key={idx}>
                    <IconButton
                      sx={{
                        svg: {
                          color: theme.palette.primary.main,
                        },
                      }}>
                      {item.icon}
                    </IconButton>
                    <Typography
                      variant='body1'
                      color='text.secondary'
                      component={NextLink}
                      href={`${item.linkPath}`}
                      sx={{
                        ':hover': {
                          color: theme.palette.primary.main,
                        },
                      }}>
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
          {MAIN_LINKS.map((item, idx) => (
            <Grid
              item
              md={2}
              key={idx}>
              <Stack spacing={3}>
                <Typography
                  variant='h5'
                  color='text.primary'>
                  {item.heading}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}>
                  <Link
                    href={`${item.listLink1}`}
                    component={NextLink}
                    underline='none'
                    sx={{
                      color: 'text.secondary',
                      transition: '0.3s ease-in-out',
                      ':hover': {
                        color: theme.palette.primary.main,
                        transform: 'translateX(10px)',
                      },
                    }}>
                    {item.listText1}
                  </Link>
                  <Link
                    href={`${item.listLink2}`}
                    component={NextLink}
                    underline='none'
                    sx={{
                      color: 'text.secondary',
                      transition: '0.3s ease-in-out',
                      ':hover': {
                        color: theme.palette.primary.main,
                        transform: 'translateX(10px)',
                      },
                    }}>
                    {item.listText2}
                  </Link>
                  <Link
                    href={`${item.listLink3}`}
                    component={NextLink}
                    underline='none'
                    sx={{
                      color: 'text.secondary',
                      transition: '0.3s ease-in-out',
                      ':hover': {
                        color: theme.palette.primary.main,
                        transform: 'translateX(10px)',
                      },
                    }}>
                    {item.listText3}
                  </Link>
                  <Link
                    href={`${item.listLink4}`}
                    component={NextLink}
                    underline='none'
                    sx={{
                      color: 'text.secondary',
                      transition: '0.3s ease-in-out',
                      ':hover': {
                        color: theme.palette.primary.main,
                        transform: 'translateX(10px)',
                      },
                    }}>
                    {item.listText4}
                  </Link>
                </Box>
              </Stack>
            </Grid>
          ))}

          <Grid
            item
            md={4}>
            <Stack spacing={3}>
              <Typography
                variant='h5'
                color='text.primary'>
                Rejoignez une newsletter
              </Typography>
              <NewsLetter />

              <Stack
                direction='row'
                alignItems='center'
                spacing={2}>
                {SOCIAL_MEDIA_LINK.map((item, idx) => (
                  <Fab
                    size='small'
                    color='primary'
                    key={idx}
                    component={NextLink}
                    href={item.linkPath}
                    sx={{
                      zIndex: 1,
                    }}>
                    {item.icon}
                  </Fab>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography
          variant='body1'
          color='text.primary'
          textAlign='center'>
          © 2024 Brodream. Tous droits réservés
        </Typography>
      </Container>
    </Box>
  );
}
