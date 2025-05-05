"use client";
import React from "react";
// /mui
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import HomeCategoryCard from "../cards/homeCategory";
import NoDataFoundIllustration from "@/illustrations/dataNotFound";

interface Items {
  cover: { url: string };
  name: string;
}

export default function OurClothes({ ...props }) {
  const { data } = props;

  return (
    <Box
      sx={{
        position: "relative",
        pt: 16,
        pb: 10,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
          <Typography variant="h2" color="text.primary">
            Nos vêtements à personnaliser
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Notre gamme de vêtements personnalisables. des t-shirts, polos,
            sweats et vestes …
          </Typography>
        </Stack>
        {data?.data.length > 0 ? (
          <Grid container spacing={2} justifyContent={"center"}>
            {data?.data.map((item: Items) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={Math.random()}>
                <HomeCategoryCard item={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoDataFoundIllustration />
        )}
      </Container>
    </Box>
  );
}
