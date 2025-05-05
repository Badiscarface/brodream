import CustomGridLayout from "@/components/achievements";
import { Container } from "@mui/material";
import React from "react";

export default function Page() {
  return (
    <>
      <Container maxWidth="xl">
        <CustomGridLayout />
      </Container>
    </>
  );
}
