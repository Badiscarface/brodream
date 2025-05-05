import React from "react";
import { Container, Box, Grid, Stack, Typography } from "@mui/material";
import HeaderBreadcrumbs from "@/components/headerBreadcrumbs";
import Image from "next/image";
import PersonalisationServices from "@/components/home/personalisationServices";
export default function page() {
  return (
    <Container maxWidth="xl">
      <Stack gap={3}>
        <HeaderBreadcrumbs
          heading="About Us"
          links={[
            {
              name: "Maison",
              href: "/",
            },
            {
              name: "About Us",
            },
          ]}
        />
        <Grid container spacing={2} alignItems={"center"} sx={{ my: 3 }}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box
              sx={{
                width: "100%",
                position: "relative",
                height: {
                  md: 500,
                  xs: 300,
                },
              }}
            >
              <Image
                src="/images/about-hero.png"
                alt="about-hero-image"
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Stack gap={1}>
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{
                  textTransform: "uppercase",
                }}
              >
                About us
              </Typography>
              <Typography
                variant="h2"
                color="initial"
                sx={{
                  fontWeight: 800,
                }}
              >
                Creating a World Where Fashion is a Lifestyle
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. Lorem
                Ipsum has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged.
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <PersonalisationServices />
    </Container>
  );
}
