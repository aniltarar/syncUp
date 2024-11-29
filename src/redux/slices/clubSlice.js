import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
const initialState = {
  status: "idle",
  clubs: [],
  applies: [],
  message: "",
};



export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   
  },
});

export const {} = clubSlice.actions;
export default clubSlice.reducer;
