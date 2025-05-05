import PropTypes from "prop-types";
import { useState } from "react";

// mui
import { alpha, styled } from "@mui/material/styles";
import { Box, Collapse, IconButton, Tooltip } from "@mui/material";
import { FiCheck } from "react-icons/fi";
import { capitalize } from "lodash";

// ----------------------------------------------------------------------

const IconStyle = styled("div")(() => ({
  borderRadius: "8px",
  width: 36,
  height: 36,
  cursor: "pointer",
}));
const getBackgroundStyle = (colorName: string) => {
  if (colorName.includes("-")) {
    const [first, second] = colorName.split("-");
    return `linear-gradient(45deg, ${first} 50%, ${second} 50%)`;
  }
  return colorName;
};
// ----------------------------------------------------------------------

ColorPreviewGroup.propTypes = {
  colors: PropTypes.array.isRequired,
  limit: PropTypes.number,
};
const colorNameToRgba = (colorName: string, alpha = 1): string => {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return `rgba(0,0,0,${alpha})`;

  ctx.fillStyle = colorName;
  const computedColor = ctx.fillStyle; // Will convert name to hex

  if (!/^#([0-9A-F]{6})$/i.test(computedColor)) {
    return `rgba(0,0,0,${alpha})`; // fallback for invalid names
  }

  const hex = computedColor.substring(1);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getFirstColor = (colorName: string) => {
  const [first] = colorName.split("-");
  return first;
};
export default function ColorPreviewGroup({ ...props }) {
  const {
    limit = 6,
    colors,
    selectedColor,
    handleColorClick,
    ...other
  } = props;

  return (
    <Box
      component="div"
      {...other}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* Primary Colors */}
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {colors.map((color: { name: string }, index: number) => (
          <Box
            key={color.name + index}
            sx={{ position: "relative", width: 36, height: 36 }} // same as IconStyle size
            onClick={() => handleColorClick(color.name)}
          >
            <Tooltip title={capitalize(color.name.split("-").join(" & "))}>
              <IconStyle
                sx={{
                  background: getBackgroundStyle(color.name),
                  border: (theme) => "1px solid" + theme.palette.divider,
                  boxShadow:
                    selectedColor === color.name
                      ? `0px 3px 5px ${colorNameToRgba(
                          getFirstColor(color.name),
                          0.5
                        )}`
                      : "none",
                }}
              />
            </Tooltip>
            {selectedColor === color.name && (
              <Box
                component={FiCheck}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color:
                    getFirstColor(color.name) === "white"
                      ? "common.black"
                      : "#fff",
                  fontSize: 24,
                  pointerEvents: "none", // makes icon click-through
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
