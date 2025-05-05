"use client";
import React from "react";
// mui
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  alpha,
} from "@mui/material";
// next
import Image from "next/image";
// images
import HeroImg from "../../../public/images/hero-image.png";
import { useRouter } from "next-nprogress-bar";

export default function Hero() {
  const router = useRouter();
  return (
    <Box
      sx={{
        top: -78,
        position: "relative",
        pt: { md: 18, xs: 10 },
        pb: { md: 18, xs: 4 },
        background: (theme) =>
          `linear-gradient(to bottom, ${alpha(
            theme.palette.primary.main,
            0.2
          )}, ${alpha(theme.palette.background.default, 1)})`,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems="center"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                maxWidth: "678px",
                textAlign: { md: "left", xs: "center" },
              }}
            >
              <Stack spacing={3} py={4}>
                <Typography
                  variant="h2"
                  color="text.primary"
                  fontWeight={{ md: 800, xs: 700 }}
                  lineHeight={1.2}
                >
                  Personnaliser des vêtements en broderie et impression
                </Typography>
                <Typography variant="body1">
                  Experts en broderie et impression textile en France pour
                  entreprises, événements, associations et particuliers.
                  Qualité, créativité et savoir-faire au service de vos projets.
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => router.push("/personnaliser")}
                  >
                    NOS PRODUITS
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                display: { md: "block", xs: "none" },
                img: {
                  objectFit: "cover",
                },
              }}
            >
              <Image
                src={HeroImg}
                alt="Hero Img"
                layout="responsive"
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
