"use client";
import React from "react";
import Link from "next/link";
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
} from "@mui/material";
// next
import Image from "next/image";
// image
// import TablierImg from '../../../public/images/tablier.jpg';
import { useRouter } from "next-nprogress-bar";
import NoDataFoundIllustration from "@/illustrations/dataNotFound";
import { fDateShort } from "@/utils/formatTime";
import Label from "../label";

export default function Blogs({ ...props }) {
  const data = props;
  const detailData = data?.data;
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "relative",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
          <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
            <Typography variant="h2" color="text.primary">
              Actualités sur la personnalisation textile
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Découvrez ce que nos clients pensent de nos services de
              personnalisation textile. Leurs avis reflètent la qualité de nos
              impressions, broderies, et notre engagement à offrir des produits
              uniques et sur mesure.
            </Typography>
          </Stack>
        </Stack>
        {detailData.length > 0 ? (
          <Grid container spacing={2} justifyContent={"center"}>
            {detailData.slice(0, 2).map(
              (item: {
                title: string;
                shortDescription: string;
                slug: string;
                createdAt: string;
                category: string;

                cover: {
                  url: string;
                };
              }) => (
                <Grid key={Math.random()} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      transition: "ease-in-out .5s",
                      ":hover": {
                        borderColor: (theme) =>
                          theme.palette.primary.main + "!important",
                      },
                    }}
                  >
                    <Stack
                      // direction={{ xs: "column", md: "row" }}
                      // alignItems="center"
                      spacing={2}
                      sx={{ p: 1 }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          height: 210,
                          width: { xs: "100%" },

                          img: {
                            objectFit: "cover",
                            borderRadius: "8px 8px 0 0",
                          },
                        }}
                      >
                        <Image
                          src={item.cover.url}
                          alt={item.title}
                          fill
                          priority
                        />
                      </Box>
                      <CardContent
                        sx={{
                          p: 1.5,
                          pb: "16px !important",
                        }}
                      >
                        <Stack spacing={1} justifyContent="center">
                          <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{
                              lineHeight: 1.4,
                              "&:hover": {
                                color: "primary.main",
                              },
                            }}
                            component={Link}
                            href={`/blogs/${item.slug}`}
                          >
                            {item.title}
                          </Typography>
                          <Stack
                            gap={1}
                            justifyContent={"space-between"}
                            direction="row"
                            alignItems={"center"}
                          >
                            <Typography
                              variant="subtitle2"
                              color="primary.main"
                              fontWeight={500}
                            >
                              {fDateShort(item.createdAt)}
                            </Typography>
                            <Label color="success">{item.category}</Label>
                          </Stack>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            fontWeight={400}
                          >
                            {item.shortDescription}
                          </Typography>
                          <Box>
                            <Button
                              variant="contained"
                              onClick={() => router.push(`/blogs/${item.slug}`)}
                              color="primary"
                            >
                              Read full blog
                            </Button>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Stack>
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
