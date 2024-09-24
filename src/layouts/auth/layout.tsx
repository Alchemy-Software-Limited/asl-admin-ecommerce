import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { Grid, useTheme } from '@mui/material';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { RouterLink } from 'src/routes/components';

import { stylesMode } from 'src/theme/styles';

import { Logo } from 'src/components/logo';

import { Main } from './main';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export type AuthLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function AuthLayout({ sx, children, header }: AuthLayoutProps) {
  const layoutQuery: Breakpoint = 'md';
  const theme = useTheme();

  const css = `
  body {
        overflow-y: hidden;
  }
  `;

  return (
    <>
      <style>{css}</style>
      <LayoutSection
        /** **************************************
         * Header
         *************************************** */
        headerSection={
          <HeaderSection
            layoutQuery={layoutQuery}
            slotProps={{
              container: { maxWidth: false },
              toolbar: { sx: { bgcolor: 'transparent', backdropFilter: 'unset' } },
            }}
            sx={{
              position: { [layoutQuery]: 'fixed' },

              ...header?.sx,
            }}
            slots={{
              topArea: (
                <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
              leftArea: <Logo />,
              rightArea: (
                <Link
                  component={RouterLink}
                  href="#"
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  Need help?
                </Link>
              ),
            }}
          />
        }
        /** **************************************
         * Footer
         *************************************** */
        footerSection={null}
        /** **************************************
         * Style
         *************************************** */
        cssVars={{ '--layout-auth-content-width': '420px' }}
        sx={{
          '&::before': {
            width: 1,
            height: 1,
            zIndex: -1,
            content: "''",
            opacity: 0.24,
            position: 'fixed',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: `url(/assets/background/overlay.jpg)`,
            [stylesMode.dark]: { opacity: 0.08 },
          },
          ...sx,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          >
            <img height="100%" width="100%" src="/assets/illustrations/auth.png" alt="auth" />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              overflowY: 'scroll',
              height: '100vh',
            }}
          >
            <Main layoutQuery={layoutQuery}>{children}</Main>
          </Grid>
        </Grid>
      </LayoutSection>
    </>
  );
}
