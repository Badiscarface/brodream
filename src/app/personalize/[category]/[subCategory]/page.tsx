import React from 'react';
// mui
import Categories from '@/components/personalize/categories';
import HeaderBreadcrumbs from '@/components/headerBreadcrumbs';
import * as api from '@/services';
// const HeaderBreadcrumbs = dynamic(
//   () => import('')
// );
export const dynamic = 'error';

export const revalidate = 10;

export async function generateStaticParams() {
  const { data } = await api.getSubCategorySlugs();
  const mapped = data?.map((cat: { slug: string }) => {
    return {
      subCategory: cat.slug,
    };
  });
  return mapped;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subCategory: string }>;
}) {
  const subCategory = (await params).subCategory;
  const { data: response } = await api.getSubCategoryBySlug(subCategory);

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
  params: Promise<{ subCategory: string }>;
}) {
  const subCategory = (await params).subCategory;
  const { data: categoryData } = await api.getSubCategoryTitle(subCategory);
  const data = await api.getProductsBySubCategory(subCategory);
  const filters = await api.getFilters();
  return (
    <>
      <HeaderBreadcrumbs
        links={[
          {
            name: 'Maison',
            href: '/',
          },
          {
            name: 'personnaliser',
            href: '/personalize',
          },
          {
            name: categoryData?.name,
          },
        ]}
      />
      <Categories
        product={data?.data}
        filters={filters?.data}
      />
    </>
  );
}
