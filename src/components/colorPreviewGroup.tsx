import PropTypes from 'prop-types';
import { useState } from 'react';

// mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Collapse, IconButton } from '@mui/material';

// ----------------------------------------------------------------------

const IconStyle = styled('div')(({ theme }) => ({
  // marginLeft: -4,
  borderRadius: '50%',
  width: theme.spacing(2.2),
  height: theme.spacing(2.2),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
  cursor: 'pointer',
}));

// ----------------------------------------------------------------------

ColorPreviewGroup.propTypes = {
  colors: PropTypes.array.isRequired,
  limit: PropTypes.number,
};

// const colors = [
//   'red',
//   'blue',
//   'white',
//   'yellow',
//   'green',
//   'orange',
//   'purple',
//   'pink',
//   'brown',
//   'cyan',
// ];

export default function ColorPreviewGroup({ ...props }) {
  const {
    limit = 6,
    colors,
    selectedColor,
    handleColorClick,
    ...other
  } = props;

  const [showAll, setShowAll] = useState(false);

  const primaryColors = colors.slice(0, limit);
  const remainingColors = colors.slice(limit);

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
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {primaryColors.map((color: { name: string }, index: number) => (
          <IconStyle
            key={color.name + index}
            onClick={() => handleColorClick(color.name)}
            sx={{
              bgcolor: color.name,
              border:
                selectedColor === color.name
                  ? `solid 2px ${alpha('#000', 0.8)}`
                  : `solid 2px ${alpha('#fff', 1)}`,
            }}
          />
        ))}
        {!showAll && remainingColors.length > 0 && (
          <IconButton
            size='small'
            onClick={() => setShowAll((prev) => !prev)}
            sx={{
              minHeight: 18,
              height: 18,
              width: 18,
              fontSize: 16,
              color: 'text.primary',
            }}>
            {remainingColors.length}
          </IconButton>
        )}
      </Box>

      {/* Collapsible Remaining Colors */}
      <Collapse in={showAll}>
        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
          {remainingColors.map((color: { name: string }, index: number) => (
            <IconStyle
              key={color.name + index + limit}
              onClick={() => handleColorClick(color.name)}
              sx={{
                bgcolor: color.name,
                border:
                  selectedColor === color.name
                    ? `solid 2px ${alpha('#000', 0.8)}`
                    : `solid 2px ${alpha('#fff', 1)}`,
              }}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
