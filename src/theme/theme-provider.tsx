import { createContext, useContext, useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles'; // Import Mode type

import type { Mode } from '@mui/system/cssVars/useCurrentColorScheme';

import { createTheme } from './create-theme';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

type ThemeModeContextType = {
  mode: Mode | undefined;
  setMode: (mode: Mode | null) => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | null>(null);

export function ThemeProvider({ children }: Props) {
  const theme = createTheme();

  return (
    <CssVarsProvider defaultMode='system' theme={theme}>
      <ThemeModeProvider>{children}</ThemeModeProvider>
    </CssVarsProvider>
  );
}

// New ThemeModeProvider to ensure useColorScheme is called inside CssVarsProvider
function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const { mode, setMode } = useColorScheme();

  // Memoize the value passed to the Context.Provider
  const contextValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <CssBaseline />
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  return context;
}
