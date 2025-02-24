import React from "react";
import Button from "@mui/material/Button";
// import { keyframes } from "@mui/system";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

// const spin = keyframes`
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `;

export default function LoadingButton({ ...props }) {
  const { children, sx, loading, ...others } = props;
  return (
    <Button
      disabled={loading}
      startIcon={loading ? <AiOutlineLoading3Quarters /> : null}
      sx={{
        ...sx,
        svg: {
          // animation: loading ? `${spin} 1s linear infinite` : "none",
          transition: "transform 0.3s ease", // Smooth transition for transform changes
        },
      }}
      {...others}
      size="large"
    >
      {children}
    </Button>
  );
}
