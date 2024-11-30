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

export const createClub = createAsyncThunk(
  "club/createClub",
  async (applyData, { rejectWithValue }) => {
    try {
      const clubRef = doc(collection(db, "clubs"));
      const clubData = {
        id: clubRef.id,
        clubName: applyData.clubName,
        clubDescription: applyData.clubDescription,
        clubLogo: applyData.clubLogo,
        leaders: [applyData.createdBy],
        members: [],
        events: [],
        announcements: [],
      };
      await setDoc(clubRef, clubData);
      return applyData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = clubSlice.actions;
export default clubSlice.reducer;
