"use client";
import React from "react";

// mui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Toolbar,
  Fab,
  Stack,
  AppBar,
  Container,
  IconButton,
  Drawer,
  Box,
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
import { usePathname } from "next/navigation";

import { FaWhatsapp } from "react-icons/fa";
import { keyframes } from "@mui/system";

const blinkRing = keyframes`
  0% {
    opacity: 1;
    transform: scale(0.7);
  }
  85% {
    opacity: 0.3;
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    transform: scale(0.7);
  }
`;
// dynamic import components
const Search = dynamic(() => import("@/components/dialog/search"));

// ----------------------------------------------------------------------
export default function Navbar({ ...props }) {
  const { data } = props;
  const { menu } = config;
  const theme = useTheme();
  const pathname = usePathname();
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
  const isHome = pathname === "/";

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
          position: "sticky",
          top: -0.5,
          zIndex: 999,
          backdropFilter: !isHome || scrolled ? "blur(6px)" : "none",
          borderRadius: 0,
          WebkitBackdropFilter: !isHome || scrolled ? "blur(6px)" : "none", // Fix on Mobile
          pr: "0px !important",
          bgcolor:
            !isHome || scrolled
              ? (theme) => alpha(theme.palette.background.paper, 0.9)
              : "transparent",
          borderBottom:
            !isHome || scrolled
              ? (theme) => `1px solid ${theme.palette.divider}!important`
              : "0px solid transparent!important",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
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
                color="inherit"
                size="small"
                sx={{
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "8px",
                  bgcolor: "primary.main",
                  svg: {
                    color: "#fff",
                  },
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
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
      <Fab
        color="success"
        aria-label="whatsapp"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1111,
        }}
        size="large"
        href="https://api.whatsapp.com/send/?phone=%2B33635118007&text&type=phone_number&app_absent=0"
        target="_blank"
      >
        <FaWhatsapp fontSize={28} />
      </Fab>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1110, // slightly behind the button
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "rgba(76, 175, 80, 0.5)", // green glow
          animation: `${blinkRing} 1.5s infinite ease-in-out`,
        }}
      />
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
