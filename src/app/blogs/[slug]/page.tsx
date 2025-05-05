import React from "react";
// mui
import { Container } from "@mui/material";
// components
import BlogDetail from "@/components/blogs/detail";
// api
import * as api from "@/services";

type Params = Promise<{ slug: string }>;
export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await api.getBlogBySlug(slug);
  return (
    <>
      <Container maxWidth="xl">
        <BlogDetail data={data} />
      </Container>
    </>
  );
}
