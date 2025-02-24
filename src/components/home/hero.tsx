'use client';
import React from 'react';
// mui
import {
  Box,
  // Container,
  Grid2,
  Typography,
  Button,
  Stack,
} from '@mui/material';
// next
import Image from 'next/image';
// images
import HeroImg from '../../../public/images/hero.webp';
import { useRouter } from 'next-nprogress-bar';

export default function Hero() {
  const router = useRouter();
  return (
    <Box
      sx={{
        position: 'relative',
      }}>
      <Grid2
        container
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems='center'>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: 'relative',
              height: { xs: 250, md: 500 },
              img: {
                objectFit: 'cover',
              },
            }}>
            <Image
              src={HeroImg}
              alt='Hero Img'
              fill
              priority
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box sx={{ maxWidth: '678px', ml: { xs: 0, md: 5 } }}>
            <Stack
              spacing={3}
              py={4}>
              <Typography
                variant='h2'
                color='text.primary'>
                Personnaliser des vêtements en broderie et impression
              </Typography>
              <Typography variant='body1'>
                Pour particulier, entreprise, association, collectivité…
              </Typography>
              <Box>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => router.push('/personalize')}>
                  NOS PRODUITS
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
