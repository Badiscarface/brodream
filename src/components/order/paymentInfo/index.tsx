"use client";
import React from "react";
// import PropTypes from 'prop-types';

// mui
import { Card, CardContent, Typography, Stack, Divider } from "@mui/material";
import { useSelector } from "react-redux";

// hooks
import { useCurrencyConvert } from "@/hooks/convertCurrency";
import { useCurrencyFormatter } from "@/hooks/formatCurrency";

export default function PaymentInfo({ ...props }) {
  const {
    checkout: { subtotal, total, discount },
  } = props;

  const fCurrency = useCurrencyFormatter();

  return (
    <Card>
      <CardContent sx={{ py: 2 }}>
        <Typography variant="h4" mb={1}>
          Résumé du Paiement
        </Typography>

        <Stack spacing={0} mt={1} mb={2} gap={1}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
            spacing={2}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Sous-total :
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
            spacing={2}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Remise :
            </Typography>
            <Typography variant="subtitle2">-{fCurrency(discount)}</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
          spacing={2}
          mt={2}
        >
          <Typography variant="subtitle1">Total :</Typography>
          <Typography variant="subtitle1">{fCurrency(total)}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
