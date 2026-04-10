import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

import userReducer from "../slices/user";
import cardReducer from "../slices/card";
import tokenReducer from "../slices/tokens";
import popupReducer from "../slices/popup";
import filesReducer, { initFilesList } from "../slices/files";
import { getFolderListFiles } from "../tools/fs";

/**
 * Configuration de la persistance :
 * - card ✅
 * - token ✅
 * - user ❌
 * - popup ❌
 */
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [ "token", "card"],
};

const rootReducer = combineReducers({
  user: userReducer,
  card: cardReducer,
  token: tokenReducer,
  popup: popupReducer,
  files: filesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Store Redux principal
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});
store.dispatch(initFilesList(getFolderListFiles()));
export const persistor = persistStore(store);

/**
 * Types
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
store.subscribe(()=>console.log(store.getState()))