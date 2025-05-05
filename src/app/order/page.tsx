import React from "react";
// component
import CheckoutMain from "@/components/order/mainCheckout";
// mui
import { Container } from "@mui/material";

export default function page() {
  return (
    <>
      <Container maxWidth="xl">
        <CheckoutMain />
      </Container>
    </>
  );
}
