import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './app';
import store from './redux/store';


// ----------------------------------------------------------------------
const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
              <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={googleClientId}>
                  <App />
                  <Toaster />
                </GoogleOAuthProvider>
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
