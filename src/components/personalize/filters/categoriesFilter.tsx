"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Stack,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoDotFill } from "react-icons/go";

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
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const pathSegments = pathname.split("/").filter(Boolean); // remove empty segments
  const currentCategorySlug = pathSegments[1] || null;
  const currentSubCategorySlug = pathSegments[2] || null;

  useEffect(() => {
    const index = data.findIndex(
      (category) =>
        category.slug === currentCategorySlug &&
        category.subCategories?.some(
          (sub) => sub.slug === currentSubCategorySlug
        )
    );

    if (index !== -1) {
      setSelectedIndex(index);
    } else {
      const catIndex = data.findIndex(
        (cat) => cat.slug === currentCategorySlug
      );
      setSelectedIndex(catIndex !== -1 ? catIndex : null);
    }
  }, [pathname, data]);

  const isActiveCategory = (slug: string) =>
    slug === currentCategorySlug && !currentSubCategorySlug;

  const isActiveSubCategory = (catSlug: string, subSlug: string) =>
    catSlug === currentCategorySlug && subSlug === currentSubCategorySlug;

  const handleToggle = (index: number) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box>
      <Typography variant="h6" color="text.primary" mb={1}>
        Catégories
      </Typography>

      <Box py={2}>
        {data.map((category: Category, index: number) => {
          const isOpen = selectedIndex === index;
          const isCategoryActive = isActiveCategory(category.slug) || isOpen;

          return (
            <Box key={category.name} mb={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Typography
                  variant="subtitle2"
                  component={Link}
                  href={`/personnaliser/${category.slug}`}
                  color={isCategoryActive ? "primary.main" : "text.primary"}
                  sx={{
                    pl: 0.2,
                    transition: "ease-in-out .3s",
                    ":hover": { color: "primary.main" },
                  }}
                >
                  {category.name}
                </Typography>

                {category?.subCategories?.length > 0 && (
                  <IconButton
                    size="small"
                    onClick={() => handleToggle(index)}
                    sx={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      bgcolor: (theme) =>
                        isOpen
                          ? alpha(theme.palette.primary.main, 0.2)
                          : "inherit",
                      svg: {
                        color: isOpen ? "primary.main" : "inherit",
                      },
                    }}
                  >
                    <IoChevronDownOutline />
                  </IconButton>
                )}
              </Stack>

              <Collapse in={isOpen}>
                <Stack spacing={1} mt={1}>
                  {category.subCategories.map((subCategory) => {
                    const isSubActive = isActiveSubCategory(
                      category.slug,
                      subCategory.slug
                    );

                    return (
                      <Typography
                        key={subCategory.slug}
                        variant="body2"
                        component={Link}
                        href={`/personnaliser/${category.slug}/${subCategory.slug}`}
                        color={isSubActive ? "primary.main" : "text.primary"}
                        sx={{
                          ml: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          transition: "ease-in-out .3s",
                          ":hover": {
                            color: "primary.main",
                            svg: { color: "primary.main" },
                          },
                        }}
                      >
                        <GoDotFill /> {subCategory.name}
                      </Typography>
                    );
                  })}
                </Stack>
              </Collapse>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
