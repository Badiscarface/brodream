import React from 'react';
// /mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
  Stack,
  Typography,
  Button,
} from '@mui/material';
// next
import Image from 'next/image';
// image
import BroderieImg from '../../../public/images/broderie.webp';
import DtfImg from '../../../public/images/dtf.webp';

export default function PersonalisationServices() {
  return (
    <Box
      sx={{
        position: 'relative',
        py: 5,
      }}>
      <Container>
        <Stack
          spacing={2}
          alignItems='center'
          textAlign='center'
          mb={5}>
          <Typography
            variant='h4'
            color='text.primary'>
            Nos services de personnalisation
          </Typography>
          <Typography
            variant='body1'
            color='text.primary'>
            Notre équipe de graphistes internes vous offre la possibilité de
            créer des textiles brodés et imprimés mais également de concevoir ou
            de retravailler vos logos selon vos besoins.
          </Typography>
        </Stack>
        <Grid2
          container
          spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography
                  variant='h4'
                  textAlign='center'
                  mb={2}>
                  BRODERIE
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 200, md: 250 },
                    width: '100%',
                    img: {
                      objectFit: 'contain',
                    },
                  }}>
                  <Image
                    src={BroderieImg}
                    alt='BroderieImg'
                    fill
                    priority
                  />
                </Box>
                <Stack
                  spacing={2}
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'>
                  <Typography variant='h6'>
                    La broderie demeure la technique de marquage la plus
                    prestigieuse et raffinée qui soit. Elle est extrêmement
                    durable
                  </Typography>
                  <Button
                    variant='contained'
                    color='primary'>
                    Lire la suite
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography
                  variant='h4'
                  textAlign='center'
                  mb={2}>
                  IMPRESSION NUMERIQUE
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 200, md: 250 },
                    width: '100%',
                    img: {
                      objectFit: 'contain',
                    },
                  }}>
                  <Image
                    src={DtfImg}
                    alt='DtfImg Img'
                    fill
                    priority
                  />
                </Box>
                <Stack
                  spacing={2}
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'>
                  <Typography variant='h6'>
                    La technique de marquage DTF permet d’obtenir des détails
                    précis et des couleurs éclatantes pour votre projet.
                  </Typography>
                  <Button
                    variant='contained'
                    color='primary'>
                    Lire la suite
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
