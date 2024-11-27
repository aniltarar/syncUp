import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clubReducer from "./slices/clubSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        club:clubReducer
    }
})