import React from "react";
// mui
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PourSang from "../../../public/images/100-pour-sang.webp";
import Bodywarmer from "../../../public/images/bodywarmer-brode.webp";
import BTeddy from "../../../public/images/B-teddy.webp";

export default function Broderie() {
  return (
    <Box
      sx={{
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Divider>
          <Typography
            variant="h3"
            color="text.primary"
            sx={{
              textTransform: "uppercase",
            }}
          >
            Broderie personnalisée
          </Typography>
        </Divider>
        <Stack spacing={2} my={4}>
          <Typography variant="body1" color="text.secondary">
            La broderie machine est une technique de personnalisation textile
            qui utilise des machines à broder pour créer des motifs sur les
            vêtements ou autres supports. Les motifs sont créés en utilisant des
            fils de différentes couleurs qui sont cousus ensemble pour former un
            motif précis.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Les fils utilisés pour la broderie machine sont disponibles dans une
            large gamme de couleurs et de textures pour répondre à tous les
            besoins de personnalisation.
          </Typography>
        </Stack>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 250, md: 350 },
                img: {
                  objectFit: "contain",
                },
              }}
            >
              <Image src={PourSang} alt="PourSang Img" fill priority />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Typography variant="h5">
                La broderie : un marquage textile résistante
              </Typography>
              <Typography variant="body1" color="text.secondary">
                C’est la technique de personnalisation textile la plus
                résistante.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Contrairement aux designs imprimés qui peuvent s’estomper ou se
                déformer avec le temps, la broderie numérique est cousue
                directement sur le tissu, ce qui rend les motifs plus solides et
                plus résistants.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Les fils que nous utilisons sont spécialement conçus pour
                résister à l’usure, à la décoloration et aux dommages causés par
                les lavages répétés.
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Typography variant="h5">
                La broderie personnalisée : Prestige
              </Typography>

              <Typography variant="body1" color="text.secondary">
                La personnalisation en broderie numérique se distingue comme une
                technique de marquage d’une élégance incomparable, conférant à
                chaque pièce une touche de prestige et d’unicité. Contrairement
                aux méthodes conventionnelles, la broderie numérique offre une
                précision exceptionnelle, permettant la reproduction fidèle de
                logos, initiales ou motifs complexes.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Cette technique de marquage prestigieuse excelle dans la
                création de détails sophistiqués et de designs raffinés,
                ajoutant une dimension artistique aux textiles. Les fils de
                haute qualité utilisés dans la broderie numérique apportent une
                richesse visuelle, une durabilité et une texture incomparables,
                rehaussant la perception de qualité et de luxe du produit final.
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 250, md: 450 },
                img: {
                  objectFit: "contain",
                },
              }}
            >
              <Image src={BTeddy} alt="BTeddy Img" fill priority />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 350, md: 550 },
                my: { xs: 4, md: 12 },
                img: {
                  objectFit: "contain",
                },
              }}
            >
              <Image src={Bodywarmer} alt="Bodywarmer Img" fill priority />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3} sx={{ my: { xs: 4, md: 12 } }}>
              <Typography variant="h4">
                Les avantages de la broderie personnalisée
              </Typography>
              <Typography variant="body1" color="text.secondary">
                La broderie personnalisée offre une myriade d’avantages qui
                transcendent simplement la personnalisation visuelle :
              </Typography>
              <Typography variant="h6">
                Professionnalisme et élégance :
              </Typography>
              <Typography variant="body1" color="text.secondary">
                La broderie confère instantanément un aspect professionnel et
                élégant à tout article. Qu’il s’agisse de vêtements de travail,
                de cadeaux d’entreprise ou d’articles promotionnels, la broderie
                apporte une touche de classe et de distinction.
              </Typography>
              <Typography variant="h6">
                Personnalisation polyvalente :
              </Typography>
              <Typography variant="body1" color="text.secondary">
                La broderie permet une personnalisation polyvalente. Des logos
                d’entreprise aux initiales personnelles, elle offre une grande
                flexibilité pour répondre aux besoins variés des clients, que ce
                soit pour la promotion de la marque ou pour des cadeaux
                personnalisés.
              </Typography>
              <Typography variant="h6">Texture et relief :</Typography>
              <Typography variant="body1" color="text.secondary">
                La broderie ajoute une dimension tactile aux articles
                personnalisés. Les motifs en relief créent une texture unique
                qui attire l’attention et offre une expérience sensorielle
                agréable.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
