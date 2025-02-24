/* Core */
import { createSlice } from '@reduxjs/toolkit';

const initialState: SettingSliceState = {
  currency: 'USD',
  rate: 1,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleChangeCurrency(state, action) {
      state.currency = action.payload.currency;
      state.rate = action.payload.rate;
    },
  },
});

/* Types */
export interface SettingSliceState {
  currency: string;
  rate: number | string;
}
export const { handleChangeCurrency } = settingSlice.actions;
