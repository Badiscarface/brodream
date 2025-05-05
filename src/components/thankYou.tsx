"use client";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { useRouter } from "next-nprogress-bar";

export default function Thankyou({ ...props }) {
  const { id, data } = props;
  console.log(id);
  const router = useRouter();
  return (
    <Box py={{ xs: 4, md: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="subtitle1" textAlign="center">
          Order No: {data?.orderNo}
        </Typography>

        <Stack spacing={2} textAlign="center">
          <Typography variant="h4">Request for quotation</Typography>
          <Typography variant="h1" color="primary">
            Thank you.
          </Typography>
          <Box>
            <Typography variant="h4" fontWeight={400}>
              Your quotation has been sent.
            </Typography>
            <Typography variant="h4" fontWeight={400}>
              You will be given a reply within 24 hours.
            </Typography>
          </Box>
          <Box
            sx={{
              pt: 4,
            }}
          >
            <Button
              onClick={() => router.push("/")}
              variant="contained"
              color="primary"
              size="large"
            >
              Return to Reception
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
