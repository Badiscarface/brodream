"use client";

import type React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Rating,
  Chip,
  useTheme,
  styled,
  Paper,
} from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import ReviewCard, { type ReviewData } from "@/components/cards/review";

// Sample data
const reviewsData: ReviewData[] = [
  {
    id: 1,
    rating: 5,
    timeAgo: "il y a 10 mois",
    comment:
      "J'ai eu l'occasion de faire affaire avec cette entreprise de broderie récemment et j'ai été impressionné par la finesse de leur travail.",
    author: "Cedric Cordiez",
  },
  {
    id: 2,
    rating: 5,
    timeAgo: "il y a 9 mois",
    comment:
      "Société à taille humaine, produits de qualité et service impeccable, Brodream a su répondre à nos exigences en nous proposant des vêtements en coton bio ... on recommande !",
    author: "Anne bault",
  },
  {
    id: 3,
    rating: 5,
    timeAgo: "il y a 10 mois",
    comment: "Équipe au top! Super qualité de produit, toujours à l'écoute!",
    author: "Yoaan Guillaume",
  },
];

// Styled components
const HeaderPaper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(5),
}));

const ExcellentChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  padding: theme.spacing(1),
  height: "auto",
  marginBottom: theme.spacing(2),
}));

const GoogleLogo = styled("span")(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& svg": {
    fontSize: "2rem",
    marginRight: theme.spacing(1),
  },
  "& span": {
    fontSize: "2.5rem",
    fontWeight: "bold",
    background: "linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

interface GoogleReviewsProps {
  title?: string;
  reviews?: ReviewData[];
}

const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  reviews = reviewsData,
}) => {
  return (
    <Box
      sx={{
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Header with Google rating */}

        <HeaderPaper>
          <Typography variant="h2" color="text.primary" textAlign={"center"}>
            Avis de nos clients sur{" "}
            <GoogleLogo>
              <span>Google</span>
            </GoogleLogo>
          </Typography>
          <Rating
            value={5}
            readOnly
            size="large"
            sx={{
              mb: 1,
              "& .MuiRating-iconFilled": {
                color: "#FBBC05",
              },
            }}
          />

          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
            4.9/5
          </Typography>
        </HeaderPaper>

        {/* Review cards */}
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid size={{ md: 4, xs: 12 }} key={review.id}>
              <ReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GoogleReviews;
