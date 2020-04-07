import React from "react";
import { observer, inject } from "mobx-react";
import PaginationList from "../components/Pagination";
import { PhotosStore } from "../stores/PhotosStore/PhotosStore";
import PhotoCard from "../components/PhotoCard";
import constants from "../consts/constants";

interface PhotosPageProps {
  photosStore: PhotosStore;
  match: {
    params: {
      page: string;
      albumId: string;
    };
  };
  location: {
    pathname: string;
  };
}

@inject("photosStore")
@observer
export default class PhotosPage extends React.Component<PhotosPageProps> {
  render(): JSX.Element {
    const page = +this.props.match.params.page;
    const albumId = +this.props.match.params.albumId;
    const renderFavorites = this.props.location.pathname.includes("favorites");
    const photos = renderFavorites
      ? this.props.photosStore.favoritesPhotos
      : this.props.photosStore.getPhotosFromAlbum(albumId);
    const pageCount = Math.ceil(photos.length / constants.CARDS_PER_PAGE);
    const from = page === 1 ? 0 : (page - 1) * constants.CARDS_PER_PAGE;
    const photosToShow = photos.slice(
      from,
      from + constants.CARDS_PER_PAGE - 1
    );
    return (
      <>
        <PaginationList
          currentPage={+page}
          pagecount={pageCount}
          linkTo={renderFavorites ? `favorites` : `albums/${albumId}/photos`}
        />
        {photosToShow.length ? (
          <ul className="flex">
            {photosToShow.map((photo) => (
              <li className="flex-el" key={photo.id}>
                <PhotoCard content={photo} mode="Photo" />
              </li>
            ))}
          </ul>
        ) : (
          <h3>You haven't photos yet ...</h3>
        )}
      </>
    );
  }
}
