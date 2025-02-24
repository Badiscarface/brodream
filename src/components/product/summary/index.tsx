'use client';
import PropTypes from 'prop-types';
// mui
import {
  Box,
  Stack,
  IconButton,
  Typography,
  FormHelperText,
  Skeleton,
  // Rating,
  Button,
} from '@mui/material';
// icons
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
// formik
import { useFormik, Form, FormikProvider, useField } from 'formik';
// redux
import { addCart } from '@/redux/slices/product';
// components
// import ColorPreview from '@/components/colorPreview';

import RootStyled from './styled';
import ColorPreviewDetail from '@/components/colorPreviewDetail';
import MarkingSelector from '../markingSelector';
import MoreDetail from './moreDetail';
// hooks
import { useCurrencyConvert } from '@/hooks/convertCurrency';
import { useCurrencyFormatter } from '@/hooks/formatCurrency';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

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
    <Box className='incrementer'>
      <IconButton
        size='small'
        color='inherit'
        disabled={value <= minQuantity}
        onClick={decrementQuantity}>
        <IoIosRemove />
      </IconButton>
      <Typography
        variant='body2'
        component='span'
        className='text'>
        {value}
      </Typography>
      <IconButton
        size='small'
        color='inherit'
        disabled={value >= available}
        onClick={incrementQuantity}>
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
    // totalReviews,
    // totalRating,
    category,
    handleColorClick,
    selectedColor,
    selectVariant,
    isPopup,
  } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const cCurrency = useCurrencyConvert();
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
    toast.success('Added to cart');
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
        setFieldValue('quantity', 1);
        setSubmitting(false);
        router.push('/order');
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    },
  });
  const { touched, errors, handleSubmit, setFieldValue } = formik;

  // const handleAddCart = () => {
  //   onAddCart({
  //     pid: product.id,
  //     name: product.name,
  //     variant: selectVariant,
  //     markingType: markingType,
  //     markingPosition: markingLocations,
  //     image: product?.images[0].url,
  //     quantity: formik.values.quantity,
  //     price: product.priceSale === 0 ? product.price : product.priceSale,
  //     subtotal:
  //       ((product.price || product.priceSale) + totalPrice) *
  //       formik.values.quantity,
  //   });
  //   setFieldValue('quantity', 1);
  // };

  return (
    <RootStyled>
      <FormikProvider value={formik}>
        <Form
          autoComplete='off'
          noValidate
          onSubmit={handleSubmit}>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}>
            <Typography
              noWrap
              variant='h4'>
              {product?.name}
            </Typography>
            {/* <Rating
              value={totalRating}
              precision={0.1}
              size='small'
              readOnly
            />
            <Typography
              variant='body1'
              color='primary'>
              {totalReviews}{' '}
              <span>{Number(totalReviews) > 1 ? 'Reviews' : 'Review'}</span>
            </Typography> */}

            <Typography variant='h4'>
              {!isLoading && fCurrency(cCurrency(product?.priceSale))}
            </Typography>
          </Stack>
          <Stack
            spacing={1}
            my={3}>
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}>
              <Typography variant='subtitle1'>Catégorie:</Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                fontWeight={400}>
                {category?.name || 'Commercehope'}
              </Typography>
            </Stack>
            {product?.price > product?.priceSale && (
              <Stack
                direction='row'
                alignItems='center'
                spacing={1}>
                <Typography variant='subtitle1'>Rabais:</Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  fontWeight={400}
                  className='text-discount'>
                  {!isLoading &&
                    `-${fCurrency(
                      cCurrency(product?.price - product?.priceSale)
                    )}`}
                  {
                    <span>
                      (
                      {(
                        100 -
                        (product?.priceSale / product?.price) * 100
                      ).toFixed(0)}
                      % Rabais)
                    </span>
                  }
                </Typography>
              </Stack>
            )}
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}>
              <Typography variant='subtitle1'>Disponible:</Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                fontWeight={400}
                sx={{
                  span: {
                    color: 'error.main',
                  },
                }}>
                {product?.available > 0 ? (
                  `${product?.available} Items`
                ) : (
                  <span>En rupture de stock</span>
                )}
              </Typography>
            </Stack>
            <Stack
              direction='row'
              alignItems='start'
              spacing={1}>
              <Typography variant='subtitle1'>Couleur :</Typography>
              <ColorPreviewDetail
                colors={product?.variants}
                handleColorClick={handleColorClick}
                selectedColor={selectedColor}
              />
            </Stack>
            <MarkingSelector
              markingType={markingType}
              markingLocations={markingLocations}
              handleMarkingTypeSelect={handleMarkingTypeSelect}
              handleMarkingLocationSelect={handleMarkingLocationSelect}
              totalPrice={totalPrice}
              category={product?.category}
              priceSale={product?.priceSale}
              quantity={product?.minQuantity}
            />
            <Stack
              direction='row'
              alignItems={{ xs: 'start', md: 'center' }}
              spacing={2}
              className='incrementer-wrapper'>
              <Typography variant='subtitle1'>Quantity:</Typography>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems='start'
                spacing={1}>
                {isLoading ? (
                  <Box sx={{ float: 'right' }}>
                    <Skeleton
                      variant='rounded'
                      width={120}
                      height={40}
                    />
                  </Box>
                ) : (
                  <div>
                    <Incrementer
                      name='quantity'
                      minQuantity={product?.minQuantity}
                      available={product?.available}
                    />
                    {touched.quantity && errors.quantity && (
                      <FormHelperText error>
                        {touched.quantity && (errors.quantity as string)}
                      </FormHelperText>
                    )}
                  </div>
                )}
                <Button
                  disabled={
                    isLoading ||
                    product?.available < product?.minQuantity ||
                    !selectedColor
                  }
                  fullWidth
                  type='submit'
                  variant='contained'
                  color='primary'>
                  Demander un devis
                </Button>
              </Stack>
            </Stack>
            {!isPopup && <MoreDetail />}
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyled>
  );
}
