'use client';
import React from 'react';
// import PropTypes from 'prop-types';

// mui
import { Card, CardContent, Typography, Stack, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

// PaymentInfo.propTypes = {
//   setCouponCode: PropTypes.func.isRequired,
//   setTotal: PropTypes.func.isRequired,
// };
// hooks
import { useCurrencyConvert } from '@/hooks/convertCurrency';
import { useCurrencyFormatter } from '@/hooks/formatCurrency';

export default function PaymentInfo() {
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const { checkout } = useSelector(({ product }: { product: any }) => product);
  const { total, subtotal, discount } = checkout;

  return (
    <Card>
      <CardContent sx={{ py: 2 }}>
        <Typography
          variant='h4'
          mb={1}>
          Payment Summary
        </Typography>

        <Stack
          spacing={0}
          mt={1}
          mb={2}
          gap={1}>
          <Stack
            direction='row'
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            spacing={2}>
            <Typography
              variant='subtitle2'
              color='text.secondary'>
              Subtotal:
            </Typography>
            <Typography variant='subtitle2'>
              {fCurrency(cCurrency(subtotal))}
            </Typography>
          </Stack>
          <Stack
            direction='row'
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            spacing={2}>
            <Typography
              variant='subtitle2'
              color='text.secondary'>
              Discount:
            </Typography>
            <Typography variant='subtitle2'>
              -{fCurrency(cCurrency(discount))}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction='row'
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          spacing={2}
          mt={2}>
          <Typography variant='subtitle1'>Total:</Typography>
          <Typography variant='subtitle1'>
            {fCurrency(cCurrency(total))}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
