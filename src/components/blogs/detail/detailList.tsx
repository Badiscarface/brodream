import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { fDateShortMth } from '@/utils/formatTime';

export default function DetailList({ ...props }) {
  const { detail } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
      }}>
      <Box
        sx={{
          position: 'relative',
          height: 400,
          width: '100%',
          mb: 2,
          img: {
            objectFit: 'cover',
          },
        }}>
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 10,
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
            {fDateShortMth(new Date(detail.createdAt))}
          </Typography>
        </Box>
        <Image
          src={detail.cover.url}
          alt={detail.name}
          fill
        />
      </Box>
      <Box
        dangerouslySetInnerHTML={{
          __html: `${detail.description}`,
        }}
      />
      {detail.section.map(
        (item: {
          name: string;
          description: string;
          cover: {
            url: string;
          };
        }) => (
          <Box
            key={Math.random()}
            sx={{
              position: 'relative',
            }}>
            <Typography variant='h3'>{item.name}</Typography>
            <Box
              sx={{
                position: 'relative',
                height: 400,
                width: '100%',
                mb: 2,
                img: {
                  objectFit: 'cover',
                },
              }}>
              <Image
                src={detail.cover.url}
                alt={item.name}
                fill
              />
            </Box>
            <Box
              dangerouslySetInnerHTML={{
                __html: `${item.description}`,
              }}
            />
          </Box>
        )
      )}
    </Box>
  );
}
