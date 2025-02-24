import PropTypes from 'prop-types';

// mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const IconStyle = styled('div')(({ theme }) => ({
  // marginLeft: -4,
  borderRadius: '50%',
  width: theme.spacing(3),
  height: theme.spacing(3),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
  cursor: 'pointer',
}));

// ----------------------------------------------------------------------

ColorPreviewDetail.propTypes = {
  colors: PropTypes.array.isRequired,
  limit: PropTypes.number,
};

export default function ColorPreviewDetail({ ...props }) {
  const { colors, handleColorClick, selectedColor, ...other } = props;

  return (
    <Box
      component='div'
      {...other}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
      {/* Primary Colors */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        {colors?.map((color: { name: string }, index: number) => (
          <IconStyle
            key={index}
            onClick={() => handleColorClick(color?.name)}
            sx={{
              bgcolor: color?.name,
              border:
                selectedColor === color?.name
                  ? `solid 2px ${alpha('#000', 0.8)}`
                  : `solid 2px ${alpha('#fff', 1)}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
