import React from "react";
import { observer, inject } from "mobx-react";
import PaginationList from "../components/Pagination";
import { AlbumsStore } from "../stores/AlbumsStore/AlbumsStore";
import PhotoCard from "../components/PhotoCard";
import { PhotosStore } from "../stores/PhotosStore/PhotosStore";

interface AlbumPageProps {
  albumsStore: AlbumsStore;
  photosStore: PhotosStore;
  match: {
    params: {
      page: string;
    };
  };
}

@inject("albumsStore", "photosStore")
@observer
export default class AlbumPage extends React.Component<AlbumPageProps> {
  render(): JSX.Element {
    const page = +this.props.match.params.page;
    const pageCount = Math.ceil(this.props.albumsStore.albums.length / 9);
    const albums = this.props.albumsStore.albums.slice(page - 1, page + 8);
    return (
      <>
        <PaginationList
          currentPage={+page}
          pagecount={pageCount}
          linkTo="albums"
        />
        <ul className="flex">
          {albums.map((album) => (
            <li className="flex-el" key={album.id}>
              <PhotoCard content={album} mode="Album" />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
