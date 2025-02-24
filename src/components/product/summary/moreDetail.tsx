import React from 'react';
// mui
import { Box, Stack, Typography, Button } from '@mui/material';
// next
import Image from 'next/image';
// icons
import { FaWhatsapp } from 'react-icons/fa';
import { FaSquarePhone } from 'react-icons/fa6';

const data = [
  {
    name: 'Brodé et imprimé en France',
    img: '/icons/france.svg',
  },
  {
    name: 'Délais De Production Rapide',
    img: '/icons/delivery.svg',
  },
  {
    name: 'Tarifs dégressifs selon la quantité',
    img: '/icons/quantity.svg',
  },
];

export default function MoreDetail() {
  return (
    <Box>
      <Stack
        pt={3}
        spacing={3}
        textAlign='center'>
        <Typography
          variant='body1'
          color='text.primary'>
          <b>Commande Minimale: </b>5 articles au minimum. Mélangez les couleurs
          et les types (ex. : 2 polos et 3 t-shirts).
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'>
          <b> Prix Dégressifs :</b> Les prix diminuent avec les quantités
          commandées. Plus vous achetez, plus vous économisez !
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'>
          <b>Devis Indicatif :</b> Ce devis est indicatif et peut varier selon
          les quantités et options choisies.
        </Typography>
        <Stack
          spacing={3}
          textAlign='center'>
          <Box
            sx={{
              position: 'relative',
              height: 100,
              width: '100%',
              img: {
                objectFit: 'contain',
              },
            }}>
            <Image
              src='/images/besoin-daide.svg'
              alt='support'
              fill
              priority
            />
          </Box>
          <Typography
            variant='h6'
            color='primary'>
            Besoin d&apos;aide ?
          </Typography>
          <Typography
            variant='h6'
            color='primary'>
            Demandez à notre expert
          </Typography>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            spacing={2}>
            <Button
              variant='contained'
              color='primary'
              size='small'
              startIcon={<FaWhatsapp />}>
              WhatsApp
            </Button>
            <Button
              variant='contained'
              size='small'
              color='primary'
              startIcon={<FaSquarePhone />}>
              Téléphone
            </Button>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            spacing={2}>
            {data.map((item) => (
              <Stack
                key={Math.random()}
                alignItems='center'
                justifyContent='center'
                spacing={1}
                textAlign='center'>
                <Box
                  sx={{
                    position: 'relative',
                    height: 40,
                    width: 40,
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
                  variant='body2'
                  color='text.primary'>
                  {item.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
