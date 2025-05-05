"use client";
import React from "react";
// mui
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Stack,
  IconButton,
  Skeleton,
  Typography,
  Drawer,
  Button,
} from "@mui/material";
// components
import CategoryList from "./categories";
import ProductList from "./products";
import CategoriesFilter from "./filters/categoriesFilter";
import GenderFilter from "./filters/genderFilter";
import { useSearchParams } from "next/navigation";
import NoDataFoundIllustration from "@/illustrations/dataNotFound";
import { IoCloseSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
export default function PersonalizePage({ ...props }) {
  const { categories, filters, isOnlyProducts } = props;
  const searchParams = useSearchParams();
  const gender = searchParams.get("gender");
  const [open, setOpen] = React.useState(false);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [productsLoading, setProductsLoading] = React.useState(true);
  return (
    <Box
      sx={{
        py: 8,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 0, md: 3 }}>
          <Card
            sx={{
              display: {
                md: "block",
                xs: "none",
              },

              position: "sticky",
              top: 100,
            }}
          >
            <CardContent>
              <CategoriesFilter data={filters?.categories} />
              <Divider sx={{ mb: 2 }} />
              <GenderFilter genders={filters?.genders} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Collapse in={Boolean(!gender && !isOnlyProducts)}>
            <Stack spacing={2} mb={3}>
              <Typography variant="h4">
                Personnaliser des vêtements : broderie ou impression dtf
              </Typography>
              <Typography variant="body1">
                Personnaliser des vêtements est notre spécialité ! Découvrez une
                large gamme de textiles personnalisables, incluant
                <b> t-shirts, polos, sweats à capuche, vestes</b>, et
                accessoires comme <b>casquettes ou tabliers</b>.
              </Typography>
              <Typography variant="body1">
                Que ce soit pour des <b>vêtements de travail</b>, des{" "}
                <b>uniformes professionnels</b> ou des{" "}
                <b>tenues décontractées</b> pour homme, femme ou enfant, notre
                gamme s’adapte à tous vos besoins. Pour personnaliser vos
                textiles, nous proposons deux techniques de marquage :
                <b>broderie personnalisée et l’impression numérique</b>{" "}
                (impression dtf), pour un rendu de qualité et durable.
              </Typography>
              <Typography variant="body1">
                Notre atelier à Paris propose une{" "}
                <b>livraison dans toute la France</b>.
              </Typography>
              <Typography variant="body1">
                Aussi, n’attendez plus et exprimez votre image avec style et
                qualité pour chaque occasion.
              </Typography>
            </Stack>
          </Collapse>
          <Stack
            direction="row"
            gap={1}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ mb: 2 }}
          >
            <Typography variant="subtitle2" color="text.primary">
              {productsLoading ? (
                <Skeleton variant="text" width={120} />
              ) : (
                Boolean(gender || isOnlyProducts) &&
                `${totalProducts} ${
                  totalProducts === 1 ? "produit" : "produits"
                }`
              )}
            </Typography>

            <Button
              aria-label="filter-drawer"
              startIcon={<IoFilter />}
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                display: {
                  md: "none",
                  xs: "flex",
                },
              }}
            >
              Filters
            </Button>
          </Stack>

          {Boolean(!gender && !isOnlyProducts) && (
            <CategoryList categories={categories} />
          )}

          {Boolean(gender || isOnlyProducts) && (
            <>
              <ProductList
                setProductsLoading={setProductsLoading}
                setTotalProducts={setTotalProducts}
              />
              {totalProducts > 0 ? null : <NoDataFoundIllustration />}
            </>
          )}
        </Grid>
      </Grid>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack sx={{ p: 2, width: 300 }}>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h6" color="text.primary">
              Filters
            </Typography>

            <IconButton aria-label="close" onClick={() => setOpen(false)}>
              <IoCloseSharp />
            </IconButton>
          </Stack>
          <Divider sx={{ mb: 3 }} />
          <CategoriesFilter data={filters?.categories} />
          <Divider sx={{ mb: 2 }} />
          <GenderFilter genders={filters?.genders} />
        </Stack>
      </Drawer>
    </Box>
  );
}
