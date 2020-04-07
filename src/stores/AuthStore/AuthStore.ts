import { observable, action } from "mobx";
import consts from "../../consts/constants";

export class AuthStore {
  @observable isAuth: boolean = !!localStorage.getItem(consts.STORAGE_NAME);

  @action logIn = (name: string) => {
    localStorage.setItem(
      consts.STORAGE_NAME,
      JSON.stringify({
        name,
        id: Date.now(),
      })
    );
    this.isAuth = true;
  };

  @action logOut = () => {
    localStorage.removeItem(consts.STORAGE_NAME);
    this.isAuth = false;
  };
}

export const authStore = new AuthStore();
