"use client";
import React from "react";
// mui
import {
  Box,
  Container,
  Grid2,
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
        position: "relative",
        py: 18,
        background: (theme) =>
          `linear-gradient(to bottom, ${alpha(
            theme.palette.primary.main,
            0.2
          )}, ${alpha(theme.palette.background.default, 1)})`,
        // bgcolor: "background.paper",
      }}
    >
      <Container>
        <Grid2
          container
          spacing={2}
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems="center"
        >
          <Grid2 size={{ xs: 12, md: 6 }}>
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
                  fontWeight={900}
                  lineHeight={1.2}
                  sx={{ fontSize: "44px!important" }}
                >
                  Personnaliser des vêtements en broderie et impression
                </Typography>
                <Typography variant="body1">
                  {/* Pour particulier, entreprise, association, collectivité… */}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => router.push("/personalize")}
                  >
                    NOS PRODUITS
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                // height: { xs: 250, md: 400 },
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
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
