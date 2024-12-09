import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
  status: "idle",
  clubs: [],
  applies: [],
  message: "",
};

// Tüm Kulüpleri getirme işlemi
export const fetchClubs = createAsyncThunk("club/fetchClubs", async () => {
  const clubsRef = collection(db, "clubs");
  const clubsSnapshot = await getDocs(clubsRef);
  const clubs = clubsSnapshot.docs.map((doc) => doc.data());
  return clubs;
});

// Club oluşturma / Apply'i onaylama işlemi
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
        status: "active",
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.status = "success";
        state.clubs = action.payload;
      })
      .addCase(fetchClubs.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = clubSlice.actions;
export default clubSlice.reducer;
