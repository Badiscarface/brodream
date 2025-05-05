import React from "react";
// mui
import { Box, Stack, Typography, Button, Fab, alpha } from "@mui/material";
// next
import Image from "next/image";
// icons
import { FaWhatsapp } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";

const data = [
  {
    name: "Brodé et imprimé en France",
    img: "/icons/france.svg",
  },
  {
    name: "Délais De Production Rapide",
    img: "/icons/delivery.svg",
  },
  {
    name: "Tarifs dégressifs selon la quantité",
    img: "/icons/quantity.svg",
  },
];

export default function MoreDetail() {
  return (
    <Box>
      <Stack pt={3} spacing={3} textAlign="center">
        {/* <Typography
          variant='body1'
          color='text.primary'>
          <b>Commande Minimale: </b>5 articles au minimum. Mélangez les couleurs
          et les types (ex. : 2 polos et 3 t-shirts).
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'>
          <b> Prix Dégressifs :</b> Les prix diminuent avec les quantités
          commandées. Plus vous achetez, plus vous économisez !
        </Typography>
        <Typography
          variant='body1'
          color='text.primary'>
          <b>Devis Indicatif :</b> Ce devis est indicatif et peut varier selon
          les quantités et options choisies.
        </Typography> */}
        <Stack spacing={2} textAlign="center" alignItems={"center"}>
          <Fab
            color="primary"
            aria-label="support"
            sx={{
              width: 72,
              height: 72,
            }}
          >
            <MdOutlineSupportAgent fontSize={48} />
          </Fab>
          <div>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
              }}
            >
              Besoin d&apos;aide ?
            </Typography>
            <Typography variant="h4" color="primary">
              Demandez à notre expert
            </Typography>
          </div>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Button
              startIcon={<FaWhatsapp />}
              variant="outlined"
              color="success"
              sx={{
                boxShadow: "none",
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
              }}
              href="https://api.whatsapp.com/send/?phone=%2B33635118007&text&type=phone_number&app_absent=0"
              target="_blank"
            >
              WhatsApp
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                boxShadow: "none",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              }}
              href="tel:+33635118007"
              target="_blank"
              startIcon={<FaSquarePhone />}
            >
              Téléphone
            </Button>
          </Stack>
          {/* <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            {data.map((item) => (
              <Stack
                key={Math.random()}
                alignItems="center"
                justifyContent="center"
                spacing={1}
                textAlign="center"
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 40,
                    width: 40,
                    img: {
                      objectFit: "cover",
                    },
                  }}
                >
                  <Image src={item.img} alt="Hero Img" fill priority />
                </Box>
                <Typography variant="body2" color="text.primary">
                  {item.name}
                </Typography>
              </Stack>
            ))}
          </Stack> */}
        </Stack>
      </Stack>
    </Box>
  );
}
