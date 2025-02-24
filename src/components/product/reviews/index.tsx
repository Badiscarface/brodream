import { useState } from 'react';
// import PropTypes from 'prop-types';
// mui
import { Collapse, Grid, Card, Box } from '@mui/material';
// components
import ReviewForm from '@/components/forms/reviews';
import ReviewOverview from '@/components/product/reviews/overview';
import ReviewsList from '@/components/lists/reviews';
import NoDataFoundIllustration from '@/illustrations/dataNotFound';

interface Image {
  url: string;
  id: string;
  blob: string;
}
// Define the type for a review
interface Review {
  rating: number | null;
  confortRating: number | null;
  qualityRating: number | null;
  headlines: string;
  name: string;
  email: string;
  recommended: boolean;
  message: string;
  location: string;
  images: Image[];
  blob: File[];
}

interface ProductReviewProps {
  pid: string;
  reviews: Review[];
  totalRating: number;
  totalReviews: number;
  reviewsSummary: Record<string, unknown>; // Adjust if you have a specific structure for this
}

export default function ProductReview({
  reviews,
  totalRating,
  totalReviews,
  reviewsSummary,
  pid,
}: ProductReviewProps) {
  const [count, setCount] = useState(0);
  const [state, setState] = useState<Review[]>([]);
  const [reviewBox, setReviewBox] = useState(false);

  console.log(reviews, reviewsSummary, setState, 'selectedColor');
  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
    setTimeout(() => {
      setCount(count + 1);
    }, 500);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={3}>
        <Grid
          item
          xs={12}
          md={8}>
          <Collapse in={reviewBox}>
            <Card sx={{ mb: 3 }}>
              <ReviewForm
                pid={pid}
                onClose={handleCloseReviewBox}
                onClickCancel={() => setReviewBox(false)}
              />
            </Card>
          </Collapse>
          <Collapse in={!reviewBox}>
            <Card sx={{ mb: 3 }}>
              {[...state, ...reviews]?.length ? (
                <ReviewsList reviews={[...state, ...reviews]} />
              ) : (
                <NoDataFoundIllustration />
              )}
            </Card>
          </Collapse>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}>
          <Card sx={{ position: 'sticky', top: 156, mb: 3 }}>
            <ReviewOverview
              totalRating={totalRating}
              totalReviews={totalReviews}
              reviews={[...state, ...reviews]}
              onOpen={handleOpenReviewBox}
              reviewsSummary={reviewsSummary}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
