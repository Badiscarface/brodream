'use client';
import React, { useState } from 'react';
// next
import Image from 'next/image';
// mui
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
// icons
import { GoEye } from 'react-icons/go';
// image
// import { FaStar } from 'react-icons/fa';
import ColorPreviewGroup from '../colorPreviewGroup';
import ProductDetailsDialog from '../dialog/productDetails';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import * as api from '@/services';
import { useQuery } from 'react-query';
// hooks
import { useCurrencyConvert } from '@/hooks/convertCurrency';
import { useCurrencyFormatter } from '@/hooks/formatCurrency';

export default function ProductCard({ ...props }) {
  const { item } = props;
  const router = useRouter();
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const { data, isLoading } = useQuery(['product-detail-slug', item.slug], () =>
    api.getProductBySlug(item.slug)
  );
  const [open, setOpen] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const handleColorClick = (color: string) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const selectImage = item?.variants?.find(
    (items: { name: string }) => items.name === selectedColor
  );
  console.log(selectImage, item, 'itemitem');

  return (
    <Card
      onMouseEnter={() => setOpenActions(true)}
      onMouseLeave={() => setOpenActions(false)}>
      <Box
        sx={{
          position: 'relative',
          height: '100%',
        }}>
        <Box
          onClick={() => router.push(`/product/${item.slug}`)}
          sx={{
            cursor: 'pointer',
            position: 'relative',
            height: { xs: 200, md: 250 },
            width: '100%',
            img: {
              objectFit: 'cover',
            },
          }}>
          <Image
            src={selectImage ? selectImage?.image.url : item?.image.url}
            alt={item.name}
            fill
            priority
          />
        </Box>
        <Zoom in={openActions}>
          <Box>
            {}
            <Stack
              direction={'row'}
              sx={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translate(-50%, 0px)',
                bgcolor: 'background.paper',
                borderRadius: '27px',
                p: '2px',
                zIndex: 11,
              }}>
              {
                <Tooltip title='Quick View'>
                  <IconButton
                    aria-label='Quick View'
                    onClick={() => setOpen(true)}>
                    <GoEye />
                  </IconButton>
                </Tooltip>
              }
            </Stack>
          </Box>
        </Zoom>
      </Box>
      <CardContent
        sx={{
          p: 1.5,
          pb: '16px !important',
          height: '100%',
        }}>
        <ColorPreviewGroup
          handleColorClick={handleColorClick}
          selectedColor={selectedColor}
          colors={item.variants}
        />
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={2}>
          <Typography
            variant='h6'
            color='text.primary'
            component={Link}
            href='/product/abcd'
            noWrap>
            {item.name}
          </Typography>
          {/* <Typography
            variant='body2'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              svg: {
                color: 'warning.main',
              },
            }}>
            ({item.rating})
            <FaStar />
          </Typography> */}
        </Stack>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={2}>
          <Typography variant='subtitle1'>
            {' '}
            {fCurrency(cCurrency(item.priceSale))}
          </Typography>
        </Stack>
      </CardContent>
      {open && (
        <ProductDetailsDialog
          open={open}
          isPopup
          onClose={() => setOpen(false)}
          slug={item.slug}
          data={data?.data}
          totalRating={data?.data?.totalRating}
          totalReviews={data?.data?.totalReviews}
          category={data?.data?.category}
          isLoading={isLoading}
        />
      )}
    </Card>
  );
}
