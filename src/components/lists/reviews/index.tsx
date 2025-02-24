import Image from '@/components/blurImage';
import PropTypes from 'prop-types';
// icons
import { MdVerified } from 'react-icons/md';
// mui
import {
  Box,
  List,
  ListItem,
  Typography,
  Divider,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import Rating from '@mui/material/Rating';
// utils
import { fDate } from '@/utils/formatTime';
// components

ReviewItem.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.shape({
      cover: PropTypes.shape({
        url: PropTypes.string,
      }),
      // firstName: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    isPurchased: PropTypes.bool,
    createdAt: PropTypes.string,
    review: PropTypes.string,
    rating: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
  }),
  reviewsCount: PropTypes.number,
  index: PropTypes.number,
  isLoading: PropTypes.bool,
};

interface ImageProp {
  url: string;
}

ProductDetailsReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

function ReviewItem({ ...props }) {
  const { review, isLoading, reviewsCount, index } = props;

  console.log(review, 'reviews');
  return (
    <Box pt={2}>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          px: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}>
        <Box
          sx={{
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 0 },
            textAlign: { sm: 'center' },
            flexDirection: { sm: 'column' },
          }}>
          {review.user?.cover?.url ? (
            <Box
              sx={{
                mr: { xs: 2, sm: 0 },
                mb: { sm: 2 },
                width: 64,
                height: 64,
                position: 'relative',
                borderRadius: 50,
                overflow: 'hidden',
              }}>
              <Image
                src={review.user?.cover?.url}
                alt={review.name + ' review'}
                priority
                layout='fill'
                objectFit='cover'
              />
            </Box>
          ) : (
            <Avatar sx={{ height: 64, width: 64 }}>
              {review.name?.slice(0, 1)}
            </Avatar>
          )}
        </Box>

        <Box width={1}>
          <Box sx={{ float: 'right' }}>
            {review?.isPurchased && (
              <Typography
                variant='caption'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'primary.main',
                }}>
                <MdVerified size={16} />
                &nbsp;Verified Purchase
              </Typography>
            )}
            <Stack spacing={2}>
              <Typography
                variant='caption'
                sx={{ color: 'text.secondary', float: 'right' }}
                noWrap>
                {fDate(review.createdAt)}
              </Typography>
              <Typography
                component={'div'}
                variant='caption'
                sx={{ color: 'text.secondary', float: 'right' }}
                noWrap>
                {review.location}
              </Typography>
            </Stack>
          </Box>
          <Rating
            size='small'
            value={review.rating}
            precision={0.1}
            readOnly
          />
          <Typography
            variant='subtitle1'
            noWrap
            mb={0.5}
            sx={{ textTransform: 'capitalize' }}>
            {review.name}{' '}
            <Typography
              variant='subtitle2'
              component={'span'}
              noWrap
              mb={0.5}
              sx={{ textTransform: 'capitalize' }}>
              ({review.headlines})
            </Typography>
          </Typography>
          <Typography
            variant='subtitle2'
            mb={1}
            fontWeight={400}>
            {review.message}
          </Typography>
        </Box>
      </ListItem>
      {!isLoading && Boolean(review.images.length) ? (
        <>
          <Box p={3}>
            <Grid
              container
              spacing={2}
              sx={{ img: { borderRadius: '8px' } }}>
              {review.images.map((image: ImageProp) => (
                <Grid
                  item
                  xs={6}
                  md={3}
                  lg={2}
                  key={Math.random()}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 100,
                    }}>
                    {' '}
                    <Image
                      src={image.url}
                      alt={review.name + "'s review"}
                      layout='fill'
                      objectFit='cover'
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : null}
      {reviewsCount - 1 === index ? null : <Divider />}
    </Box>
  );
}

export default function ProductDetailsReviewList({ ...props }) {
  const { reviews, isLoading } = props;
  return (
    <Box>
      <List disablePadding>
        {reviews?.map((review: string, index: number) => (
          <ReviewItem
            key={Math.random()}
            review={review}
            reviewsCount={reviews?.length}
            index={index}
            isLoading={isLoading}
          />
        ))}
      </List>
    </Box>
  );
}
