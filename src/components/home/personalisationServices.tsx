import React from "react";
// /mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
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

export default function PersonalisationServices() {
  return (
    <Box
      sx={{
        position: "relative",
        py: 5,
      }}
    >
      <Container>
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
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card sx={{ display: "flex", gap: 2, p: 1 }}>
              <Image
                src={BroderieImg}
                alt="BroderieImg"
                width={190}
                height={190}
              />

              <Stack spacing={2} justifyContent={"center"}>
                <Typography variant="h6" sx={{ lineHeight: 1 }}>
                  Broderie
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  La broderie demeure la technique de marquage la plus
                  prestigieuse et raffinée qui soit. Elle est extrêmement
                  durable
                </Typography>
                <div>
                  <Button variant="contained" color="primary">
                    Lire la suite
                  </Button>
                </div>
              </Stack>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card sx={{ display: "flex", gap: 2, p: 1 }}>
              <Image src={DtfImg} alt="BroderieImg" width={190} height={190} />

              <Stack spacing={2} justifyContent={"center"}>
                <Typography variant="h6" sx={{ lineHeight: 1 }}>
                  Impression Numerique
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  La technique de marquage DTF permet d’obtenir des détails
                  précis et des couleurs éclatantes pour votre projet.
                </Typography>
                <div>
                  <Button variant="contained" color="primary">
                    Lire la suite
                  </Button>
                </div>
              </Stack>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
