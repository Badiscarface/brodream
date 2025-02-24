'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

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
} from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import EmptyCart from '@/illustrations/emptyCart';
// hooks
import { useCurrencyConvert } from '@/hooks/convertCurrency';
import { useCurrencyFormatter } from '@/hooks/formatCurrency';

export default function CheckoutCard({ ...props }) {
  const { cart, loading, onDelete, isEmptyCart } = props;
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  return (
    <Card>
      <CardContent>
        <Typography
          variant='h4'
          mb={1}>
          Cart {cart.length > 1 ? 'Items' : 'Item'}
        </Typography>
        {isEmptyCart ? (
          <EmptyCart />
        ) : (
          <>
            {cart.map((value: CartItem, index: number, array: []) => (
              <React.Fragment key={Math.random()}>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  spacing={2}
                  py={1}>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}>
                    {loading ? (
                      <Skeleton
                        variant='rounded'
                        width={64}
                        height={64}
                      />
                    ) : (
                      <Box
                        sx={{
                          position: 'relative',
                          height: 64,
                          width: 64,
                          borderRadius: '8px',
                          border: '1px solid rgba(145, 158, 171, 0.32)',
                          img: {
                            borderRadius: '8px',
                            // border: "1px solid rgba(145, 158, 171, 0.32)",
                          },
                        }}>
                        <Image
                          priority
                          src={value.image}
                          alt='product'
                          layout='fill'
                          objectFit='cover'
                        />
                      </Box>
                    )}
                    <Box>
                      <Typography
                        variant='subtitle1'
                        noWrap
                        sx={{
                          width: 150,
                        }}>
                        {loading ? (
                          <Skeleton
                            variant='text'
                            width={160}
                          />
                        ) : (
                          value.name
                        )}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          span: {
                            color: 'text.secondary',
                          },
                        }}>
                        {loading ? (
                          <Skeleton
                            variant='text'
                            width={120}
                          />
                        ) : (
                          <>
                            <b>Variant:</b> <span>{value.variantName}</span>
                          </>
                        )}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          span: {
                            color: 'text.secondary',
                          },
                        }}>
                        {loading ? (
                          <Skeleton
                            variant='text'
                            width={120}
                          />
                        ) : (
                          <>
                            <b>Quantity:</b> <span>{value.quantity}</span>
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    justifyContent='end'
                    alignItems='end'>
                    <Typography variant='subtitle1'>
                      {loading ? (
                        <Skeleton
                          variant='text'
                          width={60}
                        />
                      ) : (
                        <>
                          {fCurrency(cCurrency(value.price * value.quantity))}
                        </>
                      )}
                    </Typography>
                    <Box>
                      <IconButton
                        size='small'
                        color='error'
                        onClick={() => onDelete(value.sku)}>
                        <MdDeleteOutline size={20} />
                      </IconButton>
                    </Box>
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
