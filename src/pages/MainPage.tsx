import React from "react";
import { inject, observer } from "mobx-react";

import { AlbumsStore } from "../stores/AlbumsStore/AlbumsStore";
import { PhotosStore } from "../stores/PhotosStore/PhotosStore";

interface MainPageProps {
  albumsStore?: AlbumsStore;
  photosStore?: PhotosStore;
}

const MainPage: React.FC<MainPageProps> = ({ albumsStore, photosStore }) => {
  return (
    <>
    <h3>Hi! You can navigate using tabs in menu...</h3>
    <p><b>Albums</b> - all available albums</p>
    <p>Each album can be opened and you can see photos in it</p>
    <p>Each photo can be marked as favorite and you can see all favorites in <b>My favorite photos</b></p>
    <p><b>Favorite photos</b> are saved in LocalStorage</p>
    </>
  );

};

export default inject('albumsStore', 'photosStore')(observer(MainPage));
