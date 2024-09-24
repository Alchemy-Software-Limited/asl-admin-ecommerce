// customization.reducer.ts
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { CONFIG } from 'src/config-global';

// Example of CustomizationState interface
export interface CustomizationState {
  isOpen: string[]; // for active default menu
  defaultId: string;
  fontFamily: string;
  borderRadius: number;
  opened: boolean;
  mode: 'light' | 'dark';
}

const initialState: CustomizationState = {
  isOpen: [],
  defaultId: 'default',
  fontFamily: CONFIG.fontFamily,
  borderRadius: CONFIG.borderRadius,
  opened: true,
  mode: 'light',
};

const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    menuOpen: (state, action: PayloadAction<string>) => {
      state.isOpen = [action.payload];
    },
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<number>) => {
      state.borderRadius = action.payload;
    },
    setColorMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
    },
  },
});

// Export actions and reducer
export const { menuOpen, setMenu, setFontFamily, setBorderRadius, setColorMode } =
  customizationSlice.actions;
export default customizationSlice.reducer;
