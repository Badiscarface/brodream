"use client";
import React from "react";

// mui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Toolbar,
  Stack,
  AppBar,
  Container,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";

// components
import Logo from "@/components/logo";

import config from "@/layout/_main/config.json";
import MenuDesktop from "../menuDesktop";
import dynamic from "next/dynamic";
import { HiMenuAlt3 } from "react-icons/hi";
import ThemeModeWidget from "@/components/themeWidget";
import CartWidget from "@/components/cartWidget";
// dynamic import components
const Search = dynamic(() => import("@/components/dialog/search"));

// ----------------------------------------------------------------------
export default function Navbar({ ...props }) {
  const { data } = props;
  const { menu } = config;
  const theme = useTheme();
  const isDeskTop = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
          position: "fixed",
          top: -0.5,
          zIndex: 999,
          backdropFilter: scrolled ? "blur(6px)" : "none",
          borderRadius: 0,
          WebkitBackdropFilter: scrolled ? "blur(6px)" : "none", // Fix on Mobile
          pr: "0px !important",
          bgcolor: scrolled
            ? (theme) => alpha(theme.palette.background.paper, 0.9)
            : "transparent",
          borderBottom: scrolled
            ? (theme) => `1px solid ${theme.palette.divider}!important`
            : "0px solid transparent!important",
          transition: "all 0.3s ease",
        }}
      >
        <Container>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              borderRadius: 0,
              px: 0,
              py: 1.5,
            }}
          >
            <Logo />

            {isDeskTop && <MenuDesktop navConfig={menu} data={data} />}
            <Stack
              gap={2}
              direction="row"
              alignItems={"center"}
              sx={{
                minWidth: 220,
                justifyContent: "end",
              }}
            >
              <ThemeModeWidget isDeskTop={isDeskTop} />
              <CartWidget isDeskTop={isDeskTop} />
              <Search isDeskTop={isDeskTop} />
              <IconButton
                onClick={toggleDrawer(true)}
                color="primary"
                size="small"
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                }}
              >
                <HiMenuAlt3 size={24} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            p: 2,
            py: 3,
          },
        }}
      >
        <MenuDesktop navConfig={menu} />
      </Drawer>
    </>
  );
}
