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
  const { data } = await api.getCategorySlugs();
  const mapped = data?.map((cat: { slug: string }) => {
    return {
      category: cat.slug,
    };
  });
  return mapped;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;
  const { data: response } = await api.getCategoryBySlug(category);

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
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;
  const { data: categoryData } = await api.getCategoryTitle(category);
  const data = await api.getProductsByCategory(category);
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
