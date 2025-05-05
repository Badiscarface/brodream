"use client";
import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid"; // For Grid
import ProductCard from "@/components/cards/productCard";
import * as api from "@/services";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface Product {
  _id: string;
  name: string;
  [key: string]: any; // Add other product fields if needed
}

interface ProductsProps {
  category?: string;
  subcategory?: string;
  setTotalProducts: (value: number) => void;
  setProductsLoading: (value: boolean) => void;
}

const getSearchParams = (
  searchParams: URLSearchParams,
  category?: string,
  subcategory?: string
): string => {
  const params = new URLSearchParams(searchParams.toString());

  if (!params.has("page")) params.set("page", "1");
  if (category) params.set("category", category);
  if (subcategory) params.set("subcategory", subcategory);

  return "?" + params.toString();
};

export default function Products({
  category,
  subcategory,
  setTotalProducts,
  setProductsLoading,
}: ProductsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const [products, setProducts] = React.useState<Product[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const queryParams = getSearchParams(searchParams, category, subcategory);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products", category, subcategory, searchParams.toString()],
    queryFn: () => api.getProducts(queryParams),
  });

  const handleLoadMore = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", String(page + 1));
    router.push("?" + newParams.toString());
  };
  useEffect(() => {
    if (data) {
      console.log(data, "datadata");
      setProductsLoading(false);
      if (page === 1) {
        setProducts(data.data);
      } else {
        setProducts((prev) => [...prev, ...data.data]);
      }
      setTotalPages(Number(data.count) || 1);
      setTotalProducts(Number(data.total) || 0);
    }
  }, [data]);

  return (
    <Box>
      <Grid container spacing={2}>
        {(isLoading ? [...new Array(6)] : products).map((item, idx) => (
          <Grid
            size={{
              md: 4,
              xs: 6,
            }}
            key={item?._id || idx}
          >
            <ProductCard isLoading={isLoading} item={item} />
          </Grid>
        ))}
      </Grid>

      {!isFetching && products.length > 0 && (
        <Button
          disabled={page >= totalPages}
          onClick={handleLoadMore}
          variant="contained"
          color="primary"
          sx={{ display: "block", mx: "auto", mt: 5 }}
        >
          {page >= totalPages
            ? "Plus de produits disponibles"
            : "Plus de produits"}
        </Button>
      )}
    </Box>
  );
}
