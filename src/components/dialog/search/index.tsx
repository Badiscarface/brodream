import * as React from "react";
// icons
import { IoSearchOutline } from "react-icons/io5";
// mui
import { Dialog, IconButton, Stack, Typography } from "@mui/material";
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
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          bgcolor: "primary.main",
          borderRadius: "8px",
          svg: {
            color: "#fff",
          },
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
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
