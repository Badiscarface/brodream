import React, { forwardRef, ReactNode } from "react";
// mui
import { Avatar, useTheme, AvatarProps } from "@mui/material";

interface MAvatarProps extends AvatarProps {
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success";
  sx?: object;
  children?: ReactNode;
}

const MAvatar = forwardRef<HTMLDivElement, MAvatarProps>(function MAvatar(
  { color = "default", sx, children, ...other },
  ref
) {
  const theme = useTheme();

  if (color === "default") {
    return (
      <Avatar ref={ref} sx={sx} {...other}>
        {children}
      </Avatar>
    );
  }

  return (
    <Avatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    >
      {children}
    </Avatar>
  );
});

MAvatar.displayName = "MAvatar";

export default MAvatar;
