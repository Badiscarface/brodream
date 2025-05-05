"use client";
import * as React from "react";
import { useRouter } from "next-nprogress-bar";
import {
  alpha,
  Box,
  TextField,
  Skeleton,
  InputAdornment,
  Stack,
  Button,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FiSearch } from "react-icons/fi";
import NoDataFound from "@/illustrations/dataNotFound";
import BlurImageAvatar from "@/components/avatar";
import { useMutation } from "@tanstack/react-query";
import * as api from "@/services";
import { useCurrencyConvert } from "@/hooks/convertCurrency";
import { useCurrencyFormatter } from "@/hooks/formatCurrency";

// =================== Types ===================

interface Product {
  id: string;
  slug: string;
  name: string;
  priceSale: number;
  category?: {
    name: string;
  };
  images: {
    url: string;
  }[];
}

interface FilterProps {
  id: string;
}

interface SearchProps {
  onClose: (selected?: any) => void;
}

// =================== Component ===================
const useSearchProducts = (setState: any) => {
  return useMutation({
    mutationFn: api.search,
    onSuccess: (data) => {
      setState((prev: any) => ({ ...prev, products: data?.data || [] }));
    },
  });
};
export default function Search({ onClose }: SearchProps) {
  const [state, setState] = React.useState<{
    products: Product[];
    selected: FilterProps[];
    initialized: boolean;
    category: string;
  }>({
    products: [],
    selected: [],
    initialized: false,
    category: "",
  });

  const [search, setSearch] = React.useState("");
  const [focus, setFocus] = React.useState(true);

  const router = useRouter();
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const { mutate, isPending: isLoading } = useSearchProducts(setState); // 'isPending' is the new name for 'isLoading'

  const handleListItemClick = (product: Product | string) => {
    if (multiSelect && typeof product !== "string") {
      const exists = state.selected.some((v) => v.id === product.id);
      const updatedSelected = exists
        ? state.selected.filter((v) => v.id !== product.id)
        : [...state.selected, { id: product.id }];
      setState((prev) => ({ ...prev, selected: updatedSelected }));
    } else {
      if (!mobile && typeof product === "string") {
        onClose?.();
      }
      router.push(
        `/product/${typeof product === "string" ? product : product.slug}`
      );
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      setFocus(false);
    }
  };

  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search?.trim()) mutate(search);
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [search, mutate]);

  return (
    <>
      <TextField
        variant="standard"
        placeholder="Rechercher des produits"
        onFocus={() => setFocus(true)}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          setSearch(e.target.value);
          setState((prev) => ({ ...prev, initialized: true }));
        }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <FiSearch size={20} />
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInput-root": {
            height: { lg: 72, md: 72, sm: 72, xs: 56 },
          },
        }}
      />

      <Divider />

      <Box className="scroll-main">
        <Box sx={{ height: "342px", overflow: "auto" }}>
          {state.initialized && !isLoading && state.products.length === 0 && (
            <Stack justifyContent="center" alignItems="center">
              <NoDataFound className="svg" />
            </Stack>
          )}

          {(isLoading || state.products.length > 0) && (
            <MenuList
              autoFocusItem={!focus}
              sx={{
                pt: 0,
                mt: 1,
                overflow: "auto",
                px: 1,
                li: {
                  borderRadius: "8px",
                  border: "1px solid transparent",
                  "&:hover, &.Mui-focusVisible, &.Mui-selected, &.active": {
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}`,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    h6: { color: "primary.main" },
                  },
                },
              }}
            >
              {(isLoading
                ? Array.from(new Array(8)).map((_, index) => ({
                    id: `skeleton-${index}`,
                  }))
                : state.products
              ).map((product: any) => (
                <MenuItem
                  key={product.id}
                  className={
                    state.selected.some((v) => v.id === product.id)
                      ? "active"
                      : ""
                  }
                  onClick={() => handleListItemClick(product.slug)}
                >
                  <ListItemIcon>
                    {isLoading ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <BlurImageAvatar
                        alt={product.name}
                        src={product.images?.[0]?.url}
                        priority
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    <Stack
                      direction="row"
                      gap={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <div>
                        <Typography
                          variant="subtitle1"
                          color="text.primary"
                          noWrap
                        >
                          {isLoading ? <Skeleton width={200} /> : product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {isLoading ? (
                            <Skeleton width={200} />
                          ) : (
                            product?.category?.name
                          )}
                        </Typography>
                      </div>
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        noWrap
                      >
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          fCurrency(cCurrency(product.priceSale))
                        )}
                      </Typography>
                    </Stack>
                  </ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          )}
        </Box>
      </Box>
    </>
  );
}
