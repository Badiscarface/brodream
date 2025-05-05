"use client";

import React from "react";
import toast from "react-hot-toast";

// material ui
import { Box, Stack, Grid, TextField, Typography } from "@mui/material";
import LoadingButton from "@/components/LoadingButton";
// yup
import * as Yup from "yup";
// formik
import { useFormik, Form, FormikProvider } from "formik";
const ContactUs = () => {
  const [loading, setLoading] = React.useState(false);
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is required")
      .required("Email is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.number().required("Phone number is required"),
    message: Yup.string().required("Message is required"),
    subject: Yup.string().required("Subject is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      message: "",
      subject: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        setTimeout(() => {
          resetForm();
          setLoading(false);
          toast.success("Message sent!");
        }, 1000);
        // mutate({
        //   ...values
        // });
      } catch (error) {
        toast.error(error as string);
      }
    },
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  // const { mutate } = useMutation(api.contactUs, {
  //   onSuccess: async () => {
  //     resetForm();
  //     setLoading(false);
  //     toast.success('Message sent!');
  //   },
  //   onError: (err) => {
  //     setLoading(false);
  //     toast.error(err.response.data.message);
  //   }
  // });

  return (
    <div>
      {/* from section  */}
      <Stack className="form-section">
        <Box className="form-feed">
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ md: 6, xs: 12 }}>
                  <Stack gap={0.6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="span"
                    >
                      First Name
                    </Typography>
                    <TextField
                      placeholder="Enter First Name"
                      className="text-feed"
                      fullWidth
                      {...getFieldProps("firstName")}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Stack>
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                  <Stack gap={0.6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="span"
                    >
                      Last Name
                    </Typography>
                    <TextField
                      placeholder="Enter Last Name"
                      className="text-feed"
                      fullWidth
                      {...getFieldProps("lastName")}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Stack>
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                  <Stack gap={0.6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="span"
                    >
                      Your Email
                    </Typography>
                    <TextField
                      placeholder="Enter Email"
                      className="text-feed"
                      fullWidth
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                  <Stack gap={0.6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="span"
                    >
                      Your Phone
                    </Typography>
                    <TextField
                      placeholder="Enter Phone Number"
                      className="text-feed"
                      fullWidth
                      {...getFieldProps("phone")}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Stack>
                </Grid>

                <Grid size={12}>
                  <Stack gap={0.6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="span"
                    >
                      Subject
                    </Typography>
                    <TextField
                      placeholder="Enter Subject"
                      className="text-feed"
                      fullWidth
                      {...getFieldProps("subject")}
                      error={Boolean(touched.subject && errors.subject)}
                      helperText={touched.subject && errors.subject}
                    />
                  </Stack>
                </Grid>

                <Grid size={12}>
                  <Stack gap={0.6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="span"
                    >
                      Your Message
                    </Typography>
                    <TextField
                      placeholder="Enter Your Message"
                      className="text-feed"
                      multiline
                      rows={5}
                      fullWidth
                      {...getFieldProps("message")}
                      error={Boolean(touched?.message && errors?.message)}
                      helperText={touched?.message && errors?.message}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                className="send-btn"
                loading={loading}
                sx={{
                  mt: 3,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Send Message
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Box>
      </Stack>
    </div>
  );
};

export default ContactUs;
