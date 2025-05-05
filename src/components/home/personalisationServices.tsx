import React from "react";
// /mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
// next
import Image from "next/image";
// image
import BroderieImg from "../../../public/images/broderie.png";
import DtfImg from "../../../public/images/dtf.png";
const data = [
  {
    id: 1,
    title: "Broderie",
    description: `La broderie demeure la technique de marquage la plus prestigieuse et raffinée qui soit. Elle est extrêmement durable`,
    path: "/",
    image: BroderieImg,
  },
  {
    id: 2,
    title: "Impression Numerique",
    description: `La technique de marquage DTF permet d’obtenir des détails précis et des couleurs éclatantes pour votre projet.`,
    path: "/",
    image: DtfImg,
  },
];
export default function PersonalisationServices() {
  return (
    <Box
      sx={{
        position: "relative",
        py: 8,
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
          <Typography variant="h2" color="text.primary">
            Nos services de personnalisation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Notre équipe de graphistes internes vous offre la possibilité de
            créer des textiles brodés et imprimés mais également de concevoir ou
            de retravailler vos logos selon vos besoins.
          </Typography>
        </Stack>
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.id}>
              <Card
                sx={{
                  bgcolor: "background.default",
                  display: "flex",
                  gap: { sm: 2, xs: 1 },
                  p: { sm: 1, xs: 2 },
                  alignItems: "center",
                  flexDirection: {
                    sm: "row",
                    xs: "column",
                  },
                }}
              >
                <Box
                  src={item.image}
                  alt="BroderieImg"
                  width={190}
                  height={190}
                  component={Image}
                  sx={{
                    width: {
                      md: 190,
                      sm: 150,
                      xs: 100,
                    },
                    height: {
                      md: 190,
                      sm: 150,
                      xs: 100,
                    },
                    mb: {
                      sm: 0,
                      xs: 1,
                    },
                  }}
                />

                <Stack
                  spacing={{ md: 2, xs: 1 }}
                  justifyContent={"center"}
                  sx={{
                    textAlign: { sm: "left", xs: "center" },
                  }}
                >
                  <Typography variant="h6" sx={{ lineHeight: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {item.description}
                  </Typography>
                  <div>
                    <Button variant="contained" color="primary">
                      Lire la suite
                    </Button>
                  </div>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
