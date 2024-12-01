import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
      // Kulüp oluşturulurken kulüp lideri otomatik olarak kulübe eklenir.
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

      // Kulüp liderinin rolü ve clubs dizisi güncellenir.
      const setUserRole = doc(db, "users", applyData.createdBy);
      await updateDoc(setUserRole, {
        role: "leader",
        clubs: arrayUnion(clubRef.id),
      });

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
