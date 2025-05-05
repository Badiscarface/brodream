"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

// mui
import {
  Card,
  CardContent,
  Stack,
  Box,
  Divider,
  Typography,
  Skeleton,
  IconButton,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import EmptyCart from "@/illustrations/emptyCart";
// hooks
import { useCurrencyFormatter } from "@/hooks/formatCurrency";

export default function CheckoutCard({ ...props }) {
  const { cart, loading, onDelete, isEmptyCart } = props;

  const fCurrency = useCurrencyFormatter();
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" mb={1}>
          Panier {cart.length > 1 ? "Articles" : "Article"}
        </Typography>
        {isEmptyCart ? (
          <EmptyCart />
        ) : (
          <>
            {cart.map((value: CartItem, index: number, array: []) => (
              <React.Fragment key={Math.random()}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                  py={1}
                >
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => onDelete(value.sku)}
                  >
                    <IoClose size={20} />
                  </IconButton>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {loading ? (
                      <Skeleton variant="rounded" width={64} height={64} />
                    ) : (
                      <Box
                        sx={{
                          position: "relative",
                          height: 64,
                          width: 64,
                          borderRadius: "8px",
                          border: "1px solid rgba(145, 158, 171, 0.32)",
                          img: {
                            borderRadius: "8px",
                          },
                        }}
                      >
                        <Image
                          priority
                          src={value.image}
                          alt="produit"
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                    )}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{
                          width: 150,
                        }}
                      >
                        {loading ? (
                          <Skeleton variant="text" width={160} />
                        ) : (
                          value.name
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          span: {
                            color: "text.primary",
                            textTransform: "capitalize",
                            fontWeight: 700,
                          },
                        }}
                      >
                        {loading ? (
                          <Skeleton variant="text" width={120} />
                        ) : (
                          <>
                            Variante : <span>{value.variantName}</span>
                          </>
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          span: {
                            color: "text.primary",
                            textTransform: "capitalize",
                            fontWeight: 700,
                          },
                        }}
                      >
                        {loading ? (
                          <Skeleton variant="text" width={120} />
                        ) : (
                          <>
                            Quantité : <span>{value.quantity}</span>
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack justifyContent="end" alignItems="end">
                    <Typography variant="subtitle1">
                      {loading ? (
                        <Skeleton variant="text" width={60} />
                      ) : (
                        <>{fCurrency(value.price * value.quantity)}</>
                      )}
                    </Typography>
                  </Stack>
                </Stack>
                {index !== array.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}

CheckoutCard.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      subtotal: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

interface CartItem {
  image: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  subtotal: number;
  attribute: string;
  variant: object;
  variantName: string;
  sku: string;
  price: number;
}
