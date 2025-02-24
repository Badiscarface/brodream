'use client';
import React from 'react';
// next
import Image from 'next/image';

// mui
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next-nprogress-bar';

export default function HomeCategoryCard({ ...props }) {
  const { item } = props;
  console.log(item);

  const router = useRouter();
  return (
    <Card>
      <CardActionArea onClick={() => router.push(`/personalize/${item.slug}`)}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: 200, md: 250 },
            width: '100%',
            img: {
              objectFit: 'cover',
            },
          }}>
          <Image
            src={item?.cover.url}
            alt={item.name}
            fill
            priority
          />
        </Box>
        <CardContent
          sx={{
            p: 1.5,
            pb: '16px !important',
          }}>
          <Stack
            alignItems='center'
            justifyContent='center'
            spacing={0.2}>
            <Typography
              variant='h6'
              color='text.primary'>
              {item.name}
            </Typography>
            <Typography variant='body2'>
              {item.productCount}{' '}
              {item.productCount > 1 ? 'Products' : 'Product'}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
