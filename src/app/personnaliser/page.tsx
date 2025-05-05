import React from "react";
// mui
import dynamic from "next/dynamic";
import ProductsMain from "@/components/personalize";
import { Container } from "@mui/material";
import * as api from "@/services";
const HeaderBreadcrumbs = dynamic(
  () => import("@/components/headerBreadcrumbs")
);

export default async function Page({ ...props }) {
  const data = await api.getHomeCategories();
  const filters = await api.getFilters();
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="produits"
        links={[
          {
            name: "Maison",
            href: "/",
          },
          {
            name: "produits",
          },
        ]}
      />
      <ProductsMain categories={data?.data} filters={filters?.data} />
    </Container>
  );
}
