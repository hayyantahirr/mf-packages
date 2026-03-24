import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../components/cart/cartSlice";

/**
 * Persist configuration for Redux Persist.
 * We're using 'root' as the key and Local Storage as the storage engine.
 */
const persistConfig = {
  key: "mf-packages-cart",
  version: 1,
  storage,
  whitelist: ["cart"], // Only persist the cart slice
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configuring the Redux store with the persisted reducer and custom middleware
 * to handle the non-serializable actions used by redux-persist.
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/**
 * Persistor used to sync the Redux state with Local Storage.
 */
export const persistor = persistStore(store);
