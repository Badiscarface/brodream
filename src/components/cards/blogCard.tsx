'use client';
import React from 'react';
// mui
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
// next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import { fDateShortMth } from '@/utils/formatTime';

export default function BlogCard({ ...props }) {
  const { item } = props;
  const theme = useTheme();
  const router = useRouter();
  return (
    <Card
      sx={{
        overflow: 'unset',
        ':hover': {
          '.datePicker': {
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        },
      }}>
      <Box
        className='datePicker'
        sx={{
          position: 'absolute',
          top: 20,
          left: -10,
          height: 30,
          width: 60,
          bgcolor: theme.palette.common.white,
          border: '1px solid' + theme.palette.primary.main,
          borderRadius: 1,
          zIndex: 99,
          transition: 'ease-in-out .3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography
          variant='subtitle2'
          textAlign='center'>
          {fDateShortMth(new Date(item?.createdAt))}
        </Typography>
      </Box>
      <Card
        sx={{
          border: 'none !important',
        }}>
        <Grid2
          container
          alignContent='center'
          justifyContent='center'>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <CardActionArea onClick={() => router.push(`/blogs/${item.slug}`)}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  img: {
                    objectFit: 'cover',
                  },
                  '&:after': {
                    content: `""`,
                    display: 'block',
                    paddingBottom: '100%',
                  },
                }}>
                <Image
                  src={item.cover.url}
                  alt='Blog Img'
                  fill
                  priority
                />
              </Box>
            </CardActionArea>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Stack spacing={2}>
                <Typography
                  variant='h5'
                  component={Link}
                  href={`/blogs/${item.slug}`}
                  color='text.primary'
                  sx={{
                    transition: 'ease-in-out .3s',
                    ':hover': {
                      color: (theme) =>
                        theme.palette.primary.light + '!important',
                    },
                  }}>
                  {item.title}
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  dangerouslySetInnerHTML={{
                    __html: `${item.description.slice(0, 200)}`,
                  }}
                />
              </Stack>
            </CardContent>
          </Grid2>
        </Grid2>
      </Card>
    </Card>
  );
}
