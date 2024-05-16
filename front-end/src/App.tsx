import ThemeProvider from 'src/theme';

import { ContextProvider } from 'src/context';

import { Banner } from 'src/components/Banner';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import { Loader } from 'src/components/Loader';

import { Router } from 'src/navigation/router';

export function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ContextProvider>
          <Banner />
          <Router />
          <Loader />
        </ContextProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
