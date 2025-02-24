import React from 'react';
// mui
import { Container } from '@mui/material';
// components
import MainBlogs from '@/components/blogs';
import * as api from '@/services';

export default async function Page() {
  const blogData = await api.getHomeBlogs();
  return (
    <>
      <Container>
        <MainBlogs data={blogData} />
      </Container>
    </>
  );
}
