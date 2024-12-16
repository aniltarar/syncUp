import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

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
      const leaderClubsQuery = query(
        clubsRef,
        where("leaders", "array-contains", userID)
      );
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


export const fetchEventsByLeaderID = createAsyncThunk(
  "leader/fetchEventsByLeaderID",
  async (leaderID, { rejectWithValue }) => {
    try {
      const eventsRef = collection(db, "events");
      const eventsQuery = query(eventsRef, where("leaders", "array-contains", leaderID));
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsData = eventsSnapshot.docs.map((doc) => doc.data());
      return eventsData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "leader/createEvent",
  async (eventData, { rejectWithValue, dispatch }) => {
    try {
      // Events Collection'una eklenmesi
      const eventRef = doc(collection(db, "events"));
      const setEventData = {
        id: eventRef.id,
        ...eventData,
      };
      await setDoc(eventRef, setEventData);
      
      toast.success("Etkinlik başarıyla oluşturuldu.");

      // Clubs Collection'una Event ID'nin eklenmesi

      const clubRef = doc(db, "clubs", eventData.clubID);
      await setDoc(
        clubRef,
        {
          events: arrayUnion(eventRef.id),
        },
        { merge: true }
      );

      // Etkinliklerin güncellenmesi
      dispatch(fetchEventsByLeaderID(eventData.leaders[0]));
    } catch (e) {
      toast.error("Etkinlik oluşturulurken bir hata oluştu.");
      console.log(e.message);
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
      })
      .addCase(fetchClubLeadersName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClubLeadersName.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(fetchClubLeadersName.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      }).addCase(fetchEventsByLeaderID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventsByLeaderID.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(fetchEventsByLeaderID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const {} = leaderSlice.actions;
export default leaderSlice.reducer;
