import PropTypes from "prop-types";

// mui
import { alpha, styled } from "@mui/material/styles";
import { Paper, Box, Stack, Typography } from "@mui/material";

// component
import UploadIllustration from "@/illustrations/upload";

// react dropzone
import { useDropzone } from "react-dropzone";

// utils
import { fData } from "@/utils/formatNumber";

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  display: "flex",
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.default,
  border: `1px solid rgba(0, 0, 0, 0.23)`,
  "&:hover": {
    opacity: 0.72,
    cursor: "pointer",
  },
  [theme.breakpoints.up("md")]: { textAlign: "left", flexDirection: "row" },
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
  state: PropTypes.object,
  onDrop: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
};

export default function UploadSingleFile({ ...props }) {
  const { error, file, sx, onDrop, loading: isLoading, ...other } = props;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    onDrop,
    ...other,
  });

  const loading = Boolean(isLoading) ? isLoading : false;

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(other.category && { padding: "8px 0" }),
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: loading ? `${loading}%` : 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
              zIndex: 9999,
            }}
          >
            <Typography variant="h6" color="text.primary">
              {loading}%
            </Typography>
          </Box>
        )}
        <input {...getInputProps()} />
        {!other.category && <UploadIllustration sx={{ width: 220 }} />}

        <Stack gap={1} textAlign={"center"} sx={{ pb: 2 }}>
          <UploadIllustration sx={{ width: 160, mx: "auto" }} />
          <Typography variant={other.category ? "subtitle1" : "h5"}>
            Déposez ou sélectionnez une image
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Glissez-déposez une image ici ou cliquez&nbsp;
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "primary.main", textDecoration: "underline" }}
            >
              Parcourir
            </Typography>
            &nbsp;depuis votre appareil
          </Typography>
        </Stack>

        {file && (
          <Box
            component="img"
            alt="aperçu du fichier"
            src={!file.preview ? file.url : file.preview}
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: "contain",
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
              backgroundColor: "background.paper",
            }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
