import React from 'react';
// mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
// images
import FranceImg from '../../../public/icons/france.svg';
import DeliveryImg from '../../../public/icons/delivery.svg';
import QuantityImg from '../../../public/icons/quantity.svg';
import BadgeImg from '../../../public/icons/badge.svg';
import Image from 'next/image';

const data = [
  {
    name: 'Brodé et imprimé en France',
    img: FranceImg,
  },
  {
    name: 'Délais De Production Rapide',
    img: DeliveryImg,
  },
  {
    name: 'Tarifs dégressifs selon la quantité',
    img: QuantityImg,
  },
  {
    name: 'Frais techniques offerts',
    img: BadgeImg,
  },
];

export default function WhyUs() {
  return (
    <Box
      sx={{
        my: { xs: 2, md: 0 },
      }}>
      <Container>
        <Card
          sx={{
            bgcolor: 'primary.main',
          }}>
          <CardContent>
            <Grid2
              container
              spacing={2}>
              {data.map((item) => (
                <Grid2
                  size={{ xs: 6, md: 3 }}
                  key={Math.random()}>
                  <Stack
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    textAlign='center'>
                    <Box
                      sx={{
                        position: 'relative',
                        height: 60,
                        width: 60,
                        img: {
                          objectFit: 'cover',
                        },
                      }}>
                      <Image
                        src={item.img}
                        alt='Hero Img'
                        fill
                        priority
                      />
                    </Box>
                    <Typography
                      variant='body1'
                      color='common.white'>
                      {item.name}
                    </Typography>
                  </Stack>
                </Grid2>
              ))}
            </Grid2>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
