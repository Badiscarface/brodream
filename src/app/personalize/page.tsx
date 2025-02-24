import React from 'react';
// mui
import dynamic from 'next/dynamic';
import PersonalizePage from '@/components/personalize';

import * as api from '@/services';
const HeaderBreadcrumbs = dynamic(
  () => import('@/components/headerBreadcrumbs')
);

export default async function Page() {
  const data = await api.getHomeCategories();
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
          },
        ]}
      />
      <PersonalizePage
        categoryData={data}
        filters={filters?.data}
      />
    </>
  );
}
