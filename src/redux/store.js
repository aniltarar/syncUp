import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clubReducer from "./slices/clubSlice";
import adminReducer from "./slices/adminSlice";
import applyReducer from "./slices/applySlice";
import leaderReducer from "./slices/leaderSlice";
import eventReducer from "./slices/eventSlice";
import announcementReducer from "./slices/announcementSlice";
import feedbackReducer from "./slices/feedbackSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    club: clubReducer,
    apply: applyReducer,
    admin: adminReducer,
    leader: leaderReducer,
    event: eventReducer,
    announcement: announcementReducer,
    feedback: feedbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
