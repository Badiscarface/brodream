import type React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Avatar,
  styled,
} from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa";

// Define the ReviewData interface
export interface ReviewData {
  id: number;
  rating: number;
  timeAgo: string;
  comment: string;
  author: string;
}

// Create styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[10],
  },
  position: "relative",
  overflow: "visible",
  borderRadius: 16,
}));

const QuoteIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: -15,
  left: 20,
  backgroundColor: theme.palette.primary.main,
  borderRadius: "50%",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  zIndex: 1,
}));

const ReviewCard: React.FC<{ review: ReviewData }> = ({ review }) => {
  return (
    <StyledCard elevation={3}>
      <QuoteIcon>
        <FaQuoteLeft />
      </QuoteIcon>
      <CardContent
        sx={{
          pt: 4,
          pb: 2,
          px: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Rating value={review.rating} readOnly precision={0.5} />
          <Typography variant="body2" color="text.secondary">
            {review.timeAgo}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
            mb: 3,
            flexGrow: 1,
            color: "text.secondary",
            lineHeight: 1.6,
          }}
        >
          {review.comment}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            {review.author.charAt(0)}
          </Avatar>
          <Typography variant="subtitle1" fontWeight="bold">
            {review.author}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ReviewCard;
