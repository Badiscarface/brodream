import React from "react";
import * as api from "@/services";

import HeaderBreadcrumbs from "@/components/headerBreadcrumbs";
import { Container } from "@mui/material";
import ProductDetailMain from "@/components/product";
// import config from '@/components/dialog/config.json';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 10;
export async function generateStaticParams() {
  const { data } = await api.getProductSlugs();

  return data?.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const { data: response } = await api.getProductBySlug(slug);
  const images = response.images;
  return {
    title: "Brodream Product Detail",
    description: "Brodream Product Detail description",
    keywords: "Brodream Product Detail",
    openGraph: {
      images: images ? images?.map((v: { url: string }) => v.url) : [],
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  const slug = (await params).slug;
  const res = await api.getProductBySlug(slug);
  const { data, totalRating, totalReviews, category } = res;
  const reviews = await api.getReviewsBySlug(data.id);

  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading={data?.name}
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
            name: data?.name,
          },
        ]}
      />
      <ProductDetailMain
        slug={slug}
        data={data}
        totalRating={totalRating}
        totalReviews={totalReviews}
        category={category}
        review={reviews}
      />
    </Container>
  );
}
