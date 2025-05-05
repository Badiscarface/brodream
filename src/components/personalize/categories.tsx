import React from "react";

// mui
import { Grid } from "@mui/material";
// components
import HomeCategoryCard from "../cards/homeCategory";
export default function categories({ ...props }) {
  interface Items {
    cover: { url: string };
    name: string;
  }

  const { categories } = props;
  return (
    <Grid container spacing={2}>
      {categories.map((item: Items) => (
        <Grid size={{ xs: 6, md: 4 }} key={Math.random()}>
          <HomeCategoryCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
