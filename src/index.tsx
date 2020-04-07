import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import { authStore } from "./stores/AuthStore/AuthStore";
import { albumsStore } from "./stores/AlbumsStore/AlbumsStore";
import { photosStore } from "./stores/PhotosStore/PhotosStore";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const stores = {
  authStore,
  albumsStore,
  photosStore
};

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
