"use client";
import PropTypes from "prop-types";
// mui
import {
  Box,
  Stack,
  IconButton,
  Typography,
  FormHelperText,
  Skeleton,
  Rating,
  Button,
  CardContent,
  alpha,
  Collapse,
} from "@mui/material";
// icons
import { IoIosAdd, IoIosRemove } from "react-icons/io";
// formik
import { useFormik, Form, FormikProvider, useField } from "formik";
// redux
import { addCart } from "@/redux/slices/product";
// components
// import ColorPreview from '@/components/colorPreview';
import { HiOutlinePercentBadge } from "react-icons/hi2";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";

import RootStyled from "./styled";
import ColorPreviewDetail from "@/components/colorPreviewDetail";
import MarkingSelector from "../markingSelector";
import MoreDetail from "./moreDetail";
// hooks
import { useCurrencyFormatter } from "@/hooks/formatCurrency";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Label from "@/components/label";

interface Option {
  name: string;
  cover: { url: string }[];
  price: number;
}

ProductDetailsSumaryMobile.propTypes = {
  product: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  totalReviews: PropTypes.number.isRequired,
  totalRating: PropTypes.number.isRequired,
  brand: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

const Incrementer = ({ ...props }) => {
  const { available, minQuantity, name } = props;
  const [field, , helpers] = useField({ name, ...props });
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    if (value < available) {
      setValue(value + 1);
    }
  };

  const decrementQuantity = () => {
    if (value > minQuantity) {
      setValue(value - 1);
    }
  };

  return (
    <Box className="incrementer">
      <IconButton
        color="inherit"
        disabled={value <= minQuantity}
        onClick={decrementQuantity}
      >
        <IoIosRemove />
      </IconButton>
      <Typography variant="body1" component="span" className="text">
        {value}
      </Typography>
      <IconButton
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <IoIosAdd />
      </IconButton>
    </Box>
  );
};

Incrementer.propTypes = {
  available: PropTypes.number.isRequired,
  minQuantity: PropTypes.number, // New prop added
  name: PropTypes.string.isRequired,
};

