//
'use client';
import PropTypes from 'prop-types';

// mui
import { Box, useTheme, Container } from '@mui/material';

// components
import { MBreadcrumbs } from './@material-extend';
import { createGradient } from '@/theme/palette';

export default function HeaderBreadcrumbs({ ...props }) {
  const { links, icon, sx, admin, ...other } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...sx,
        width: '100%',
        p: 3,
        color: 'common.white',
        position: 'relative',
        overflow: 'hidden',
        background: createGradient(
          theme.palette.primary.main,
          theme.palette.primary.dark
        ),
        '& .MuiBreadcrumbs-separator': {
          color: 'common.white',
        },
      }}>
      <Container>
        <MBreadcrumbs
          icon={icon}
          admin={admin}
          links={links}
          {...other}
        />
      </Container>
    </Box>
  );
}
HeaderBreadcrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.node,
    })
  ).isRequired,
  action: PropTypes.oneOfType([
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.node,
    }),
    PropTypes.node,
  ]),
  icon: PropTypes.node,
  heading: PropTypes.string,
  moreLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  sx: PropTypes.object,
  admin: PropTypes.bool,
  isUser: PropTypes.bool,
};
