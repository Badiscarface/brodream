'use client';
import React from 'react';
// /mui
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
  Stack,
  Typography,
  Button,
} from '@mui/material';
// next
import Image from 'next/image';
// image
// import TablierImg from '../../../public/images/tablier.jpg';
import { useRouter } from 'next-nprogress-bar';
import NoDataFoundIllustration from '@/illustrations/dataNotFound';

export default function ChooseUS({ ...props }) {
  const data = props;
  const detailData = data?.data;
  const router = useRouter();
  return (
    <Box
      sx={{
        position: 'relative',
        py: 5,
      }}>
      <Container>
        <Stack
          spacing={2}
          alignItems='center'
          textAlign='center'
          mb={5}>
          <Typography
            variant='h4'
            color='text.primary'>
            Actualités sur la personnalisation textile
          </Typography>
        </Stack>
        {detailData.length > 0 ? (
          <Grid2
            container
            spacing={4}>
            {detailData.slice(0, 2).map(
              (item: {
                title: string;
                description: string;
                slug: string;
                cover: {
                  url: string;
                };
              }) => (
                <Grid2
                  key={Math.random()}
                  size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      transition: 'ease-in-out .5s',
                      ':hover': {
                        borderColor: (theme) =>
                          theme.palette.primary.main + '!important',
                      },
                    }}>
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      alignItems='center'
                      spacing={2}>
                      <Box
                        sx={{
                          position: 'relative',
                          height: 220,
                          width: { xs: '100%', md: 220 },
                          minWidth: 220,
                          img: {
                            objectFit: 'cover',
                          },
                        }}>
                        <Image
                          src={item.cover.url}
                          alt={item.title}
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
                          spacing={2}
                          alignItems='center'
                          justifyContent='center'
                          textAlign='center'>
                          <Typography variant='subtitle1'>
                            {item.title}
                          </Typography>
                          <Typography
                            variant='body1'
                            dangerouslySetInnerHTML={{
                              __html: `${item.description.slice(0, 100)}`,
                            }}
                          />
                          <Box>
                            <Button
                              variant='outlined'
                              onClick={() => router.push(`/blogs/${item.slug}`)}
                              size='small'
                              color='primary'>
                              Read More
                            </Button>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Stack>
                  </Card>
                </Grid2>
              )
            )}
          </Grid2>
        ) : (
          <NoDataFoundIllustration />
        )}
      </Container>
    </Box>
  );
}
