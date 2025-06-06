import React from "react";
// mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
// images
import FranceImg from "../../../public/images/france 1.png";
import DeliveryImg from "../../../public/icons/delivery.svg";
import QuantityImg from "../../../public/images/quantity.b0a6979e 1.png";
import BadgeImg from "../../../public/images/image 2.png";
import Image from "next/image";

const data = [
  {
    name: "Brodé et imprimé en France",
    img: FranceImg,
  },
  {
    name: "Délais De Production Rapide",
    img: DeliveryImg,
  },
  {
    name: "Tarifs dégressifs selon la quantité",
    img: QuantityImg,
  },
  {
    name: "Frais techniques offerts",
    img: BadgeImg,
  },
];

export default function WhyUs() {
  return (
    <Box
      sx={{
        my: { xs: 2, md: 0 },
      }}
    >
      <Container maxWidth="xl">
        <Card
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <CardContent>
            <Stack
              direction={{ sm: "row", xs: "column" }}
              alignItems="center"
              justifyContent="space-between"
              spacing={{ md: 1, xs: 0 }}
            >
              {data.map((item, i) => (
                <React.Fragment key={item.name}>
                  {" "}
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    gap={{ md: 2, xs: 1 }}
                    sx={{
                      p: 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: { md: 98, sm: 64, xs: 56 },
                        width: { md: 98, sm: 64, xs: 56 },
                        img: {
                          objectFit: "cover",
                        },
                      }}
                    >
                      <Image src={item.img} alt="Hero Img" fill sizes="100%" />
                    </Box>
                    <Typography variant="subtitle2" color="text.primary">
                      {item.name}
                    </Typography>
                  </Stack>
                  {i === 3 ? null : (
                    <Divider
                      variant="middle"
                      orientation="vertical"
                      // sx={{ height: 60 }}
                      flexItem
                    />
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
