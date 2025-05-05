"use client";

import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import axios from "axios";

// mui
import {
  Button,
  TextField,
  Typography,
  FormHelperText,
  Stack,
  Rating,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingButton from "@/components/LoadingButton";

// formik
import { useFormik, Form, FormikProvider } from "formik";

// yup
import * as Yup from "yup";

// tanstack query
import { useMutation } from "@tanstack/react-query";

// api
import * as api from "@/services";

// dynamic component
const UploadMultiFile = dynamic(
  () => import("@/components/upload/UploadMultiFile")
);

// styles
const RootStyle = styled("div")(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: "8px",
  backgroundColor: theme.palette.background.default,
}));

// types
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
  const [loading, setLoading] = React.useState(false);

  const ReviewSchema = Yup.object().shape({
    rating: Yup.number().required("Rating is required"),
    confortRating: Yup.number().required("Rating is required"),
    qualityRating: Yup.number().required("Rating is required"),
    headlines: Yup.string().required("Headlines is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      rating: null,
      confortRating: null,
      qualityRating: null,
      headlines: "",
      name: "",
      email: "",
      recommended: false,
      message: "",
      location: "",
      images: [] as Image[],
      blob: [] as File[],
    },
    validationSchema: ReviewSchema,
    onSubmit: async (values) => {
      reviewMutation.mutate({
        ...values,
        status: "pending",
        images: values.images.map((v) => v.url),
        pid,
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

  const reviewMutation = useMutation({
    mutationFn: api.addReview,
    onSuccess: () => {
      toast.success("Review Added. Admin will approve soon");
      resetForm();
      onClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.singleDeleteFile,
    onError: (error: Error) => {
      toast.error(error.response.data.message);
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
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.CLOUDINARY_UPLOAD_PRESET || ""
      );
      setFieldValue("blob", [...values.blob, ...acceptedFiles]);

      return axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
    });

    const blobs = acceptedFiles.map((file) => URL.createObjectURL(file));

    axios.all(uploaders).then((data) => {
      const newImages = data.map(({ data }, i) => ({
        url: data.secure_url,
        id: data.public_id,
        blob: blobs[i],
      }));
      setLoading(false);
      setFieldValue("images", [...values.images, ...newImages]);
    });
  };

  const handleRemoveAll = () => {
    values.images.forEach((image) => {
      deleteMutation.mutate({ id: image.id });
    });
    setFieldValue("images", []);
  };

  const handleRemove = (file: Image) => {
    const removeImage = values.images.filter((_file) => {
      if (_file.id === file.id) {
        deleteMutation.mutate({ id: file.id });
      }
      return _file !== file;
    });
    setFieldValue("images", removeImage);
  };

  return (
    <RootStyle {...other}>
      <Typography variant="subtitle1" gutterBottom>
        Write Your Reviews
      </Typography>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Rating */}
            <Stack spacing={0.3}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems="center"
                spacing={1.5}
              >
                <Typography variant="body2">Your Review About</Typography>
                <Rating
                  value={values.rating}
                  onChange={(_, value) => setFieldValue("rating", value)}
                />
              </Stack>
              {errors.rating && touched.rating && (
                <FormHelperText error>{errors.rating}</FormHelperText>
              )}
            </Stack>

            {/* Inputs */}
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              label="Headlines"
              {...getFieldProps("headlines")}
              error={Boolean(touched.headlines && errors.headlines)}
              helperText={touched.headlines && errors.headlines}
            />
            <TextField
              fullWidth
              label="Location"
              {...getFieldProps("location")}
              error={Boolean(touched.location && errors.location)}
              helperText={touched.location && errors.location}
            />

            {/* Quality Rating */}
            <Stack spacing={0.3}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems="center"
                spacing={1.5}
              >
                <Typography variant="body2">
                  How would you rate the quality?
                </Typography>
                <Rating
                  value={values.qualityRating}
                  onChange={(_, value) => setFieldValue("qualityRating", value)}
                />
              </Stack>
              {errors.qualityRating && touched.qualityRating && (
                <FormHelperText error>{errors.qualityRating}</FormHelperText>
              )}
            </Stack>

            {/* Comfort Rating */}
            <Stack spacing={0.3}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems="center"
                spacing={1.5}
              >
                <Typography variant="body2">
                  How would you rate the comfort?
                </Typography>
                <Rating
                  value={values.confortRating}
                  onChange={(_, value) => setFieldValue("confortRating", value)}
                />
              </Stack>
              {errors.confortRating && touched.confortRating && (
                <FormHelperText error>{errors.confortRating}</FormHelperText>
              )}
            </Stack>

            {/* Message */}
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Message"
              {...getFieldProps("message")}
              error={Boolean(touched.message && errors.message)}
              helperText={touched.message && errors.message}
            />

            {/* File Upload */}
            <UploadMultiFile
              showPreview
              maxSize={3145728}
              accept="image/*"
              files={values.images}
              loading={loading}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              blob={values.blob}
              error={Boolean(touched.images && errors.images)}
            />
            {touched.images && errors.images && (
              <FormHelperText error sx={{ px: 2 }}>
                {errors.images as string}
              </FormHelperText>
            )}

            {/* Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps("recommended")}
                  checked={values.recommended}
                />
              }
              label="Would you recommend this product to a friend?"
            />

            {/* Actions */}
            <Stack direction="row" justifyContent="flex-end">
              <Button
                type="button"
                color="inherit"
                size="large"
                variant="outlined"
                onClick={onCancel}
                sx={{ mr: 1.5 }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={reviewMutation.isLoading}
              >
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
