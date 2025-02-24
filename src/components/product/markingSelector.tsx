import React from 'react';
import { Box, Button, Collapse, Grid2, Typography } from '@mui/material';
import Image from 'next/image';
// hooks
import { useCurrencyConvert } from '@/hooks/convertCurrency';
import { useCurrencyFormatter } from '@/hooks/formatCurrency';

interface Option {
  name: string;
  cover: { url: string }[];
  price: number;
}

export default function MarkingSelector({ ...props }) {
  const {
    category,
    quantity,
    priceSale,
    totalPrice,
    markingType,
    handleMarkingTypeSelect,
    markingLocations,
    handleMarkingLocationSelect,
  } = props;
  const { embroidery, embroideryPositions, printing, printingPositions } =
    category;
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  return (
    <Box pb={3}>
      {/* Marking Type */}
      {!(embroidery || printing) ? null : (
        <Typography
          variant='subtitle1'
          gutterBottom
          mb={2}
          sx={{
            mt: 3,
          }}>
          Sélectionnez le type de marquage
        </Typography>
      )}
      <Grid2
        container
        justifyContent='center'
        spacing={4}>
        {printing && (
          <Grid2 size={{ xs: 6, md: 4 }}>
            <Button
              variant={markingType === 'printing' ? 'contained' : 'outlined'}
              onClick={() => handleMarkingTypeSelect('printing')}
              sx={{
                textTransform: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: 'auto !important',
              }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 100,
                  width: 100,
                  img: {
                    objectFit: 'contain',
                  },
                }}>
                <Image
                  src='/images/logo-impression.webp'
                  alt='printing'
                  fill
                  priority
                />
              </Box>

              <Typography>IMPRESSION</Typography>
            </Button>
          </Grid2>
        )}
        {embroidery && (
          <Grid2 size={{ xs: 6, md: 4 }}>
            <Button
              variant={markingType === 'embroidery' ? 'contained' : 'outlined'}
              onClick={() => handleMarkingTypeSelect('embroidery')}
              sx={{
                textTransform: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: 'auto !important',
              }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 100,
                  width: 100,
                  img: {
                    objectFit: 'contain',
                  },
                }}>
                <Image
                  src='/images/logo-broderie.webp'
                  alt='Broderie'
                  fill
                  priority
                />
              </Box>

              <Typography>BRODERIE</Typography>
            </Button>
          </Grid2>
        )}
      </Grid2>

      {/* Marking Location */}
      {!(embroidery || printing) ? null : (
        <Typography
          variant='subtitle1'
          gutterBottom
          sx={{ mt: 4 }}>
          Sélectionnez l&apos;endroit du marquage
        </Typography>
      )}
      <Grid2
        container
        spacing={4}>
        {markingType
          ? (markingType === 'embroidery'
              ? embroideryPositions
              : printingPositions
            )?.map((option: Option) => (
              <Grid2
                size={{ xs: 6, md: 4 }}
                key={option.name}>
                <Button
                  variant={
                    markingLocations.includes(option) ? 'contained' : 'outlined'
                  }
                  onClick={() => handleMarkingLocationSelect(option)}
                  sx={{
                    textTransform: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: 'auto !important',
                  }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 100,
                      width: 100,
                    }}>
                    <Image
                      src={option.cover[0].url}
                      alt={option.name}
                      fill
                      objectFit='cover'
                      priority
                    />
                  </Box>

                  <Typography
                    sx={{
                      textTransform: 'capitalize',
                    }}>
                    {option.name}
                  </Typography>
                </Button>
              </Grid2>
            ))
          : null}
      </Grid2>
      <Collapse in={markingLocations.length > 0}>
        <Typography
          variant='body1'
          mt={2}>
          Prix du produit avec le marquage <br />
          <b>{fCurrency(cCurrency(totalPrice))}</b>
        </Typography>
        <Typography variant='body1'>
          PRIX TOTAL À PARTIR DE (TTC)
          <br />
          <b>{fCurrency(cCurrency((priceSale + totalPrice) * quantity))}</b>
        </Typography>
      </Collapse>
    </Box>
  );
}
