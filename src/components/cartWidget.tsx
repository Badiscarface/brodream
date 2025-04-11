import { sum } from "lodash";
import { useSelector } from "react-redux";
import { useRouter } from "next-nprogress-bar";
import { Badge, IconButton, Stack, Typography, alpha } from "@mui/material";
import { HiOutlineShoppingBag } from "react-icons/hi2";

// Custom Hooks
import { useCurrencyConvert } from "@/hooks/convertCurrency";
import { useCurrencyFormatter } from "@/hooks/formatCurrency";

// Interfaces
interface CartItem {
  quantity: number;
  price: number;
  priceSale?: number;
}

interface Checkout {
  cart: CartItem[];
}

interface RootState {
  product: {
    checkout: Checkout;
  };
}

export default function CartWidget({ ...props }) {
  const {
    checkout: { cart = [] },
  } = useSelector((state: RootState) => state.product);
  const router = useRouter();

  // Calculate total items and subtotal
  const totalItems = sum(cart.map((item) => item.quantity));

  return (
    <Stack
      onClick={() => router.push("/cart")}
      direction="row"
      spacing={1}
      alignItems="center"
      width="auto"
      sx={{
        cursor: "pointer",
      }}
    >
      <Badge badgeContent={totalItems} color="primary" showZero>
        <IconButton
          size={props.isDeskTop ? "medium" : "small"}
          name="cart"
          disableRipple
          color="primary"
          sx={{
            borderColor: "primary",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: "8px",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <HiOutlineShoppingBag fontSize="24" />
        </IconButton>
      </Badge>
    </Stack>
  );
}
