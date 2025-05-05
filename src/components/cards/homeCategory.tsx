"use client";
import React from "react";
// next
import Image from "next/image";

// mui
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";

export default function HomeCategoryCard({ ...props }) {
  const { item } = props;

  const router = useRouter();
  return (
    <Card>
      <CardActionArea
        onClick={() => router.push(`/personnaliser/${item.slug}`)}
        sx={{
          p: 1.5,
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: { xs: 260, md: 280 },
            width: "100%",
            img: {
              borderRadius: "12px 12px 0 0",
              objectFit: "cover",
            },
          }}
        >
          <Image src={item?.cover.url} alt={item.name} fill priority />
        </Box>
        <CardContent
          sx={{
            p: 0,
            py: "12px !important",
          }}
        >
          <Stack alignItems={"center"} spacing={0.2}>
            <Typography variant="h6" color="text.primary">
              {item.name}
            </Typography>
            {/* <Typography variant="body2">
              {item.productCount}{" "}
              {item.productCount > 1 ? "Products" : "Product"}
            </Typography> */}
            <Typography variant="body2" textAlign={"center"}>
              {item.description.slice(0, 60)}{" "}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
