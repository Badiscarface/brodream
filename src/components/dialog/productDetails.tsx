import * as React from "react";
import PropTypes from "prop-types";
// mui
import { Box, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
// components
import ProductDetailsCarousel from "@/components/carousels/details";
import ProductDetailsSumary from "@/components/product/summary";
import ProductDetailsImageSkeleton from "@/components/skeletons/productDetail/productDetailImage";
import ProductDetailsSumarySkeleton from "@/components/skeletons/productDetail/productDetailsSumary";
import * as api from "@/services";

// ✅ Updated import for TanStack Query
import { useQuery } from "@tanstack/react-query";
ProductDetailsDialog.propTypes = {
  slug: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default function ProductDetailsDialog({ ...props }) {
  const { slug, onClose, open } = props;
  const { data, isLoading } = useQuery({
    queryKey: ["product-detail-slug", slug],
    queryFn: () => api.getProductBySlug(slug),
    enabled: !!slug, // Avoid fetching with undefined slug
  });
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const handleColorClick = (color: string) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const selectImage = data?.variants?.find(
    (items: { name: string }) => items.name === selectedColor
  );

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
      {isLoading ? (
        <Grid container spacing={2} justifyContent="center" sx={{ p: 3 }}>
          <Grid
            size={{
              md: 6,
              sm: 8,
              xs: 12,
            }}
          >
            <ProductDetailsImageSkeleton />
          </Grid>
          <Grid
            size={{
              md: 6,
              xs: 12,
            }}
          >
            <ProductDetailsSumarySkeleton />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4} justifyContent="center" sx={{ p: 3 }}>
          <Grid
            size={{
              md: 6,
              xs: 12,
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0,
              }}
            >
              <ProductDetailsCarousel
                slug={slug}
                product={data?.data}
                selectImage={selectImage}
              />
            </Box>
          </Grid>
          <Grid
            size={{
              md: 6,
              xs: 12,
            }}
          >
            <ProductDetailsSumary
              id={data?._id}
              product={data?.data}
              selectVariant={selectImage}
              category={data?.data?.category}
              totalRating={data?.data?.totalRating}
              totalReviews={data?.data?.totalReviews}
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
