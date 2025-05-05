"use client";

import { isString } from "lodash";
import React, { ReactNode } from "react";

// mui
import { Box, Link, Stack, Typography, alpha, useTheme } from "@mui/material";

// components
import { MBreadcrumbs } from "./@material-extend";
import { createGradient } from "@/theme/palette";

interface LinkItem {
  href?: string;
  name: string;
  icon?: ReactNode;
}

interface ActionProps {
  href?: string;
  title: string;
  icon?: ReactNode;
}

interface HeaderBreadcrumbsProps {
  links: LinkItem[];
  action?: ActionProps | ReactNode;
  icon?: ReactNode;
  heading?: string;
  moreLink?: string | string[];
  sx?: object;
  admin?: boolean;
  isUser?: boolean;
  [key: string]: any; // To spread remaining props like {...other}
}

const HeaderBreadcrumbs: React.FC<HeaderBreadcrumbsProps> = ({
  links,
  action,
  icon,
  heading,
  moreLink = "",
  sx,
  admin,
  ...other
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...sx,
        width: "100%",
        ...(admin && { mb: 3 }),
        ...(!admin && {
          p: 3,
          mt: 3,
          color: "text.primary",
          position: "relative",
          overflow: "hidden",
          background: createGradient(
            alpha(theme.palette.primary.main, 0.2),
            alpha(theme.palette.secondary.dark, 0.2)
          ),
          borderRadius: "8px",
          boxShadow: (theme) => theme.shadows[3],

          "&:before": {
            content: "''",
            position: "absolute",
            top: "-23%",
            left: "20%",
            transform: "translateX(-50%)",
            bgcolor: alpha(theme.palette.primary.light, 0.2),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: "50px",
            zIndex: 0,
          },
          "&:after": {
            content: "''",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-3%",
            bgcolor: alpha(theme.palette.primary.light, 0.2),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: "50px",
            zIndex: 0,
          },
          "& .MuiBreadcrumbs-separator": {
            color: "text.primary",
          },
        }),
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          ...(!admin && {
            "&:before": {
              content: "''",
              position: "absolute",
              bottom: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: alpha(theme.palette.primary.light, 0.2),
              height: { xs: 60, md: 80 },
              width: { xs: 60, md: 80 },
              borderRadius: "50px",
              zIndex: 0,
            },
          }),
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ textTransform: "capitalize", width: "80vw" }}
            noWrap
          >
            {heading}
          </Typography>

          <MBreadcrumbs icon={icon} admin={admin} links={links} {...other} />
        </Box>
      </Stack>

      <Box>
        {isString(moreLink) ? (
          <Link
            href={moreLink}
            target="_blank"
            variant="body2"
            sx={{ color: "text.primary" }}
          >
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              sx={{ display: "table", color: "text.primary" }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
};

export default HeaderBreadcrumbs;
