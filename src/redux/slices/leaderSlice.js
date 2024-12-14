import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
  status: "idle",
  message: "",
  clubs: [],
  currentClub: {},
  events: [],
  currentEvent: {},
  members: [],
};

export const fetchLeaderClubsByUserID = createAsyncThunk(
  "leader/fetchLeaderClubsByUserID",
  async (userID) => {
    try {
      const clubsRef = collection(db, "clubs");
      const leaderClubsQuery = query(clubsRef, where("leaders", "array-contains", userID));
      const leaderClubsSnapshot = await getDocs(leaderClubsQuery);
      const leaderClubs = leaderClubsSnapshot.docs.map((doc) => doc.data());
      return leaderClubs;
    } catch (e) {
        console.log(e.message);
        return rejectWithValue(e.message);
    }
  }
);

export const fetchClubLeadersName = createAsyncThunk(
  "leader/getClubLeadersName",
  async (clubID, { rejectWithValue }) => {
    try {
      // ilgili kulübün liderlerinin ID'sini al
      const clubRef = doc(db, "clubs", clubID);
      const club = await getDoc(clubRef);
      const { leaders } = club.data(); // liderlerin ID'si

      // liderlerin ID'sini kullanarak liderlerin isimlerini al
      const leadersRef = collection(db, "users");
      const leadersQuery = query(leadersRef, where("uid", "in", leaders));
      const leadersData = await getDocs(leadersQuery);
      const leadersName = leadersData.docs.map((doc) => doc.data().displayName);
      return leadersName;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const leaderSlice = createSlice({
  name: "leader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderClubsByUserID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeaderClubsByUserID.fulfilled, (state, action) => {
        state.status = "success";
        state.clubs = action.payload;
      })
      .addCase(fetchLeaderClubsByUserID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      }).addCase(fetchClubLeadersName.pending, (state) => {
        state.status = "loading";
      }).addCase(fetchClubLeadersName.fulfilled, (state) => {
        state.status = "success";
        
      }).addCase(fetchClubLeadersName.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const {} = leaderSlice.actions;
export default leaderSlice.reducer;
