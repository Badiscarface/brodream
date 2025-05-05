import React from "react";

import Typography from "@mui/material/Typography";
export default function Label({ ...props }) {
  const { color, children, sx } = props;
  return (
    <Typography
      display={"inline"}
      variant="body2"
      sx={{
        color: "#fff",
        bgcolor: (color || "primary") + ".main",
        borderRadius: "27px",
        py: 0.5,
        px: 1.5,
        fontWeight: 600,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
