import { observable, action, computed } from "mobx";
import consts from "../../consts/constants";
import { requestGet } from "../../utils/requestHelpers";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorite?: boolean;
}

export class PhotosStore {
  @observable photos: Photo[] | [] = [];
  @observable isFetchingPhotos: boolean = false;

  @computed get favoritesPhotos(): Photo[] | [] {
    return this.photos.filter((photo) => photo.favorite);
  }

  @action getPhotos = async (): Promise<void> => {
    try {
      this.isFetchingPhotos = true;
      const photos = await requestGet(consts.PHOTOS_URL);
      const storage = localStorage.getItem(consts.STORAGE_NAME);
      if (storage) {
        const user = JSON.parse(storage);
        let favorites: any[] = [];
        if (user.favorites) {
          favorites = user.favorites.map((photo: Photo) => photo.id);
        }
        this.photos = photos.map((photo: Photo) => {
          if (favorites.includes(photo.id)) {
            photo.favorite = true;
          }
          return photo;
        });
      } else {
        this.photos = photos;
      }
    } catch {
    } finally {
      this.isFetchingPhotos = false;
    }
  };

  @action getPreview = (albumId: number) =>
    this.photos.find((photo) => albumId === photo.albumId);
  @action getPhotosFromAlbum = (albumID: number) =>
    this.photos.filter((photo) => +photo.albumId === +albumID);

  @action addFavorites = () => {
    const storage = localStorage.getItem(consts.STORAGE_NAME);
    if (storage) {
      const user = JSON.parse(storage);
      user.favorites = this.favoritesPhotos;

      localStorage.setItem(consts.STORAGE_NAME, JSON.stringify(user));
    }
  };
}

export const photosStore = new PhotosStore();
