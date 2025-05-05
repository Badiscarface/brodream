import React from "react";
import PropTypes from "prop-types";

// mui
import { Box, Container, Card, Grid } from "@mui/material";
// components
import ProductDetailsImageSkeleton from "./productDetailImage";
import BreadcrumbsSkeleton from "../breadcrumbs";
import ProductDetailsSumarySkeleton from "./productDetailsSumary";
ProductDetailSkeleton.propTypes = {
  isPopup: PropTypes.bool,
};

export default async function ProductDetailSkeleton({ ...props }) {
  const { isPopup } = props;
  return isPopup ? (
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
    <Box>
      <Container maxWidth="xl">
        <BreadcrumbsSkeleton />
        <Card
          sx={{
            p: 2,
            mt: 4,
            borderWidth: 0,
            bgcolor: "background.paper",
            mb: 3,
          }}
        >
          <Grid container spacing={2} justifyContent="center">
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
        </Card>
      </Container>
    </Box>
  );
}
