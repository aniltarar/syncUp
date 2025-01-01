import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clubReducer from "./slices/clubSlice";
import adminReducer from "./slices/adminSlice";
import applyReducer from "./slices/applySlice";
import leaderReducer from "./slices/leaderSlice";
import eventReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    club: clubReducer,
    apply: applyReducer,
    admin: adminReducer,
    leader: leaderReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
