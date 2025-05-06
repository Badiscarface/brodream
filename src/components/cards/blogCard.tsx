"use client";
import React from "react";
// mui
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
// next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { fDateShortMth } from "@/utils/formatTime";
import Label from "@/components/label";
export default function BlogCard({ ...props }) {
  const { item } = props;
  const theme = useTheme();
  const router = useRouter();
  return (
    <Card
      sx={{
        transition: "ease-in-out .5s",
        ":hover": {
          borderColor: (theme) => theme.palette.primary.main + "!important",
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
          <Image src={item.cover.url} alt={item.title} fill priority />
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
                {fDateShortMth(item.createdAt)}
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
  );
}
