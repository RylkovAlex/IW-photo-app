import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { PhotosStore, Photo } from "../stores/PhotosStore/PhotosStore";
import { Album } from "../stores/AlbumsStore/AlbumsStore";

interface AlbumCardProps {
  content: Photo | Album;
  photosStore?: PhotosStore;
  mode: "Album" | "Photo";
}

const PhotoCard: React.FC<AlbumCardProps> = ({
  content,
  photosStore,
  mode,
}) => {
  return (
    <div className="col s12 m7">
      <div className="card">
        <div className="card-image">
          {mode === "Album" && (
            <img src={photosStore?.getPreview(content.id)?.url} alt="preview" />
          )}
          {mode === "Photo" && <img src={(content as any)["url"]} alt="" />}
          {mode === "Album" && (
            <span className="card-title">{content.title}</span>
          )}
        </div>
        {mode === "Album" && (
          <div className="card-content">
            <p>Here should be album description, but we have not it yet...</p>
          </div>
        )}
        <div className="card-action">
          {mode === "Album" && (
            <Link to={`/albums/${content.id}/photos/1`}>Open Album</Link>
          )}
          {mode === "Photo" && (
            <p>
              <label>
                <input
                  type="checkbox"
                  checked={content.favorite}
                  onChange={() => {
                    content.favorite = !content.favorite;
                    photosStore?.addFavorites()
                  }}
                />
                <span>Mark as favorite</span>
              </label>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default inject("photosStore")(observer(PhotoCard));
