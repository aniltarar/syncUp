import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clubReducer from "./slices/clubSlice";
import adminReducer  from "./slices/adminSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        club:clubReducer,
        admin:adminReducer,
    }
})