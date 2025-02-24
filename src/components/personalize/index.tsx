'use client';
import React, { Suspense } from 'react';
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
// components
import HomeCategoryCard from '../cards/homeCategory';
import CategoriesFilter from './filters/categoriesFilter';
import GenderFilter from './filters/genderFilter';
// // api
// import * as api from '@/services';
// import { useQuery } from 'react-query';

interface Items {
  cover: { url: string };
  name: string;
}

export default function PersonalizePage({ ...props }) {
  const { categoryData, filters } = props;

  // const { data, isLoading } = useQuery(['get-filters'], () => api.getFilters());
  // const filters = data?.data;
  // console.log(filters, 'filters');

  return (
    <Box
      sx={{
        py: 8,
      }}>
      <Container>
        <Grid2
          container
          spacing={2}>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Card
              sx={{
                position: 'sticky',
                top: 100,
              }}>
              <CardContent>
                <Suspense fallback={<div>Loading...</div>}>
                  <CategoriesFilter data={filters?.categories} />
                  <GenderFilter genders={filters?.genders} />
                </Suspense>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 9 }}>
            <Stack
              spacing={2}
              mb={3}>
              <Typography variant='h4'>
                Personnaliser des vêtements : broderie ou impression dtf
              </Typography>
              <Typography variant='body1'>
                Personnaliser des vêtements est notre spécialité ! Découvrez une
                large gamme de textiles personnalisables, incluant
                <b> t-shirts, polos, sweats à capuche, vestes</b>, et
                accessoires comme <b>casquettes ou tabliers</b>.
              </Typography>
              <Typography variant='body1'>
                Que ce soit pour des <b>vêtements de travail</b>, des{' '}
                <b>uniformes professionnels</b> ou des{' '}
                <b>tenues décontractées</b> pour homme, femme ou enfant, notre
                gamme s’adapte à tous vos besoins. Pour personnaliser vos
                textiles, nous proposons deux techniques de marquage :
                <b>broderie personnalisée et l’impression numérique</b>{' '}
                (impression dtf), pour un rendu de qualité et durable.
              </Typography>
              <Typography variant='body1'>
                Notre atelier à Paris propose une{' '}
                <b>livraison dans toute la France</b>.
              </Typography>
              <Typography variant='body1'>
                Aussi, n’attendez plus et exprimez votre image avec style et
                qualité pour chaque occasion.
              </Typography>
            </Stack>
            <Grid2
              container
              spacing={2}>
              {categoryData?.data.map((item: Items) => (
                <Grid2
                  size={{ xs: 6, md: 4 }}
                  key={Math.random()}>
                  <HomeCategoryCard item={item} />
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
