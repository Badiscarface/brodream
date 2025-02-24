'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// mui
import {
  Stack,
  TextField,
  Card,
  CardHeader,
  Typography,
  FormHelperText,
} from '@mui/material';
// countries
import countries from '@/components/order/countries.json';
import UploadSingleFile from '../upload/UploadSingleFile';
// import dynamic from 'next/dynamic';

// const MapsAutocomplete = dynamic(
//   () => import("src/components/mapsAutocomplete"),
//   {
//     ssr: false,
//   }
// );

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
      // Assign a preview URL for the file
      file.preview = URL.createObjectURL(file);
      setPreviewURL(file.preview);

      // Update the form field for the file
      setFieldValue('file', file);

      // Simulate a loading process
      setTimeout(() => {
        const cover: Cover = {
          id: file.name, // Use the file name as an ID
          url: file.preview, // Use the preview URL
        };

        setFieldValue('cover', cover);
        setState({ ...state, loading: false });
      }, 1000); // Simulated delay for processing
    }
  };

  // Cleanup the preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  // // handle drop cover
  // const handleDropCover = async (acceptedFiles) => {
  //   setstate({ ...state, loading: 2 });
  //   const file = acceptedFiles[0];
  //   if (file) {
  //     Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });
  //   }
  //   setFieldValue('file', file);
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', 'my-uploads');
  //   const config = {
  //     onUploadProgress: (progressEvent) => {
  //       const { loaded, total } = progressEvent;
  //       const percentage = Math.floor((loaded * 100) / total);
  //       setstate({ ...state, loading: percentage });
  //     },
  //   };
  //   await axios
  //     .post(
  //       `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
  //       formData,
  //       config
  //     )
  //     .then(({ data }) => {
  //       setFieldValue('cover', {
  //         id: data.publicid,
  //         url: data.secure_url,
  //       });
  //       setstate({ ...state, loading: false });
  //     })
  //     .then(() => {
  //       // if (values.file) {
  //       //   deleteMutate(values.cover.id);
  //       // }
  //       setstate({ ...state, loading: false });
  //     });
  // };
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>Request for quotation</Typography>}
        // sx={{ mb: 1 }}
      />
      <Stack
        spacing={{ xs: 2, sm: 3 }}
        p={3}
        mt={1}>
        <Stack
          spacing={0.5}
          width={1}>
          <Typography
            variant='overline'
            color='text.primary'
            htmlFor='name'
            component={'label'}>
            Your name is that of your organization.
          </Typography>
          <TextField
            fullWidth
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            type='text'
          />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}>
          <Stack
            spacing={0.5}
            width={1}>
            <Typography
              variant='overline'
              color='text.primary'
              htmlFor='email'
              component={'label'}>
              Email
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          <Stack
            gap={0.5}
            width={1}>
            <Typography
              variant='overline'
              color='text.primary'
              htmlFor='phone'
              component={'label'}>
              Phone
            </Typography>
            <TextField
              fullWidth
              id='phone'
              type='text'
              pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Stack>
          {/* <TextField
                fullWidth
                label="Phone"
                {...getFieldProps("phone")}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                type="number"
              /> */}
        </Stack>
        <Stack
          spacing={0.5}
          width={1}>
          <Typography
            variant='overline'
            color='text.primary'
            htmlFor='address'
            component={'label'}>
            Address
          </Typography>
          {/* <MapsAutocomplete /> */}
          <TextField
            fullWidth
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}>
          <Stack
            spacing={0.5}
            width={1}>
            <Typography
              variant='overline'
              color='text.primary'
              htmlFor='city'
              component={'label'}>
              Town City
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('city')}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />
          </Stack>
          <Stack
            spacing={0.5}
            width={1}>
            <Typography
              variant='overline'
              color='text.primary'
              htmlFor='state'
              component={'label'}>
              State
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('state')}
              error={Boolean(touched.state && errors.state)}
              helperText={touched.state && errors.state}
            />
          </Stack>
          <Stack
            spacing={0.5}
            width={1}>
            <Typography
              variant='overline'
              color='text.primary'
              htmlFor='zip'
              component={'label'}>
              Zip/Postal Code
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('zip')}
              error={Boolean(touched.zip && errors.zip)}
              helperText={touched.zip && errors.zip}
              type='string'
            />
          </Stack>
        </Stack>
        <Stack
          spacing={0.5}
          width={1}>
          <Typography
            variant='overline'
            color='text.primary'
            htmlFor='country'
            component={'label'}>
            Country
          </Typography>
          <TextField
            select
            fullWidth
            placeholder='Country'
            {...getFieldProps('country')}
            SelectProps={{ native: true }}
            error={Boolean(touched.country && errors.country)}
            helperText={touched.country && errors.country}>
            {countries.map((option) => (
              <option
                key={option.code}
                value={option.label}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Stack>
        <Stack
          spacing={0.5}
          width={1}>
          <Typography
            variant='overline'
            color='text.primary'
            htmlFor='note'
            component={'label'}>
            Note
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            id='note'
            {...getFieldProps('note')}
            error={Boolean(touched.note && errors.note)}
            helperText={touched.note && errors.note}
            type='text'
          />
        </Stack>
        <Stack
          spacing={0.5}
          width={1}>
          <Typography
            variant='overline'
            color='text.primary'
            htmlFor='file'
            component={'label'}>
            Your image or logo (optional)
          </Typography>
          <>
            <UploadSingleFile
              id='file'
              file={values.cover}
              onDrop={handleDropCover}
              error={Boolean(touched.cover && errors.cover)}
              category
              accept='image/*'
              loading={state.loading}
            />

            {touched.cover && errors.cover && (
              <FormHelperText
                error
                sx={{ px: 2, mx: 0 }}>
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
