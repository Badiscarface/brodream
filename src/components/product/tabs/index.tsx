'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';

// mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Tab,
  Card,
  Divider,
  Typography,
  Stack,
  Grid2,
  CardContent,
  useMediaQuery,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Image from 'next/image';
// import ProductReview from '../reviews';
// components
// import ProductDetailsReview from '../reviews';
const RootStyles = styled('div')(() => ({
  // overflow: 'hidden',
  position: 'relative',
  padding: '40px 0',
}));

ProductDetailsTabs.propTypes = {
  product: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  totalRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  reviewsSummary: PropTypes.object.isRequired,
};

export default function ProductDetailsTabs({ ...props }) {
  const { product } = props;
  const [value, setValue] = useState('1');
  const isMobile = useMediaQuery('(max-width:600px)');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  console.log(product, 'product id');
  return (
    <RootStyles>
      <Card sx={{ mb: 3, overflow: 'unset' }}>
        <TabContext value={value}>
          <Box
            sx={{
              px: 3,
              bgcolor: 'background.neutral',
              '.MuiTabs-flexContainer': {
                button: {
                  maxWidth: '100%',
                },
              },
            }}>
            <TabList onChange={handleChangeTab}>
              <Tab
                disableRipple
                value='1'
                label={'Description du produit'}
              />
              {/* <Tab
                disableRipple
                value='2'
                label={'Reviews'}
                sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
              /> */}
              <Tab
                disableRipple
                value='2'
                label={`Différences entre la broderie et l'impression DTF`}
                sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
              />
            </TabList>
          </Box>
          <Divider />
          <TabPanel
            value='1'
            sx={{ p: 3 }}>
            <Box
              dangerouslySetInnerHTML={{
                __html: `${product?.description}`,
              }}
            />
          </TabPanel>
          {/* <TabPanel value='2'>
            <ProductReview
              reviewsSummary={reviewsSummary}
              totalRating={totalRating}
              totalReviews={totalReviews}
              reviews={reviews}
              pid={product?.id}
            />
          </TabPanel> */}
          <TabPanel value='2'>
            <Box sx={{ p: 3 }}>
              {isMobile ? (
                <Typography
                  mb={4}
                  variant='h4'
                  textAlign='center'
                  color='text.primary'>
                  Différences entre la broderie et l&apos;impression DTF
                </Typography>
              ) : (
                <Divider
                  sx={{
                    mb: 4,
                  }}>
                  <Typography
                    variant='h4'
                    color='text.primary'>
                    Différences entre la broderie et l&apos;impression DTF
                  </Typography>
                </Divider>
              )}
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
                        La broderie
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
                          src='/images/broderie.webp'
                          alt='BroderieImg'
                          fill
                          priority
                        />
                      </Box>
                      <Typography
                        variant='h6'
                        textAlign='center'
                        mb={2}>
                        Création d&apos;un motif en relief avec des fils brodés
                        directement sur le tissu.
                      </Typography>
                      <Stack
                        spacing={1.5}
                        ml={2}>
                        <Typography variant='body1'>
                          <b>Nombre de couleurs :</b> de 1 à 16.
                        </Typography>
                        <Typography variant='body1'>
                          <b>Durabilité :</b> Résiste très bien aux lavages et à
                          l&apos;usure.
                        </Typography>
                        <Typography variant='body1'>
                          <b>Finition :</b> Effet premium pour un rendu
                          professionnel.
                        </Typography>
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
                        Impression DTF
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
                          src='/images/dtf.webp'
                          alt='DtfImg Img'
                          fill
                          priority
                        />
                      </Box>
                      <Typography
                        variant='h6'
                        textAlign='center'
                        mb={2}>
                        Impression avec des encres spéciales pour des motifs
                        colorés et détaillés.
                      </Typography>
                      <Stack
                        spacing={1.5}
                        ml={2}>
                        <Typography variant='body1'>
                          <b>Nombre de couleurs :</b> Illimitées, dégradé
                          possible
                        </Typography>
                        <Typography variant='body1'>
                          <b>Durabilité :</b> Résistant au lavage
                        </Typography>
                        <Typography variant='body1'>
                          <b>Finition :</b> Le motif présente une texture lisse.
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid2>
              </Grid2>
            </Box>
          </TabPanel>
        </TabContext>
      </Card>
    </RootStyles>
  );
}
