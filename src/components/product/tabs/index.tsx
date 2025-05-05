"use client";
import { useState } from "react";
import PropTypes from "prop-types";

// mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Tab,
  Card,
  Divider,
  Typography,
  Stack,
  Grid,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Image from "next/image";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

// import ProductReview from '../reviews';
// components
// import ProductDetailsReview from '../reviews';
const RootStyles = styled("div")(() => ({
  // overflow: 'hidden',
  position: "relative",
  padding: "40px 0",
}));

ProductDetailsTabs.propTypes = {
  product: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  totalRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  reviewsSummary: PropTypes.object.isRequired,
};

export default function ProductDetailsTabs({ ...props }) {
  const { product } = props;
  const [value, setValue] = useState("1");
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <RootStyles>
      <Card sx={{ mb: 3, overflow: "unset" }}>
        <TabContext value={value}>
          <Box
            sx={{
              px: 3,
              bgcolor: "background.neutral",
              ".MuiTabs-flexContainer": {
                button: {
                  maxWidth: "100%",
                },
              },
            }}
          >
            <TabList onChange={handleChangeTab}>
              <Tab disableRipple value="1" label={"Description du produit"} />
              {/* <Tab
                disableRipple
                value='2'
                label={'Reviews'}
                sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
              /> */}
              <Tab
                disableRipple
                value="2"
                label={`Différences entre la broderie et l'impression DTF`}
                sx={{ "& .MuiTab-wrapper": { whiteSpace: "nowrap" } }}
              />
            </TabList>
          </Box>
          <Divider />
          <TabPanel value="1" sx={{ p: 3 }}>
            <Box
              dangerouslySetInnerHTML={{
                __html: `${product?.description}`,
              }}
            />
          </TabPanel>
          {/* <TabPanel value='2'>
            <ProductReview
              reviewsSummary={reviewsSummary}
              totalRating={totalRating}
              totalReviews={totalReviews}
              reviews={reviews}
              pid={product?.id}
            />
          </TabPanel> */}
          <TabPanel value="2">
            <Box sx={{ p: 3 }}>
              {isMobile ? (
                <Typography mb={4} variant="h4" color="text.primary">
                  Différences entre la broderie et l&apos;impression DTF
                </Typography>
              ) : (
                <Divider
                  sx={{
                    mb: 4,
                  }}
                >
                  <Typography variant="h4" color="text.primary">
                    Différences entre la broderie et l&apos;impression DTF
                  </Typography>
                </Divider>
              )}
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Stack gap={2}>
                        <Box
                          sx={{
                            position: "relative",
                            height: { xs: 200, md: 250 },
                            width: { xs: 200, md: 250 },
                            img: {
                              objectFit: "contain",
                            },
                          }}
                        >
                          <Image
                            src="/images/broderie.png"
                            alt="BroderieImg"
                            fill
                            priority
                          />
                        </Box>
                        <Typography variant="h4">La broderie</Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          fontWeight={500}
                        >
                          Création d&apos;un motif en relief avec des fils
                          brodés directement sur le tissu.
                        </Typography>
                        <Timeline
                          sx={{
                            "li::before": {
                              display: "none",
                            },
                          }}
                          color="primary"
                        >
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="subtitle1"
                                sx={{ textTransform: "uppercase" }}
                              >
                                Nombre de couleurs
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ fontWeight: 500 }}
                              >
                                De 1 à 16
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>

                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="subtitle1"
                                sx={{ textTransform: "uppercase" }}
                              >
                                Durabilité
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ fontWeight: 500 }}
                              >
                                Résiste très bien aux lavages et à l&apos;usure
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>

                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="subtitle1"
                                sx={{ textTransform: "uppercase" }}
                              >
                                Finition
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ fontWeight: 500 }}
                              >
                                Effet premium pour un rendu professionnel
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>
                        </Timeline>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Stack gap={2}>
                        <Box
                          sx={{
                            position: "relative",
                            height: { xs: 200, md: 250 },
                            width: { xs: 200, md: 250 },
                            img: {
                              objectFit: "contain",
                            },
                          }}
                        >
                          <Image
                            src="/images/dtf.png"
                            alt="DtfImg Img"
                            fill
                            priority
                          />
                        </Box>
                        <Typography variant="h4">Impression DTF</Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          fontWeight={500}
                        >
                          Impression avec des encres spéciales pour des motifs
                          colorés et détaillés.
                        </Typography>
                        <Timeline
                          sx={{
                            "li::before": {
                              display: "none",
                            },
                          }}
                          color="primary"
                        >
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  textTransform: "uppercase",
                                }}
                                color="initial"
                              >
                                Nombre de couleurs
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{
                                  fontWeight: 500,
                                }}
                              >
                                Illimitées, dégradé possible
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>

                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  textTransform: "uppercase",
                                }}
                                color="initial"
                              >
                                Durabilité
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{
                                  fontWeight: 500,
                                }}
                              >
                                Résistant au lavage
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>

                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  textTransform: "uppercase",
                                }}
                                color="initial"
                              >
                                Finition
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{
                                  fontWeight: 500,
                                }}
                              >
                                Le motif présente une texture lisse.
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>
                        </Timeline>
                        {/* <Stack spacing={1.5} ml={2}>
                          <Typography variant="body1">
                            <b>Nombre de couleurs :</b> Illimitées, dégradé
                            possible
                          </Typography>
                          <Typography variant="body1">
                            <b>Durabilité :</b> Résistant au lavage
                          </Typography>
                          <Typography variant="body1">
                            <b>Finition :</b> Le motif présente une texture
                            lisse.
                          </Typography>
                        </Stack> */}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </TabContext>
      </Card>
    </RootStyles>
  );
}
