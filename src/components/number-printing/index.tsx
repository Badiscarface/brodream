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
import LogoBurger from "../../../public/images/logo-burger-king-imprime.webp";
import TablierBurger from "../../../public/images/tablier-burger-king.webp";

export default function NumberPrinting() {
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
            Impression numérique
          </Typography>
        </Divider>
        <Stack spacing={2} my={4}>
          <Typography variant="body1" color="text.secondary">
            L’impression numérique DTF (Direct to Film) est une technique
            d’impression numérique qui permet de personnaliser des t-shirts
            ,polos, sweats, casquettes et d’autres vêtements .
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cette technique est de plus en plus populaire auprès des
            entreprises, des organisations et des particuliers qui cherchent à
            créer des vêtements personnalisés pour des événements, des
            promotions ou simplement pour leur propre usage.
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
              <Image src={LogoBurger} alt="LogoBurger Img" fill priority />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Typography variant="h5">
                Impression dtf : un choix économique
              </Typography>
              <Typography variant="body1" color="text.secondary">
                L’impression numérique DTF se démarque par son avantage
                économique notoire. Cette technique offre une solution rentable
                sans pour autant sacrifier la qualité, ce qui en fait un choix
                particulièrement avisé pour la personnalisation de textiles en
                petites quantités. La DTF excelle dans l’optimisation des coûts,
                surtout lorsqu’il s’agit de séries limitées, en limitant les
                dépenses associées à la configuration de la machine et à la
                gestion des couleurs.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                La clé de l’économie réside également dans la durabilité des
                impressions DTF, réduisant ainsi la nécessité de réimpressions
                fréquentes. Cette longévité contribue non seulement à maîtriser
                les coûts à long terme mais garantit également une qualité
                constante sur la durée.
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3} sx={{ my: { xs: 4, md: 12 } }}>
              <Typography variant="h4">
                Les avantages de l’impression numérique DTF
              </Typography>
              <Typography variant="h6">Polyvalence des supports :</Typography>
              <Typography variant="body1" color="text.secondary">
                La DTF permet d’imprimer sur une variété de supports, tels que
                le coton, le polyester, le cuir, et même les textiles de couleur
                foncée, offrant ainsi une flexibilité exceptionnelle dans le
                choix des matériaux.
              </Typography>
              <Typography variant="h6">Qualité d’impression :</Typography>
              <Typography variant="body1" color="text.secondary">
                Cette méthode offre une qualité d’impression élevée avec des
                détails précis, des couleurs vibrantes et une netteté
                remarquable.
              </Typography>
              <Typography variant="h6">Résistance et durabilité :</Typography>
              <Typography variant="body1" color="text.secondary">
                Les impressions réalisées avec la DTF sont généralement
                durables, résistantes aux lavages répétés et conservent leur
                éclat au fil du temps, assurant une longue vie aux articles
                personnalisés.
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
              <Image
                src={TablierBurger}
                alt="TablierBurger Img"
                fill
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
