"use client";
import React from "react";
// /mui
import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
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
      <Container>
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
          <Grid2 container spacing={2}>
            {data?.data.map((item: Items) => (
              <Grid2 size={{ xs: 6, md: 3 }} key={Math.random()}>
                <HomeCategoryCard item={item} />
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <NoDataFoundIllustration />
        )}
      </Container>
    </Box>
  );
}