export default function ProductDetailsSumaryMobile({ ...props }) {
  const {
    product,
    isLoading,
    totalReviews,
    totalRating,
    handleColorClick,
    selectedColor,
    selectVariant,
    isPopup,
  } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const fCurrency = useCurrencyFormatter();
  const [markingType, setMarkingType] = useState<string | null>(null);
  const [markingLocations, setMarkingLocations] = useState<Option[]>([]);
  const handleMarkingTypeSelect = (type: string) => {
    setMarkingType(type);
  };

  const handleMarkingLocationSelect = (location: Option) => {
    setMarkingLocations(
      (prev) =>
        prev.includes(location)
          ? prev.filter((loc) => loc !== location) // Deselect if already selected
          : [...prev, location] // Add to selection
    );
  };

  const totalPrice = markingLocations.reduce(
    (sum, item) => sum + Number(item.price), // Use Number() to ensure it's a numeric value
    0
  );

  const onAddCart = (param: {
    pid: string;
    name: string;
    variant: string;
    sku: string;
    markingType: string | null;
    markingPosition: { name: string }[];
    image: { cover: { url: string } };
    quantity: string;
    price: string;
    subtotal: number;
    variantName: string;
  }) => {
    toast.success("Added to cart");
    dispatch(addCart(param));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pid: product?.id,
      cover: product?.images[0].url,
      quantity: product?.minQuantity,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        onAddCart({
          pid: product.id,
          name: product.name,
          variantName: selectVariant.name,
          variant: selectVariant,
          sku: selectVariant.sku,
          markingType: markingType,
          markingPosition: markingLocations,
          image: selectVariant.images[0].url,
          quantity: values.quantity,
          price: product.priceSale === 0 ? product.price : product.priceSale,
          subtotal:
            ((product.price || product.priceSale) + totalPrice) *
            values.quantity,
        });
        setFieldValue("quantity", 1);
        setSubmitting(false);
        router.push("/order");
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    },
  });
  const { touched, errors, handleSubmit, setFieldValue } = formik;

  return (
    <RootStyled>
      <CardContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack gap={1}>
              <div>
                <Label color="error">{product.category.name}</Label>
              </div>
              <Typography noWrap variant="h3" fontWeight={800}>
                {product?.name}
              </Typography>
              <Stack direction="row" gap={1} alignItems="center">
                <Rating
                  value={totalRating}
                  precision={0.1}
                  size="small"
                  readOnly
                />

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ flexGrow: 1 }}
                >
                  {totalReviews}{" "}
                  <span>{Number(totalReviews) > 1 ? "Reviews" : "Review"}</span>
                </Typography>

                <Typography
                  variant="h4"
                  color="primary.main"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    del: {
                      fontSize: 16,
                      color: "text.secondary",
                      fontWeight: 500,
                      textDecoration: "line-through",
                      mr: 1,
                    },
                  }}
                >
                  <del>
                    {product?.price > product?.priceSale
                      ? fCurrency(product?.price)
                      : null}{" "}
                  </del>
                  {fCurrency(product?.priceSale)}
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                {product.shortDescription}
              </Typography>
              <Stack direction={"row"} gap={3} mt={1}>
                {product?.price > product?.priceSale && (
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <IconButton
                      color="primary"
                      sx={{
                        borderRadius: "8px",
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.2),
                        border: (theme) =>
                          "1px solid " + theme.palette.primary.main,
                      }}
                    >
                      <HiOutlinePercentBadge />
                    </IconButton>
                    <Typography variant="subtitle2" color="text.primary">
                      {(
                        100 -
                        (product?.priceSale / product?.price) * 100
                      ).toFixed(0)}
                      % de réduction
                    </Typography>
                  </Stack>
                )}
                {product?.available > 0 && (
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <IconButton
                      color="success"
                      sx={{
                        borderRadius: "8px",
                        bgcolor: (theme) =>
                          alpha(theme.palette.success.main, 0.2),
                        border: (theme) =>
                          "1px solid " + theme.palette.success.main,
                      }}
                    >
                      <MdOutlineShoppingCartCheckout />
                    </IconButton>
                    <Typography variant="subtitle2" color="text.primary">
                      {product?.available} article(s) disponible(s)
                    </Typography>
                  </Stack>
                )}

                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <IconButton
                    color="error"
                    sx={{
                      borderRadius: "8px",
                      bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
                      border: (theme) =>
                        "1px solid " + theme.palette.error.main,
                    }}
                  >
                    <LiaShippingFastSolid />
                  </IconButton>
                  <Typography variant="subtitle2" color="text.primary">
                    Livraison rapide
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={1} my={3}>
                <Stack alignItems="start" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      textTransform: "uppercase",
                    }}
                  >
                    VEUILLEZ SÉLECTIONNER LA COULEUR
                  </Typography>
                  <ColorPreviewDetail
                    colors={product?.variants}
                    handleColorClick={handleColorClick}
                    selectedColor={selectedColor}
                  />
                </Stack>
                <MarkingSelector
                  selectedColor={selectedColor}
                  markingType={markingType}
                  markingLocations={markingLocations}
                  handleMarkingTypeSelect={handleMarkingTypeSelect}
                  handleMarkingLocationSelect={handleMarkingLocationSelect}
                  totalPrice={totalPrice}
                  category={product?.category}
                  priceSale={product?.priceSale || product?.price}
                  quantity={product?.minQuantity}
                />
                <Collapse in={Boolean(markingLocations.length)}>
                  <Stack spacing={1} className="incrementer-wrapper">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{
                        mt: 2,
                        mb: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      QUANTITÉ
                    </Typography>

                    {isLoading ? (
                      <Box sx={{ float: "right" }}>
                        <Skeleton variant="rounded" width={120} height={40} />
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex" }}>
                        <Incrementer
                          name="quantity"
                          minQuantity={product?.minQuantity}
                          available={product?.available}
                        />
                        {touched.quantity && errors.quantity && (
                          <FormHelperText error>
                            {touched.quantity && (errors.quantity as string)}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
                    <div>
                      <Button
                        disabled={
                          isLoading || product?.available < product?.minQuantity
                        }
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 0.5 }}
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </Stack>
                </Collapse>

                {!isPopup && <MoreDetail />}
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      </CardContent>
    </RootStyled>
  );
}
