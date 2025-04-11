import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next-nprogress-bar";

// material
import typography from "@/theme/typography";
import { Popover, Stack, Typography } from "@mui/material";

// icons
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

// components
import MenuDesktopPopover from "@/components/popover/menuDesktop";
import { usePathname } from "next/navigation";
import Link from "next/link";

// // api
// import { useQuery } from 'react-query';
// import * as api from 'src/services';

// ----------------------------------------------------------------------
interface NavConfigProps {
  item: [];
}

MenuDesktopItem.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  isOffset: PropTypes.bool.isRequired,
  scrollPosition: PropTypes.any,
};

function MenuDesktopItem({ ...props }) {
  const {
    item,
    pathname,
    isHome,
    isOpen,
    isOffset,
    onOpen,
    scrollPosition,
    onClose,
    isLoading,
    data,
  } = props;
  const { title, path, isDropdown, isDropdownSm } = item;
  const anchorRef = React.useRef(null);
  const isActive = pathname === path;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  if (isDropdown) {
    return (
      <>
        <Typography
          ref={anchorRef}
          className={` ${isOffset && isHome && "offset"}`}
          id="composition-button"
          aria-controls={isOpen ? "composition-menu" : undefined}
          aria-expanded={isOpen ? "true" : undefined}
          aria-haspopup="true"
          onClick={onOpen}
          sx={{
            ...typography.subtitle2,
            color: "text.primary",
            textTransform: "capitalize",
            textDecoration: "none",
            fontWeight: 600,
            transition: ".2s ease-in",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: "primary.main",
              textDecoration: "none",
            },
            "&.offset": {
              color: "primary.main",
            },
            "&.active": {
              color: "primary.main",
            },
            "& .link-icon": {
              ml: 0.5,
              fontSize: 16,
            },
          }}
        >
          {title}
          {isOpen ? (
            <MdOutlineKeyboardArrowUp className="link-icon" />
          ) : (
            <MdOutlineKeyboardArrowDown className="link-icon" />
          )}
        </Typography>
        <MenuDesktopPopover
          isOpen={isOpen}
          scrollPosition={scrollPosition}
          onClose={onClose}
          isLoading={isLoading}
          data={data}
        />
      </>
    );
  } else if (isDropdownSm) {
    return (
      <>
        <Typography
          ref={anchorRef}
          className={` ${isOffset && isHome && "offset"}`}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            ...typography.subtitle2,
            color: "text.primary",
            textTransform: "capitalize",
            textDecoration: "none",
            fontWeight: 600,
            transition: ".2s ease-in",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: "primary.main",
              textDecoration: "none",
            },
            "&.offset": {
              color: "primary.main",
            },
            "&.active": {
              color: "primary.main",
            },
            "& .link-icon": {
              ml: 0.5,
              fontSize: 16,
            },
          }}
        >
          {title}
          {open ? (
            <MdOutlineKeyboardArrowUp className="link-icon" />
          ) : (
            <MdOutlineKeyboardArrowDown className="link-icon" />
          )}
        </Typography>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Stack
            spacing={1}
            sx={{
              maxWidth: 250,
              p: 2,
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              component={Link}
              href="/broderie"
            >
              Broderie
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              component={Link}
              href="/number-printing"
            >
              Impression numérique
            </Typography>
          </Stack>
        </Popover>
      </>
    );
  }
  return (
    <Typography
      component={NextLink}
      key={title}
      href={path}
      // name={title}
      className={` ${isActive && "active"}`}
      sx={{
        ...typography.subtitle2,
        color: "text.primary",
        textTransform: "capitalize",
        textDecoration: "none",
        fontWeight: 600,
        transition: ".2s ease-in",
        cursor: "pointer",
        "&:hover": {
          color: "primary.main",
          textDecoration: "none",
        },
        "&.offset": {
          color: "primary.main",
        },
        "&.active": {
          color: "primary.main",
        },
        "& .link-icon": {
          ml: 0.5,
          fontSize: 16,
        },
      }}
    >
      {title}
    </Typography>
  );
}

export default function MenuDesktop({ ...props }) {
  const { isOffset, navConfig, isLeft, data } = props;

  // const { data, isLoading } = useQuery(['get-categories-all'], () =>
  //   api.getAllCategories()
  // );

  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [scrollPosition, setPosition] = useState(0);
  React.useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          width: 1,
          ...(isLeft && {
            ml: 0,
          }),
        }}
      >
        {navConfig.map((links: NavConfigProps) => (
          <MenuDesktopItem
            scrollPosition={scrollPosition}
            key={Math.random()}
            item={links}
            data={data?.data}
            isLoading={false}
            pathname={pathname}
            isOpen={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOffset={isOffset}
            router={router}
          />
        ))}
      </Stack>
      <Stack
        spacing={3}
        sx={{
          display: { xs: "felx", md: "none" },
          width: 1,
          ...(isLeft && {
            ml: 0,
          }),
        }}
      >
        {navConfig.map((links: NavConfigProps) => (
          <MenuDesktopItem
            scrollPosition={scrollPosition}
            key={Math.random()}
            item={links}
            data={data?.data}
            isLoading={false}
            pathname={pathname}
            isOpen={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOffset={isOffset}
            router={router}
          />
        ))}
      </Stack>
    </>
  );
}

MenuDesktop.propTypes = {
  isLeft: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  isOffset: PropTypes.bool.isRequired,
  navConfig: PropTypes.array.isRequired,
};
