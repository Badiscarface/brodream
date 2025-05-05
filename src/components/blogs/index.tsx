"use client";
import React from "react";
// mui
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
// components
import BlogCard from "../cards/blogCard";

export default function MainBlogs({ ...props }) {
  const { data } = props;
  const theme = useTheme();
  console.log(data, "data");
  return (
    <Box>
      <Stack my={4} spacing={2} textAlign="center">
        <Typography variant="h3">
          Tendances, conseils & astuces pour personnaliser un vêtement
        </Typography>
        <Typography variant="body1">
          La personnalisation de vêtements avec de la broderie ou de
          l&apos;impression numérique vous intéresse-t-il ?<br /> On vous dit
          tout sur le sujet. Découvrez nos conseils et astuces pour créer un
          vêtement personnalisé à votre image.
        </Typography>
      </Stack>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2}>
              {data?.data.map(
                (items: {
                  name: string;
                  description: string;
                  cover: {
                    url: string;
                  };
                }) => (
                  <BlogCard key={Math.random()} item={items} />
                )
              )}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                borderLeft: "1px solid" + theme.palette.divider,
                height: "100%",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
