"use client";
import React, { useState } from "react";
import Image from "next/image";
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
  Button,
  alpha,
  Skeleton,
} from "@mui/material";
// icons
import { GoEye } from "react-icons/go";
// custom components
import ColorPreviewGroup from "../colorPreviewGroup";
import ProductDetailsDialog from "../dialog/productDetails";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";

// hooks
import { useCurrencyFormatter } from "@/hooks/formatCurrency";

export default function ProductCard({ ...props }) {
  const { item, isLoading } = props;
  const router = useRouter();
  const fCurrency = useCurrencyFormatter();

  const [open, setOpen] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorClick = (color: string) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const selectImage = item?.variants?.find(
    (items: { name: string }) => items.name === selectedColor
  );

  return (
    <Card
      onMouseEnter={() => setOpenActions(true)}
      onMouseLeave={() => setOpenActions(false)}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          px: 1.5,
          pt: 1.5,
        }}
      >
        {isLoading ? (
          <Skeleton
            width={"100%"}
            sx={{ height: { xs: 220, md: 250 } }}
            variant="rounded"
          />
        ) : (
          <Box
            onClick={() => router.push(`/product/${item?.slug}`)}
            sx={{
              cursor: "pointer",
              position: "relative",
              height: { xs: 220, md: 250 },
              width: "100%",
              img: {
                objectFit: "cover",
                borderRadius: "12px",
              },
            }}
          >
            <Image
              src={selectImage ? selectImage?.image.url : item?.image.url}
              alt={item.name}
              fill
              priority
            />
          </Box>
        )}

        <Zoom in={openActions}>
          <Box>
            <Stack
              direction={"row"}
              sx={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translate(-50%, 0px)",
                bgcolor: "background.paper",
                borderRadius: "27px",
                p: "2px",
                zIndex: 11,
              }}
            >
              <Tooltip title="Aperçu rapide">
                <IconButton
                  aria-label="Aperçu rapide"
                  onClick={() => setOpen(true)}
                >
                  <GoEye />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Zoom>
      </Box>

      <CardContent sx={{ p: 1.5, pb: "16px !important", height: "100%" }}>
        <Stack gap={1}>
          <Typography
            variant="h6"
            color="text.primary"
            component={Link}
            href={`/product/${item?.slug}`}
            noWrap
            lineHeight={1}
          >
            {isLoading ? <Skeleton variant="text" width={100} /> : item.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" lineHeight={1}>
            {isLoading ? (
              <Skeleton variant="text" width={120} />
            ) : (
              item.shortDescription
            )}
          </Typography>

          {isLoading ? (
            <Stack direction="row" gap={0.5}>
              {[...new Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={27}
                  height={27}
                />
              ))}
            </Stack>
          ) : (
            <ColorPreviewGroup
              handleColorClick={handleColorClick}
              selectedColor={selectedColor}
              colors={item.variants}
            />
          )}

          <div>
            {isLoading ? (
              <Skeleton variant="rounded" width={153} height={32} />
            ) : (
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  boxShadow: "none",
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                }}
                size="small"
              >
                À partir de {fCurrency(item.priceSale)}
              </Button>
            )}
          </div>
        </Stack>
      </CardContent>

      {open && (
        <ProductDetailsDialog
          open={open}
          isPopup
          onClose={() => setOpen(false)}
          slug={item.slug}
        />
      )}
    </Card>
  );
}
