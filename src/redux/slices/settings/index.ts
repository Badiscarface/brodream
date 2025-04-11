/* Core */
import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SettingSliceState = {
  themeMode: "light",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
  },
});

/* Types */
export interface SettingSliceState {
  themeMode: PaletteMode;
}
export const { setThemeMode } = settingSlice.actions;
