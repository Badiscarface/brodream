import * as React from 'react';
import PropTypes from 'prop-types';
// mui
import { Box, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
// components
import ProductDetailsCarousel from '@/components/carousels/details';
import ProductDetailsSumary from '@/components/product/summary';
import ProductDetailsImageSkeleton from '@/components/skeletons/productDetail/productDetailImage';
import ProductDetailsSumarySkeleton from '@/components/skeletons/productDetail/productDetailsSumary';

ProductDetailsDialog.propTypes = {
  slug: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default function ProductDetailsDialog({ ...props }) {
  const {
    data,
    totalRating,
    totalReviews,
    category,
    slug,
    onClose,
    open,
    isLoading,
  } = props;
  console.log(props, 'props');
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const handleColorClick = (color: string) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const selectImage = data?.variants?.find(
    (items: { name: string }) => items.name === selectedColor
  );
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth='lg'>
      {isLoading ? (
        <Grid
          container
          spacing={2}
          justifyContent='center'
          sx={{ p: 3 }}>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={6}>
            <ProductDetailsImageSkeleton />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}>
            <ProductDetailsSumarySkeleton />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={4}
          justifyContent='center'
          sx={{ p: 3 }}>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}>
            <Box
              sx={{
                position: 'sticky',
                top: 0,
              }}>
              <ProductDetailsCarousel
                slug={slug}
                product={data}
                selectImage={selectImage}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}>
            <ProductDetailsSumary
              id={data?._id}
              product={data}
              selectVariant={selectImage}
              category={category}
              totalRating={totalRating}
              totalReviews={totalReviews}
              selectedColor={selectedColor}
              handleColorClick={handleColorClick}
              isPopup
            />
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}
