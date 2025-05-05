"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sum } from "lodash";

// MUI
import { Box, Grid, Stack } from "@mui/material";

// Formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

// Components
import PaymentInfo from "./paymentInfo";
import LoadingButton from "../LoadingButton";

// Redux
import { deleteCart, getCart, resetCart } from "@/redux/slices/product";

// API
import * as api from "@/services";

// Dynamic imports
const CheckoutForm = dynamic(() => import("@/components/forms/checkout"));
const CartItemsCard = dynamic(() => import("@/components/cards/cartItems"));

// Types
interface Error {
  response: {
    data: {
      message: string;
    };
  };
}

interface CartItem {
  productId: string;
  quantity: number;
  [key: string]: any;
}

const CheckoutMain: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state: any) => state.product);
  const cart: CartItem[] = checkout.cart;
  console.log(checkout, "checkout");
  const [isProcessing, setProcessingTo] = useState(false);
  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId: string) => {
    dispatch(deleteCart(productId));
  };

  const mutation = useMutation({
    mutationFn: api.placeOrder,
    onSuccess: (data: any) => {
      toast.success("Commande passée !");
      setProcessingTo(false);
      router.push(`/order/${data.quotationId}`);
      dispatch(resetCart());
    },
    onError: (err: Error) => {
      toast.error(err.response?.data?.message || "Une erreur s'est produite");
      setProcessingTo(false);
    },
  });

  useEffect(() => {
    if (cart.length < 1) {
      router.push("/");
    } else {
      dispatch(getCart(cart));
    }
  }, [cart.length, dispatch, router]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom est requis"),
    phone: Yup.string().required("Le numéro de téléphone est requis"),
    email: Yup.string()
      .email("Veuillez entrer une adresse email valide")
      .required("L'email est requis"),
    city: Yup.string().required("La ville est requise"),
    state: Yup.string().required("La région est requise"),
    country: Yup.string().required("Le pays est requis"),
    zip: Yup.string().required("Le code postal est requis"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      note: "",
      cover: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const totalItems = sum(cart.map((item) => item.quantity));

      const payload = {
        items: [...cart],
        userInfo: values,
        totalItems,
        email: values.email,
      };

      setProcessingTo(true);
      mutation.mutate(payload);
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box py={5}>
          <Grid container spacing={2}>
            <Grid size={{ md: 8, xs: 12 }}>
              <CheckoutForm
                getFieldProps={getFieldProps}
                touched={touched}
                errors={errors}
                values={values}
                setFieldValue={setFieldValue}
              />
            </Grid>
            <Grid size={{ md: 4, xs: 12 }}>
              <Stack gap={2}>
                <CartItemsCard
                  cart={cart}
                  loading={false}
                  isEmptyCart={isEmptyCart}
                  onDelete={handleDeleteCart}
                />

                <PaymentInfo checkout={checkout} />

                <LoadingButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  loading={mutation.isPending || isProcessing}
                  disabled={isEmptyCart}
                  size="large"
                >
                  Envoyer la demande de devis
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default CheckoutMain;
