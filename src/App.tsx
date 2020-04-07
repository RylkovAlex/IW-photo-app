import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

import Navbar from "./components/NavBar";
import { AuthStore } from "./stores/AuthStore/AuthStore";
import { getRoutes } from "./routes";
import Footer from "./components/Footer";
import { AlbumsStore, albumsStore } from "./stores/AlbumsStore/AlbumsStore";
import { photosStore, PhotosStore } from "./stores/PhotosStore/PhotosStore";
import { Loader } from "./components/Loader";

interface AppProps {
  authStore?: AuthStore;
  photosStore?: PhotosStore;
  albumsStore?: AlbumsStore;
}

const App: React.FC<AppProps> = ({ authStore }) => {
  const routes = getRoutes(authStore!.isAuth);
  useEffect(() => {
    if (
      authStore!.isAuth &&
      !photosStore.photos.length &&
      !albumsStore.albums.length
    ) {
      if (!photosStore.photos.length) {
        photosStore.getPhotos();
      }
      if (!albumsStore.albums.length) {
        albumsStore.getAlbums();
      }
    }
  }, [authStore?.isAuth]);

  if (authStore!.isAuth) {
    if (photosStore.isFetchingPhotos || albumsStore.isFetchingAlbums) {
      return <Loader />;
    }

    return (
      <>
        <Navbar />
        <div className="container main">{routes}</div>
        <Footer />
      </>
    );
  }

  return <div className="container main">{routes}</div>;
};

export default inject("authStore", "photosStore", "albumsStore")(observer(App));
