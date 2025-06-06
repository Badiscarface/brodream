"use client";
// react
import React from "react";
import PropTypes from "prop-types";
// mui
import { Typography } from "@mui/material";
// components
import ProductsCarousel from "@/components/carousels/gridSlider";
// styles
import RootStyled from "./styled";
import config from "./config.json";

RelatedProducts.propTypes = {
  id: PropTypes.string.isRequired,
};

export default function RelatedProducts({ ...props }) {
  const { id } = props;
  const data = config;
  const isLoading = false;

  if (!isLoading && !Boolean(data?.data?.length)) {
    return;
  }
  return (
    <RootStyled>
      <Typography variant="h2" color="text.primary" className="heading">
        Related Products
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        className="description"
      >
        Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
        Industry.
      </Typography>
      <ProductsCarousel data={data?.data} isLoading={isLoading} />
    </RootStyled>
  );
}
