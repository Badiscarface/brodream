import React from "react";
import Button from "@mui/material/Button";

export default function LoadingButton({ ...props }) {
  const { children, sx, loading, ...others } = props;
  return (
    <Button loading={loading} {...others} size="large">
      {children}
    </Button>
  );
}
