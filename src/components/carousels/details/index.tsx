// react
'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';
// next
import BlurImage from '@/components/blurImage';
// import { toast } from 'react-hot-toast';
// mui
import { Box, Stack, useMediaQuery } from '@mui/material';
// api
// import * as api from 'src/services';
// import { useMutation } from 'react-query';
// framer motion
import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter, useSearchParams } from 'next/navigation';
// styles override
import RootStyled from './styled';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// ----------------------------------------------------------------------
ProductDetailsCarousel.propTypes = {
  item: PropTypes.object.isRequired,
  onClickWishList: PropTypes.func.isRequired,
  wishlist: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

function ProductDetailsCarousel({ ...props }) {
  const { item } = props;

  return (
    <div className='slide-wrapper'>
      {item && (
        <BlurImage
          priority
          fill
          objectFit='cover'
          sizes='50%'
          src={item?.url || item?.src}
          alt='hero-carousel'
        />
      )}
      <Box className='bg-overlay' />
    </div>
  );
}

export default function CarouselAnimation({ ...props }) {
  const { product, selectImage, data: others } = props;
  const id = others?.id;
  const images = selectImage?.images || product.images;

  const isMobile = useMediaQuery('(max-width:600px)');
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % images?.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <RootStyled>
      <AnimatePresence
        initial={false}
        custom={direction}>
        <motion.div
          // className='motion-dev'
          style={{
            position: 'absolute',
            width: '100%',
            overflow: 'hidden',
            top: 0,
          }}
          key={page}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}>
          <ProductDetailsCarousel
            item={images[imageIndex]}
            index={images[imageIndex]}
            activeStep={imageIndex}
            isActive={imageIndex}
            key={Math.random()}
            isMobile={isMobile}
            id={id}
          />
        </motion.div>
      </AnimatePresence>
      <Stack
        direction='row'
        justifyContent={images.length < 6 ? 'center' : 'left'}
        spacing={1}
        className='controls-wrapper'>
        {images?.map((item: Image, i: number) => (
          <Box
            key={Math.random()}
            className={`controls-button ${imageIndex === i ? 'active' : ''}`}
            onClick={() => {
              setPage([i, i]);
            }}>
            <BlurImage
              priority
              fill
              objectFit='cover'
              sizes='14vw'
              src={item?.src || item?.url}
              alt='hero-carousel'
            />
          </Box>
        ))}
      </Stack>
    </RootStyled>
  );
}
CarouselAnimation.propTypes = {
  product: PropTypes.object,
  isSimple: PropTypes.bool,
  data: PropTypes.object,
};

interface Image {
  url: string;
  key: string;
  src: string;
}
