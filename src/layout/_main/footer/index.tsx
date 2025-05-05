"use client";
import React from "react";
import NextLink from "next/link";

// mui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Typography,
  Container,
  Stack,
  Box,
  IconButton,
  Grid,
  Link,
  Fab,
  Divider,
} from "@mui/material";

// components
import NewsLetter from "./newsletter";
import Logo from "@/components/logo";

// icons
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdOutlineCall } from "react-icons/md";

const SOCIAL_MEDIA_LINK = [
  {
    linkPath: "https://www.facebook.com/brodream.fr/",
    icon: <FaFacebookF size={18} />,
    color: "rgb(33, 119, 232)",
  },
  {
    linkPath: "https://www.instagram.com/brodream.fr/?hl=fr",
    icon: <FaInstagram size={18} />,
    color: "rgb(212, 76, 100)",
  },
  {
    linkPath: "https://www.linkedin.com/company/brodream/",
    icon: <FaLinkedinIn size={18} />,
    color: "rgb(17, 120, 179)",
  },
];

const ADDRESS = [
  {
    name: "contact@brodream.fr",
    linkPath: "mailto:contact@brodream.fr",
    icon: <FiMail />,
  },
  {
    name: "+33 6 35 11 80 07",
    linkPath: "tel:+33635118007",
    icon: <MdOutlineCall />,
  },
];

const MAIN_LINKS = [
  {
    heading: "Ressources",
    listText1: "Contactez-nous",
    listLink1: "/contact",
    listText2: "Produits",
    listLink2: "/products",
    listText3: "Broderie",
    listLink3: "/broderie",
    listText4: "Impression de numéros",
    listLink4: "/number-printing",
  },
  {
    heading: "À propos de nous",
    listText1: "À propos de nous",
    listLink1: "/about",
    listText2: "Politique de confidentialité",
    listLink2: "/privacy-policy",
    listText3: "Termes et Conditions",
    listLink3: "/terms-and-conditions",
    listText4: "Politique de retour de remboursement",
    listLink4: "/refund-return-policy",
  },
];

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: (theme) => alpha(theme.palette.info.light, 0.1),
        py: 4,
        mt: 7,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={4}>
            <Stack spacing={1}>
              <Logo />
              <Typography variant="subtitle1" color="text.primary">
                Boostez votre communication textile !
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Nous sommes des experts en communication textile, prêts à vous
                offrir des solutions simples et efficaces. Faites confiance à
                notre expertise pour une communication réussie !
              </Typography>
              <Stack>
                {ADDRESS.map((item, idx) => (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    key={idx}
                  >
                    <IconButton
                      sx={{
                        svg: {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {item.icon}
                    </IconButton>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      component={NextLink}
                      href={`${item.linkPath}`}
                      sx={{
                        ":hover": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
          {MAIN_LINKS.map((item, idx) => (
            <Grid size={2} key={idx}>
              <Stack spacing={3}>
                <Typography variant="h6" color="text.primary">
                  {item.heading}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Link
                    href={`${item.listLink1}`}
                    component={NextLink}
                    underline="none"
                    sx={{
                      color: "text.secondary",
                      transition: "0.3s ease-in-out",
                      ":hover": {
                        color: theme.palette.primary.main,
                        transform: "translateX(10px)",
                      },
                    }}
                  >
                    {item.listText1}
                  </Link>
                  <Link
                    href={`${item.listLink2}`}
                    component={NextLink}
                    underline="none"
                    sx={{
                      color: "text.secondary",
                      transition: "0.3s ease-in-out",
                      ":hover": {
                        color: theme.palette.primary.main,
                        transform: "translateX(10px)",
                      },
                    }}
                  >
                    {item.listText2}
                  </Link>
                  <Link
                    href={`${item.listLink3}`}
                    component={NextLink}
                    underline="none"
                    sx={{
                      color: "text.secondary",
                      transition: "0.3s ease-in-out",
                      ":hover": {
                        color: theme.palette.primary.main,
                        transform: "translateX(10px)",
                      },
                    }}
                  >
                    {item.listText3}
                  </Link>
                  <Link
                    href={`${item.listLink4}`}
                    component={NextLink}
                    underline="none"
                    sx={{
                      color: "text.secondary",
                      transition: "0.3s ease-in-out",
                      ":hover": {
                        color: theme.palette.primary.main,
                        transform: "translateX(10px)",
                      },
                    }}
                  >
                    {item.listText4}
                  </Link>
                </Box>
              </Stack>
            </Grid>
          ))}

          <Grid size={4}>
            <Stack spacing={3}>
              <Typography variant="h6" color="text.primary">
                Rejoignez une newsletter
              </Typography>
              <NewsLetter />

              <Stack direction="row" alignItems="center" spacing={2}>
                {SOCIAL_MEDIA_LINK.map((item, idx) => (
                  <Fab
                    size="small"
                    key={idx}
                    color="primary"
                    component={NextLink}
                    href={item.linkPath}
                    sx={{
                      bgcolor: item.color,
                      "&:hover": {
                        bgcolor: alpha(item.color, 0.8),
                      },
                      zIndex: 1,
                      boxShadow: (theme) => theme.customShadows.primary,
                    }}
                  >
                    {item.icon}
                  </Fab>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body1" color="text.primary" textAlign="center">
          © 2024 Brodream. Tous droits réservés
        </Typography>
      </Container>
    </Box>
  );
}
