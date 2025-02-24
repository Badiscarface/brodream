'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next-nprogress-bar';
// mui
import { Box, Grid, Stack } from '@mui/material';
// yup
import * as Yup from 'yup';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
import PaymentInfo from './paymentInfo';
import LoadingButton from '../LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { deleteCart, getCart, resetCart } from '@/redux/slices/product';
// api
import * as api from '@/services';
import { sum } from 'lodash';

// import { useQuery } from 'react-query';

interface Error {
  response: {
    data: {
      message: string;
    };
  };
}

// dynamic components
const CheckoutForm = dynamic(() => import('@/components/forms/checkout'));

const CartItemsCard = dynamic(() => import('@/components/cards/cartItems'));

const CheckoutMain = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { checkout } = useSelector(({ product }: any) => product);
  const { cart } = checkout;
  const [isProcessing, setProcessingTo] = useState(false);

  const [count, setCount] = React.useState(0);

  const isEmptyCart = cart.length === 0;
  const handleDeleteCart = (productId: string) => {
    dispatch(deleteCart(productId));
    setCount((prev) => prev + 1);
  };

  const { mutate, isLoading } = useMutation('order', api.placeOrder, {
    onSuccess: (data) => {
      toast.success('Order placed!');
      setProcessingTo(false);
      router.push(`/order/${data.quotationId}`);
      dispatch(resetCart());
    },
    onError: (err: Error) => {
      toast.error(err.response.data.message || 'Something went wrong');
      setProcessingTo(false);
    },
  });

  // React.useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  React.useEffect(() => {
    formik.validateForm();
    if (cart.length < 1) {
      router.push('/');
    }
    dispatch(getCart(cart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const NewAddressSchema = Yup.object().shape({
    name: Yup.string().required('Organization name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string()
      .email('Enter email Valid')
      .required('Email is required'),
    // address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zip: Yup.string().required('Postal is required'),
    // cover: Yup.mixed().required('Cover is required'),
  });

  // Define initial values
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      note: '',
      cover: null,
    },
    enableReinitialize: true,
    validationSchema: NewAddressSchema,
    onSubmit: async (values) => {
      const items = cart.map(({ ...others }) => others);
      const totalItems = sum(
        items.map((item: { quantity: number }) => item.quantity)
      );

      const data = {
        items: items,
        userInfo: values,
        totalItems: totalItems,
        email: values.email,
      };

      mutate(data);
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
      <Form
        autoComplete='off'
        noValidate
        onSubmit={handleSubmit}>
        <Box py={5}>
          <Grid
            container
            spacing={2}>
            <Grid
              item
              xs={12}
              md={8}>
              <CheckoutForm
                getFieldProps={getFieldProps}
                touched={touched}
                errors={errors}
                values={values}
                setFieldValue={setFieldValue}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}>
              <Stack gap={2}>
                <CartItemsCard
                  cart={cart}
                  loading={false}
                  isEmptyCart={isEmptyCart}
                  onDelete={handleDeleteCart}
                />

                <PaymentInfo />
                <LoadingButton
                  type='submit'
                  variant='contained'
                  fullWidth
                  loading={isLoading || isProcessing}
                  size='large'>
                  Send Request for quotation
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

// const cart = [
//   {
//     _id: '66978913a0dd17342cf7745d',
//     name: "NBA LOS ANGELES LAKERS OLD ENGLISH MEN'S SWEATPANT",
//     brand: '6694aef5c71c3b718e0cf02e',
//     slug: 'nba-los-angeles-lakers-old-english-mens-sweatpant',
//     price: 60,
//     priceSale: 58,
//     available: 58,
//     pid: '66978913a0dd17342cf7745d',
//     quantity: 1,
//     size: 'sm',
//     image:
//       'https://res.cloudinary.com/dcuwtg4h1/image/upload/v1721207000/BLL4515750-YEL_2_bpt1rq.webp',
//     color: 'yellow',
//     subtotal: '58.00',
//     sku: 'classic-track-pants-white-sm-yellow',
//   },
//   {
//     _id: '66978913a0dd17342cf7745d',
//     name: "NBA LOS ANGELES LAKERS OLD ENGLISH MEN'S SWEATPANT",
//     brand: '6694aef5c71c3b718e0cf02e',
//     slug: 'nba-los-angeles-lakers-old-english-mens-sweatpant',
//     price: 60,
//     priceSale: 58,
//     available: 58,
//     pid: '66978913a0dd17342cf7745d',
//     quantity: 1,
//     size: 'sm',
//     image:
//       'https://res.cloudinary.com/dcuwtg4h1/image/upload/v1721207000/BLL4515750-YEL_2_bpt1rq.webp',
//     color: 'yellow',
//     subtotal: '58.00',
//     sku: 'classic-track-pants-white-sm-yellow',
//   },
//   {
//     _id: '66978913a0dd17342cf7745d',
//     name: "NBA LOS ANGELES LAKERS OLD ENGLISH MEN'S SWEATPANT",
//     brand: '6694aef5c71c3b718e0cf02e',
//     slug: 'nba-los-angeles-lakers-old-english-mens-sweatpant',
//     price: 60,
//     priceSale: 58,
//     available: 58,
//     pid: '66978913a0dd17342cf7745d',
//     quantity: 1,
//     size: 'sm',
//     image:
//       'https://res.cloudinary.com/dcuwtg4h1/image/upload/v1721207000/BLL4515750-YEL_2_bpt1rq.webp',
//     color: 'yellow',
//     subtotal: '58.00',
//     sku: 'classic-track-pants-white-sm-yellow',
//   },
// ];
