import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
  status: "idle",
  message: "",
  clubs: [],
  events: [],
  users: [],
  announcuments: [],
  feedbacks: [],
  applies: [],
};


export const getApplies = createAsyncThunk(
  "admin/getApplies",
  async (_, { rejectWithValue }) => {
    try {
      const appliesRef = collection(db, "applies");
      const applies = await getDocs(appliesRef);
      const appliesData = applies.docs.map((doc) => doc.data());
      return appliesData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getApplies.fulfilled, (state, action) => {
        state.status = "success";
        state.applies = action.payload;
      })
      .addCase(getApplies.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;
