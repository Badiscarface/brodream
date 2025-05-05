"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  TextField,
  Card,
  CardHeader,
  Typography,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import countries from "@/components/order/countries.json";
import UploadSingleFile from "../upload/UploadSingleFile";
import { FaRegUser } from "react-icons/fa6";
import { IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";

interface FileWithPreview extends File {
  preview: string;
}

interface Cover {
  id: string;
  url: string;
}

interface State {
  loading: boolean | number;
}

export default function CheckoutGuestForm({ ...props }) {
  const { getFieldProps, touched, errors, values, setFieldValue } = props;

  const [state, setState] = useState<State>({ loading: false });
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleDropCover = (acceptedFiles: File[]) => {
    setState({ ...state, loading: true });

    const file: FileWithPreview | undefined =
      acceptedFiles[0] as FileWithPreview;

    if (file) {
      file.preview = URL.createObjectURL(file);
      setPreviewURL(file.preview);
      setFieldValue("file", file);

      setTimeout(() => {
        const cover: Cover = {
          id: file.name,
          url: file.preview,
        };

        setFieldValue("cover", cover);
        setState({ ...state, loading: false });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h4">Demande de devis</Typography>}
      />
      <Stack spacing={{ xs: 2, sm: 3 }} p={3} mt={1}>
        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" htmlFor="name" component="label">
            Votre nom ou celui de votre entreprise
          </Typography>

          <TextField
            fullWidth
            {...getFieldProps("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            type="text"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaRegUser />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" htmlFor="email" component="label">
              E-mail
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMailOutline />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" htmlFor="phone" component="label">
              Téléphone
            </Typography>
            <TextField
              fullWidth
              id="phone"
              type="text"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              {...getFieldProps("phone")}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LuPhone />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Stack>

        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" htmlFor="address" component="label">
            Adresse
          </Typography>
          <TextField
            fullWidth
            {...getFieldProps("address")}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IoLocationOutline />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" htmlFor="city" component="label">
              Ville
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps("city")}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoLocationOutline />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" htmlFor="state" component="label">
              Région
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps("state")}
              error={Boolean(touched.state && errors.state)}
              helperText={touched.state && errors.state}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoLocationOutline />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" htmlFor="zip" component="label">
              Code Postal
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps("zip")}
              error={Boolean(touched.zip && errors.zip)}
              helperText={touched.zip && errors.zip}
              type="string"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoLocationOutline />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Stack>

        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" htmlFor="country" component="label">
            Pays
          </Typography>
          <TextField
            select
            fullWidth
            placeholder="Pays"
            {...getFieldProps("country")}
            SelectProps={{ native: true }}
            error={Boolean(touched.country && errors.country)}
            helperText={touched.country && errors.country}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IoLocationOutline />
                  </InputAdornment>
                ),
              },
            }}
          >
            {countries.map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Stack>

        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" htmlFor="note" component="label">
            Remarques
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            id="note"
            {...getFieldProps("note")}
            error={Boolean(touched.note && errors.note)}
            helperText={touched.note && errors.note}
            type="text"
          />
        </Stack>

        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" htmlFor="file" component="label">
            Votre image ou logo (optionnel)
          </Typography>
          <>
            <UploadSingleFile
              id="file"
              file={values.cover}
              onDrop={handleDropCover}
              error={Boolean(touched.cover && errors.cover)}
              category
              accept="image/*"
              loading={state.loading}
            />

            {touched.cover && errors.cover && (
              <FormHelperText error sx={{ px: 2, mx: 0 }}>
                {touched.cover && errors.cover}
              </FormHelperText>
            )}
          </>
        </Stack>
      </Stack>
    </Card>
  );
}

CheckoutGuestForm.propTypes = {
  getFieldProps: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
