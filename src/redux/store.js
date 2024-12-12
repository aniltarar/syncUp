import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clubReducer from "./slices/clubSlice";
import adminReducer  from "./slices/adminSlice";
import applyReducer from "./slices/applySlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        club:clubReducer,
        apply:applyReducer,
        admin:adminReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})