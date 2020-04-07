import { observable, action } from "mobx";
import consts from "../../consts/constants";
import { requestGet } from "../../utils/requestHelpers";

export interface Album {
  userId: number;
  id: number;
  title: string;
  favorite?: boolean;
}

export class AlbumsStore {
  @observable albums: Album[] = [];
  @observable isFetchingAlbums: boolean = false;

  @action getAlbums = async (): Promise<void> => {
    try {
      this.isFetchingAlbums = true;
      this.albums = await requestGet(consts.ALBUMS_URL);
    } catch {
    } finally {
      this.isFetchingAlbums = false;
    }
  };
}

export const albumsStore = new AlbumsStore();
