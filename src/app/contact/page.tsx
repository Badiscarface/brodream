import React from "react";
import {
  Container,
  Box,
  Grid,
  Stack,
  Card,
  Typography,
  IconButton,
} from "@mui/material";
import HeaderBreadcrumbs from "@/components/headerBreadcrumbs";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { MdOutlineCall } from "react-icons/md";
import Link from "next/link";
import ContactForm from "@/components/forms/contact";
const ADDRESS = [
  {
    name: "Ohio St. South Gate, CA 90280",
    icon: <MdOutlineLocationOn />,
  },
  {
    name: "johndoe@yahoo.com",
    linkPath: "/",
    icon: <FiMail />,
  },
  {
    name: "+1 386-688-3295",
    linkPath: "/",
    icon: <MdOutlineCall />,
  },
];
export default function page() {
  return (
    <div>
      <Container maxWidth="xl">
        <Stack gap={3}>
          <HeaderBreadcrumbs
            heading="Contact Us"
            links={[
              {
                name: "Maison",
                href: "/",
              },
              {
                name: "Contact Us",
              },
            ]}
          />

          <Card>
            <Grid container spacing={2}>
              <Grid size={{ md: 4, xs: 12 }}>
                <Stack
                  gap={1}
                  sx={{
                    p: 3,
                    height: "100%",
                    bgcolor: "primary.main",
                  }}
                >
                  <Typography variant="h4" color="common.white">
                    Contact Information
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="common.white"
                    fontWeight={500}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum{" "}
                  </Typography>
                  <Stack gap={2} mt={5}>
                    {ADDRESS.map((item, idx) => (
                      <Stack
                        gap={1}
                        direction={"row"}
                        key={idx}
                        alignItems={"center"}
                      >
                        <IconButton
                          sx={{
                            bgcolor: "common.white",
                            svg: {
                              color: "primary.main",
                            },
                          }}
                        >
                          {item.icon}
                        </IconButton>
                        <Typography
                          variant="body1"
                          color="common.white"
                          component={Link}
                          href={`${item.linkPath}`}
                          sx={{
                            "&:hover": {
                              color: "text.secondary",
                            },
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ md: 8, xs: 12 }}>
                <Stack p={3} gap={3}>
                  <Typography variant="h3" color="initial">
                    Get in touch
                  </Typography>
                  <ContactForm />
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Container>
      <Box
        position="relative"
        textAlign="right"
        width="100%"
        height={0}
        pb="40.6667%"
        mt={6}
        mb={-7}
      >
        <Box
          overflow="hidden"
          bgcolor="transparent"
          width="100%"
          height="100%"
          position="absolute"
          top={0}
          left={0}
        >
          <Box
            component="iframe"
            title="Google Map"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=brodream&t=p&z=13&ie=UTF8&iwloc=B&output=embed"
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>
      </Box>
    </div>
  );
}
