import * as React from "react";
// icons
import { IoSearchOutline } from "react-icons/io5";
// mui
import { alpha, Dialog, IconButton, Stack, Typography } from "@mui/material";
// components
import Search from "./search";

export default function SimpleDialogDemo({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          borderColor: "primary",
          borderWidth: 1,
          borderStyle: "solid",
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          bgcolor: (theme) => ({
            md: "primary.main",
            xs: alpha(theme.palette.primary.main, 0.1),
          }),

          borderRadius: "8px",
          svg: {
            color: { md: "#fff", xs: "primary.main" },
          },
        }}
        disableRipple
        size={props.isDeskTop ? "medium" : "small"}
      >
        <IoSearchOutline size={24} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        // sx={{ "& .MuiPaper-root": { width: 800 } }}
        maxWidth={"md"}
      >
        <Search onClose={handleClose} />
      </Dialog>
    </>
  );
}
