"use client";
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
  Rating,
} from "@mui/material";
// next
import Image from "next/image";
// image
import ReviewsImg from "../../../public/images/reviews.webp";
import { fDateShort } from "@/utils/formatTime";
import NoDataFoundIllustration from "@/illustrations/dataNotFound";

export default function Reviews({ ...props }) {
  const { data } = props;

  return (
    <Box
      sx={{
        position: "relative",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
          <Typography variant="h4" color="text.primary">
            EXELLENT
          </Typography>
          <Box
            sx={{
              position: "relative",
              height: 90,
              width: 160,
              img: {
                objectFit: "contain",
              },
            }}
          >
            <Image src={ReviewsImg} alt="reviews Img" fill priority />
          </Box>
          <Typography variant="body1" color="text.primary">
            <Typography component="span" variant="subtitle1">
              (4.6/5)
            </Typography>{" "}
            Based on 29 opinions
          </Typography>
        </Stack>
        {data.length > 0 ? (
          <Grid container justifyContent="center" spacing={4}>
            {data.map(
              (item: {
                rating: number;
                createdAt: string;
                name: string;
                message: string;
              }) => (
                <Grid size={{ xs: 12, md: 4 }} key={Math.random()}>
                  <Card
                    sx={{
                      transition: "ease-in-out .5s",
                      height: "100%",
                      ":hover": {
                        borderColor: (theme) =>
                          theme.palette.primary.main + "!important",
                      },
                    }}
                  >
                    <CardContent sx={{ height: "100%" }}>
                      <Stack
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                      >
                        <Stack
                          spacing={0.5}
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Rating
                            size="small"
                            value={item.rating || 0}
                            readOnly
                          />
                          <Typography variant="subtitle2">
                            {fDateShort(item.createdAt)}
                          </Typography>
                        </Stack>
                        <Typography variant="body1" component="i">
                          {item.message}
                        </Typography>
                        <Typography variant="subtitle1">{item.name}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        ) : (
          <NoDataFoundIllustration />
        )}
      </Container>
    </Box>
  );
}
