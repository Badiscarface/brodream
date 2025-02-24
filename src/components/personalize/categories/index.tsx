'use client';
import React from 'react';
// mui
import { Box, Card, CardContent, Container, Grid2 } from '@mui/material';
// components
import CategoriesFilter from '../filters/categoriesFilter';
import GenderFilter from '../filters/genderFilter';
import ProductCard from '@/components/cards/productCard';
import NoDataFoundIllustration from '@/illustrations/dataNotFound';

interface Item {
  name: string;
}

export default function Categories({ ...props }) {
  const { product, filters } = props;
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
                <CategoriesFilter data={filters?.categories} />
                <GenderFilter genders={filters?.genders} />
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 9 }}>
            {product.length > 0 ? (
              <Grid2
                container
                spacing={2}>
                {product?.map((item: Item) => (
                  <Grid2
                    size={{ xs: 6, md: 4 }}
                    key={Math.random()}>
                    <ProductCard item={item} />
                  </Grid2>
                ))}
              </Grid2>
            ) : (
              <NoDataFoundIllustration />
            )}
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
