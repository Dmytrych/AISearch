import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MainPage } from 'src/pages/MainPage';
import { LoginPage } from 'src/pages/LoginPage';
import { NotFoundPage } from 'src/pages/NotFoundPage';
import { DetailsPage } from 'src/pages/DetailsPage';
import { LibraryPage } from 'src/pages/LibraryPage';
import { ProfilePage } from 'src/pages/ProfilePage';
import { Layout } from 'src/components/Layout';

import { AuthRestriction } from './AuthRestriction';
import { ROUTES } from './routes';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Layout />}>
          <Route index element={<MainPage />} />
          
          <Route
            path={ROUTES.LOGIN}
            element={<LoginPage />}
          />

          <Route
            path={`${ROUTES.DETAILS}/:id`}
            element={
              <DetailsPage />
            }
          />

          <Route
            path={ROUTES.LIBRARY}
            element={
              <AuthRestriction>
                <LibraryPage />
              </AuthRestriction>
            }
          />

          <Route
            path={ROUTES.PROFILE}
            element={
              <AuthRestriction>
                <ProfilePage />
              </AuthRestriction>
            }
          />
        </Route>
        
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route
          path={ROUTES.WILDCARD}
          element={<Navigate to={ROUTES.NOT_FOUND} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
