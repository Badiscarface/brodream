import React from "react";
// mui
import { Container } from "@mui/material";
import ProductsMain from "@/components/personalize";
import HeaderBreadcrumbs from "@/components/headerBreadcrumbs";
import * as api from "@/services";
// const HeaderBreadcrumbs = dynamic(
//   () => import('')
// );
export const dynamic = "error";

export const revalidate = 10;

export async function generateStaticParams() {
  const { data } = await api.getSubCategorySlugs();
  const mapped = data?.map((cat: { slug: string }) => {
    return {
      subcategory: cat.slug,
    };
  });
  return mapped;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const subcategory = (await params).subcategory;
  const { data: response } = await api.getSubCategoryBySlug(subcategory);

  // const images = category.images.map((img) => img.url);
  return {
    title: response.metaTitle,
    description: response.metaDescription,
    openGraph: {
      images: [response.cover.url],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const subcategory = (await params).subcategory;
  const { data: categoryData } = await api.getSubCategoryTitle(subcategory);
  const data = await api.getHomeCategories();
  const filters = await api.getFilters();
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading={categoryData?.name}
        links={[
          {
            name: "Maison",
            href: "/",
          },
          {
            name: "Personnaliser",
            href: "/personnaliser",
          },
          {
            name: categoryData?.parentCategory?.name,
            href: categoryData?.parentCategory?.slug,
          },
          {
            name: categoryData?.name,
          },
        ]}
      />
      <ProductsMain
        isOnlyProducts
        subcategory={subcategory}
        categories={data.data}
        filters={filters?.data}
      />
    </Container>
  );
}
