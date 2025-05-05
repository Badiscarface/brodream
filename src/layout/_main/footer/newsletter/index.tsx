"use client";
import React from "react";
import { toast } from "react-hot-toast";

// MUI
import { FormControl, TextField, Stack } from "@mui/material";
import LoadingButton from "@/components/LoadingButton";

// Formik
import { Form, FormikProvider, useFormik } from "formik";

// TanStack Query
import { useMutation } from "@tanstack/react-query";

// API
import * as api from "@/services";

interface NewsletterResponse {
  message: string;
}

interface NewsletterError {
  response: {
    data: {
      message: string;
    };
  };
}

export default function NewsLetter() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const isValidEmail = values.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

      if (!isValidEmail) {
        toast.error("Invalid email!");
        return;
      }

      mutate(values);
    },
  });

  const { mutate, isLoading } = useMutation<
    NewsletterResponse,
    NewsletterError,
    { email: string }
  >({
    mutationFn: api.sendNewsletter,
    onSuccess: (data) => {
      toast.success(data.message);
      formik.resetForm();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const { handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <FormControl fullWidth variant="outlined">
            <TextField
              placeholder="Entrez votre email"
              {...getFieldProps("email")}
              sx={{
                "& .MuiInputBase-root": {
                  bgcolor: (theme) => theme.palette.background.paper,
                },
              }}
            />
          </FormControl>
          <LoadingButton
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            loading={isLoading}
            sx={{ marginTop: 8, paddingX: 4, minHeight: 56 }}
          >
            S&apos;abonner
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
