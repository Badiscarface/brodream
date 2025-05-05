"use client";
import React from "react";
// mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
// components
import DetailList from "./detailList";
// icons
import { HiMenuAlt3 } from "react-icons/hi";

export default function BlogDetail({ ...props }) {
  const { data } = props;
  const detail = data?.data;
  return (
    <Box>
      <Stack my={4} spacing={1} textAlign="center">
        <Typography variant="overline">Personalisation textiles</Typography>
        <Typography variant="h3">{detail.title}</Typography>
      </Stack>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 8 }}>
            <DetailList detail={detail} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                height: "100%",
              }}
            >
              <Card>
                <CardContent sx={{ p: 2, pb: "16px !important" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle1">Summary</Typography>
                    <IconButton size="small">
                      <HiMenuAlt3 size={20} />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
