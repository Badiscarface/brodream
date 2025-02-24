'use client';
import React, { useEffect } from 'react';
// mui
import {
  Box,
  Collapse,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
// icons
import { IoChevronDownOutline } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Category {
  name: string;
  slug: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  name: string;
  slug: string;
}

export default function CategoriesFilter({ ...props }) {
  const { data } = props;
  const theme = useTheme();
  const pathname = usePathname();
  console.log(pathname, 'pathname');
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  useEffect(() => {
    data.forEach((category: Category, index: number) => {
      if (
        category.subCategories.some(
          (subCategory) =>
            pathname === `/personalize/${category.slug}/${subCategory.slug}`
        )
      ) {
        setSelectedIndex(index); // Open the corresponding category collapse
      }
    });
  }, [pathname, data]);

  const handleToggle = (index: number) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const isActive = (slug: string) => pathname === slug;

  return (
    <Box>
      <Typography
        variant='h6'
        color='text.primary'
        mb={1}>
        Catégories
      </Typography>
      <Box
        sx={{
          height: 3,
          minHeight: 2,
          width: 50,
          bgcolor: 'text.secondary',
          borderRadius: 2,
        }}
      />
      <Box py={2}>
        {data.map((category: Category, index: number) => (
          <Box
            key={category.name}
            mb={1}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={1}>
              <Typography
                variant='subtitle2'
                color={
                  isActive('/personalize/' + category.slug)
                    ? 'text.secondary'
                    : 'text.primary'
                }
                component={Link}
                href={'/personalize/' + category.slug}
                sx={{
                  transition: 'ease-in-out .3s',
                  ':hover': {
                    color: theme.palette.primary.light,
                  },
                }}>
                {category.name}
              </Typography>
              {category?.subCategories && (
                <IconButton
                  size='small'
                  onClick={() => handleToggle(index)}
                  sx={{
                    transform:
                      selectedIndex === index
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}>
                  <IoChevronDownOutline />
                </IconButton>
              )}
            </Stack>
            {category.subCategories && (
              <Collapse in={selectedIndex === index}>
                <Stack spacing={1}>
                  {category.subCategories.map((subCategory: SubCategory) => (
                    <Typography
                      key={subCategory.name}
                      variant='body2'
                      color={
                        isActive(
                          `/personalize/${category.slug}/${subCategory.slug}`
                        )
                          ? 'text.secondary'
                          : 'text.primary'
                      }
                      component={Link}
                      href={`/personalize/${
                        category.slug + '/' + subCategory.slug
                      }`}
                      sx={{
                        ml: 1,
                        display: 'block',
                        transition: 'ease-in-out .3s',
                        ':hover': {
                          color: theme.palette.primary.light,
                        },
                      }}>
                      {subCategory.name}
                    </Typography>
                  ))}
                </Stack>
              </Collapse>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
