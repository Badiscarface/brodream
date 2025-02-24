'use client';
import React from 'react';
import {
  Grid,
  Card,
  Typography,
  Box,
  useMediaQuery,
  Divider,
} from '@mui/material';
import Image from 'next/image';

const items = [
  {
    id: 1,
    title: 'Les bébés nageurs',
    image: '/images/image-1.jpg',
    cols: 6,
  },
  {
    id: 2,
    title: 'Marinière imprimée Burger King',
    image: '/images/image-2.webp',
    cols: 6,
    subGrid: [
      {
        id: 1,
        title: 'Tablier Burger King',
        image: '/images/image-3.webp',
        cols: 12,
      },
      {
        id: 2,
        title: 'Tablier Burger King',
        image: '/images/image-4.webp',
        cols: 6,
      },
      {
        id: 3,
        title: 'Tablier Burger King',
        image: '/images/logo-burger-king-imprime.webp',
        cols: 6,
      },
    ],
  },
  {
    id: 3,
    title: 'Tablier Burger King',
    image: '/images/polo.webp',
    cols: 3,
  },
  {
    id: 4,
    title: 'Veste Burger King',
    image: '/images/bodywarmer-brode.webp',
    cols: 3,
  },
  {
    id: 5,
    title: 'France',
    image: '/images/100-pour-sang.webp',
    cols: 3,
  },
  {
    id: 6,
    title: 'Diendy Drive & Delivery',
    image: '/images/100-pour-sang.webp',
    cols: 3,
  },
];

const CustomGridLayout = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ py: 5 }}>
      {isMobile ? (
        <Typography
          mb={4}
          variant='h4'
          textAlign='center'
          color='text.primary'>
          Nos réalisations en Broderie et Impression
        </Typography>
      ) : (
        <Divider
          sx={{
            mb: 4,
          }}>
          <Typography
            variant='h4'
            color='text.primary'>
            Nos réalisations en Broderie et Impression
          </Typography>
        </Divider>
      )}
      <Typography
        variant='body1'
        mb={{ xs: 4, md: 8 }}>
        Vous cherchez des idées pour vos textiles ? Découvrez les
        personnalisations imaginées par nos clients, la diversité des designs et
        l’éventail des emplacements de marquage. Amusez vous à explorer de
        nouvelles identités visuelles, et exprimez vous de mille et une
        manières.​
      </Typography>
      <Grid
        container
        spacing={2}>
        {items.map((item) => (
          <Grid
            item
            xs={12}
            sm={item.cols} // Custom column size for each item
            key={item.id}>
            {item.subGrid ? (
              <Grid
                container
                spacing={2}>
                {item.subGrid.map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={item.cols} // Custom column size for each item
                    key={item.id}>
                    <Card
                      sx={{
                        textAlign: 'center',
                        '& .main-heading': {
                          display: 'block',
                          opacity: 0,
                          transform: 'scale(0.8)',
                          transition: 'opacity 0.6s ease, transform 0.6s ease',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transformOrigin: 'center',
                          pointerEvents: 'none',
                        },
                        img: {
                          objectFit: 'cover',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease-in-out',
                          transform: 'scale(1)',
                        },
                        ':hover': {
                          img: {
                            filter: 'blur(2px)!important',
                            transform: 'scale(1.07)',
                          },
                          '& .main-heading': {
                            opacity: 1,
                            transform: 'translate(-50%, -50%) scale(1)',
                          },
                        },
                      }}>
                      <Box
                        sx={{
                          position: 'relative',
                          objectFit: 'cover',
                          backgroundColor: '#f5f5f5',
                          height: 275,
                        }}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          priority
                        />
                      </Box>
                      <Typography
                        variant='subtitle1'
                        className='main-heading'
                        color='common.white'>
                        {item.title}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Card
                sx={{
                  textAlign: 'center',
                  '& .main-heading': {
                    display: 'block',
                    opacity: 0,
                    transform: 'scale(0.8)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transformOrigin: 'center',
                    pointerEvents: 'none',
                  },
                  img: {
                    objectFit: 'cover',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'scale(1)',
                  },
                  ':hover': {
                    img: {
                      filter: 'blur(2px)!important',
                      transform: 'scale(1.07)',
                    },
                    '& .main-heading': {
                      opacity: 1,
                      transform: 'translate(-50%, -50%) scale(1)',
                    },
                  },
                }}>
                <Box
                  sx={{
                    position: 'relative',
                    objectFit: 'cover',
                    backgroundColor: '#f5f5f5',
                    '&:after': {
                      content: `""`,
                      display: 'block',
                      paddingBottom: '100%',
                    },
                  }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority
                  />
                </Box>
                <Typography
                  variant='subtitle1'
                  className='main-heading'
                  color='common.white'>
                  {item.title}
                </Typography>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomGridLayout;
