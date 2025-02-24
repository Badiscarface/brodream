// react
'use client';
import { useState } from 'react';
import BlurImage from '@/components/blurImage';
// mui
import { Box, Stack } from '@mui/material';
// framer motion
import { motion, AnimatePresence } from 'framer-motion';
// styles
import RootStyled from './styled';

interface Image {
  src: string;
  url: string;
}

interface Product {
  src: string;
  url: string;
}

interface ProductDetailsCarouselProps {
  item: Image;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// Swipe configuration
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

// ProductDetailsCarousel component
const ProductDetailsCarousel: React.FC<ProductDetailsCarouselProps> = ({
  item,
}) => {
  return (
    <div className='slide-wrapper'>
      {item && (
        <BlurImage
          priority
          fill
          objectFit='cover'
          sizes='50%'
          src={item.url}
          alt='hero-carousel'
        />
      )}
      <Box className='bg-overlay' />
    </div>
  );
};

// CarouselAnimation component
const CarouselAnimation = ({ ...props }) => {
  const { product } = props;
  const images = product?.images;

  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const imageIndex = Math.abs(page % images?.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <RootStyled>
      <div className='carousel-wrap'>
        <AnimatePresence
          initial={false}
          custom={direction}>
          <motion.div
            // className='motion-dev' // Ensure your CSS for this class is loaded correctly
            key={page}
            style={{
              position: 'absolute',
              width: '100%',
              overflow: 'hidden',
              top: 0,
            }}
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
            {images && images.length > 0 && (
              <ProductDetailsCarousel item={images[imageIndex]} />
            )}
          </motion.div>
        </AnimatePresence>
        <Stack
          direction='row'
          justifyContent={images.length < 6 ? 'center' : 'left'}
          spacing={1}
          className='controls-wrapper'>
          {images?.map((item: Product, i: number) => (
            <Box
              key={i}
              className={`controls-button ${imageIndex === i ? 'active' : ''}`}
              onClick={() => {
                setPage([i, i]);
              }}>
              <BlurImage
                priority
                fill
                objectFit='cover'
                sizes='14vw'
                src={item.url}
                alt='hero-carousel'
              />
            </Box>
          ))}
        </Stack>
      </div>
    </RootStyled>
  );
};

export default CarouselAnimation;
