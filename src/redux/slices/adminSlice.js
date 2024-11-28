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
  clubApplies: [],
};

export const getClubApplies = createAsyncThunk(
  "admin/getClubApplies",
  async (_, { rejectWithValue }) => {
    try {
      const clubsRef = collection(db, "clubs");
      const appliesQuery = query(clubsRef, where("status", "==", "pending"));
      const clubAplies = await getDocs(appliesQuery);
      const applies = clubAplies.docs.map((doc) => doc.data());
      return applies;
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
    builder.addCase(getClubApplies.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getClubApplies.fulfilled, (state, action) => {
      state.status = "success";
      state.clubApplies = action.payload;
    });
    builder.addCase(getClubApplies.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
  },
});

export default adminSlice.reducer;
