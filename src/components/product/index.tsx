'use client';
import React, { useState } from 'react';
import { Suspense } from 'react';

// mui
import { Box, Container, Card, Grid2 } from '@mui/material';
// components
// import RelatedProductsCarousel from '@/components/product/relatedProducts';
import ProductDetailTabs from '@/components/product/tabs';
// import ProductAdditionalInfo from '@/components/product/additionalInfo';
import ProductDetailsCarousel from '@/components/carousels/details';
import ProductDetailsSumary from '@/components/product/summary';

export default function ProductDetailMain({ ...props }) {
  const { data, totalRating, totalReviews, category, slug, review } = props;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const handleColorClick = (color: string) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const selectImage = data?.variants?.find(
    (items: { name: string }) => items.name === selectedColor
  );

  return (
    <>
      <Container>
        <>
          <Card
            sx={{
              p: 2,
              mt: 4,
              borderWidth: 0,
              bgcolor: 'background.paper',
              overflow: 'unset',
            }}>
            <Grid2
              container
              spacing={2}
              justifyContent='center'>
              <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
                <Box
                  sx={{
                    position: 'sticky',
                    top: 100,
                  }}>
                  <ProductDetailsCarousel
                    slug={slug}
                    product={data}
                    selectImage={selectImage}
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 7 }}>
                <ProductDetailsSumary
                  id={data?._id}
                  product={data}
                  selectVariant={selectImage}
                  category={category}
                  totalRating={totalRating}
                  totalReviews={totalReviews}
                  selectedColor={selectedColor}
                  handleColorClick={handleColorClick}
                />
              </Grid2>
            </Grid2>
          </Card>
          <Suspense fallback={<></>}>
            <ProductDetailTabs
              product={{
                description: data?.description,
                id: data?.id,
              }}
              totalRating={totalRating}
              totalReviews={totalReviews}
              reviews={review?.reviews}
              reviewsSummary={review?.reviewsSummary}
            />
          </Suspense>
          {/* <Suspense fallback={<></>}>
      <RelatedProductsCarousel
        id={data?._id}
        category={data?.category?.slug}
      />
    </Suspense> */}
        </>
      </Container>
    </>
  );
}
