"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import loginStateReducer from "./slices/loginState";
import alertReducer from "./slices/alertSlice";
import dbDataReducer from "./slices/dbDataSlice";
import collapseStateReducer from "./slices/globalSidebarState";
import dailogReducer from "./slices/dialogSlice";

// ✅ Configure persistence only for loginState
const loginPersistConfig = {
  key: "loginState",
  storage,
};

const rootReducer = combineReducers({
  loginState: persistReducer(loginPersistConfig, loginStateReducer), // Persist only loginState
  alert: alertReducer, // Non-persistent
  dbData: dbDataReducer,
  collapse: collapseStateReducer,
  dialog: dailogReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
