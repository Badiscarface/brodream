import React from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "@/redux/slices/settings";
import { themeMode } from "@/redux/slices/settings/selectors";
import { PaletteMode } from "@mui/material";
// icons
import { IoSunny } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
// mui
import { IconButton, alpha } from "@mui/material";
export default function SettingMode({ ...props }) {
  const mode: PaletteMode = useSelector(themeMode);

  const dispatch = useDispatch();
  return (
    <IconButton
      name="setting-mode"
      onClick={() =>
        dispatch(setThemeMode(mode === "light" ? "dark" : "light"))
      }
      color="primary"
      sx={{
        borderColor: "primary",
        borderWidth: 1,
        borderRadius: "8px",
        borderStyle: "solid",
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
      }}
      size={props.isDeskTop ? "medium" : "small"}
    >
      {mode === "dark" ? <IoSunny size={24} /> : <IoMoonOutline size={24} />}
    </IconButton>
  );
}
