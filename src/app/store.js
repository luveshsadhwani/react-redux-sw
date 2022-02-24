import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counterReducer from "../app/counter/counterSlice";
import dataReducer from "./counter/dataSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const rootReducer = {
//   reducer: {
//     counter: counterReducer,
//   },
// };

const rootReducer = combineReducers({
  counter: counterReducer,
  data: dataReducer,
});

// configure persistence, can choose storage mechanism (default is localstorage for web)
const persistConfig = {
  key: "root", // saved to cache as persist:root
  storage,
  whitelist: ["counter", "data"], // only counter will be persisted
};

// enhance reducer => passed into store => injected in provider
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store wrapped to return persist object => injected in persist gate
let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // because this is true for redux toolkit
    }),
});
let persistor = persistStore(store);
console.log(store.getState());

export { store, persistor };
