import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// mui
import { styled } from '@mui/material/styles';
import {
  Button,
  TextField,
  Typography,
  FormHelperText,
  Stack,
  Rating,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import LoadingButton from '@/components/LoadingButton';
// react
import { useMutation } from 'react-query';
// api
import * as api from '@/services';
import axios from 'axios';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';

// dynamic
const UploadMultiFile = dynamic(
  () => import('@/components/upload/UploadMultiFile')
);

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default,
}));

interface Image {
  url: string;
  id: string;
  blob: string;
}

interface Error {
  response: {
    data: {
      message: string;
    };
  };
}
interface ProductDetailsReviewFormProps {
  onClose: () => void;
  pid: string;
  onClickCancel: () => void;
}

const ProductDetailsReviewForm: React.FC<ProductDetailsReviewFormProps> = ({
  onClose,
  pid,
  onClickCancel,
  ...other
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const { mutate: deleteMutate } = useMutation(api.singleDeleteFile, {
    onError: (error: Error) => {
      toast.error(error.response.data.message);
    },
  });

  const ReviewSchema = Yup.object().shape({
    rating: Yup.mixed().required('Rating is required'),
    confortRating: Yup.mixed().required('Rating is required'),
    qualityRating: Yup.mixed().required('Rating is required'),
    headlines: Yup.string().required('Headlines is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      rating: null,
      confortRating: null,
      qualityRating: null,
      headlines: '',
      name: '',
      email: '',
      recommended: false,
      message: '',
      location: '',
      images: [] as Image[],
      blob: [] as File[],
    },
    validationSchema: ReviewSchema,
    onSubmit: async (values) => {
      mutate({
        ...values,
        rating: values.rating,
        status: 'pending',
        images: values.images.map((v) => v.url),
        pid: pid,
      });
    },
  });

  const {
    values,
    errors,
    touched,
    resetForm,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

  const { mutate, isLoading } = useMutation(api.addReview, {
    onSuccess: () => {
      toast.success('Review Added. Admin will approve soon');
      resetForm();
      onClose();
    },
  });

  const onCancel = () => {
    onClickCancel();
    resetForm();
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setLoading(true);
    const uploaders = acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        `${process.env.CLOUDINARY_UPLOAD_PRESET}`
      );
      setFieldValue('blob', [...values.blob, ...acceptedFiles]);

      return axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
    });

    const blobs = acceptedFiles.map((file) => {
      return URL.createObjectURL(file);
    });

    axios.all(uploaders).then((data) => {
      const newImages = data.map(({ data }, i) => ({
        url: data.secure_url,
        id: data.public_id,
        blob: blobs[i],
      }));
      setLoading(false);
      setFieldValue('images', [...values.images, ...newImages]);
    });
  };

  const handleRemoveAll = () => {
    values.images.forEach((image) => {
      deleteMutate({ id: image.id } as any);
    });
    setFieldValue('images', []);
  };

  const handleRemove = (file: Image) => {
    const removeImage = values.images.filter((_file) => {
      if (_file.id === file.id) {
        deleteMutate({ id: file.id } as any);
      }
      return _file !== file;
    });
    setFieldValue('images', removeImage);
  };

  return (
    <RootStyle {...other}>
      <Typography
        variant='subtitle1'
        gutterBottom>
        Write Your Reviews
      </Typography>

      <FormikProvider value={formik}>
        <Form
          autoComplete='off'
          noValidate
          onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack spacing={0.3}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                spacing={1.5}>
                <Typography variant='body2'>Your Review About</Typography>
                <Rating
                  {...getFieldProps('rating')}
                  onChange={(event: any) =>
                    setFieldValue('rating', event.target.value)
                  }
                />
              </Stack>
              {errors.rating && (
                <FormHelperText error>
                  {touched.rating && 'Rating Required'}
                </FormHelperText>
              )}
            </Stack>
            <TextField
              fullWidth
              label='Name'
              type='text'
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label='Email'
              type='text'
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              label='Headlines'
              type='text'
              {...getFieldProps('headlines')}
              error={Boolean(touched.headlines && errors.headlines)}
              helperText={touched.headlines && errors.headlines}
            />

            <Stack spacing={0.3}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                spacing={1.5}>
                <Typography variant='body2'>
                  How would you rate the quality?
                </Typography>
                <Rating
                  {...getFieldProps('qualityRating')}
                  onChange={(event: any) =>
                    setFieldValue('qualityRating', event.target.value)
                  }
                />
              </Stack>
              {errors.qualityRating && (
                <FormHelperText error>
                  {touched.qualityRating && 'Quality Rating Required'}
                </FormHelperText>
              )}
            </Stack>
            <TextField
              fullWidth
              label='Location'
              type='text'
              {...getFieldProps('location')}
              error={Boolean(touched.location && errors.location)}
              helperText={touched.location && errors.location}
            />
            <Stack spacing={0.3}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                spacing={1.5}>
                <Typography variant='body2'>
                  How would you rate the confort?
                </Typography>
                <Rating
                  {...getFieldProps('confortRating')}
                  onChange={(event: any) =>
                    setFieldValue('confortRating', event.target.value)
                  }
                />
              </Stack>
              {errors.confortRating && (
                <FormHelperText error>
                  {touched.confortRating && 'Confort Rating Required'}
                </FormHelperText>
              )}
            </Stack>
            <TextField
              fullWidth
              multiline
              rows={3}
              label='Message'
              type='text'
              {...getFieldProps('message')}
              error={Boolean(touched.message && errors.message)}
              helperText={touched.message && errors.message}
            />
            <UploadMultiFile
              showPreview
              maxSize={3145728}
              accept='image/*'
              files={values.images}
              loading={loading}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              blob={values.blob}
              error={Boolean(touched.images && errors.images)}
            />
            {touched.images && errors.images && (
              <FormHelperText
                error
                sx={{ px: 2 }}>
                {touched.images && (errors.images as string)}
              </FormHelperText>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps('recommended')}
                  checked={values.recommended}
                />
              }
              label='Would you recommend this product to a friend?'
            />
            <Stack
              direction='row'
              justifyContent='flex-end'>
              <Button
                type='button'
                color='inherit'
                size='large'
                variant='outlined'
                onClick={onCancel}
                sx={{ mr: 1.5 }}>
                Cancel
              </Button>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading}>
                Post Review
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
};

ProductDetailsReviewForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  pid: PropTypes.string.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

export default ProductDetailsReviewForm;
