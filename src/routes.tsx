import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import AlbumPage from "./pages/AlbumPage";
import PhotosPage from "./pages/PhotosPage";

export const getRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/albums/:page" component={AlbumPage} exact />
        <Route
          path="/albums/:albumId/photos/:page"
          component={PhotosPage}
          exact
        />
        <Route path="/favorites/:page" component={PhotosPage} exact></Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
