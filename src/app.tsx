/* eslint-disable import/no-extraneous-dependencies */
import 'src/global.css';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/system';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { useThemeMode, ThemeProvider } from 'src/theme/theme-provider';

import CoreSpeedDial from './components/core/CoreSpeedDial'; // ThemeProvider imported here

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();



  return (
    <ThemeProvider >
      <AppContent /> {/* AppContent is rendered inside ThemeProvider */}
    </ThemeProvider>
  );
}

// Move the content inside this component
function AppContent() {
  const { mode, setMode } = useThemeMode(); // Now this is inside ThemeProvider

  const controlledSpeedDial = (
    <CoreSpeedDial
      speedDialIcon={<SettingsIcon />}
      actions={[
        {
          icon:
            mode === 'dark' ? (
              <LightModeIcon onClick={() => setMode('light')} />
            ) : (
              <DarkModeIcon onClick={() => setMode('dark')} />
            ),
          name: mode === 'dark' ? 'Light' : 'Dark',
        },
      ]}
    />
  );

  return (
    <>
      <Router />
      <Box
        aria-label="Settings"
        sx={{
          zIndex: 9,
          right: 20,
          bottom: 20,
          position: 'fixed',
          bgcolor: 'grey.800',
          color: 'common.white',
        }}
      >
        {controlledSpeedDial}
      </Box>
    </>
  );
}
