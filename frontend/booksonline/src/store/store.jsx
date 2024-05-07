import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientSlice";
import livreSlice from "./livreSlice";
import alertSlice from "./alertSlice";
import empruntSlice from "./empruntSlice";
import homeSlice from "./homeSlice";

const reducer = combineReducers({
  clients: clientSlice,
  livres: livreSlice,
  alert: alertSlice,
  emprunts: empruntSlice,
  home: homeSlice,
});

const store = configureStore({ reducer });
export default store;
