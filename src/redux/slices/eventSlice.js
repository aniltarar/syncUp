import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebaseConfig";
const initialState = {
  status: "idle",
  events: [],
  currentEvent: {},
  message: "",
};



export const fetchActiveEvents = createAsyncThunk(
  "event/fetchActiveEvents",
  async () => {
    try {
      const eventsRef = collection(db, "events");
      const activeEventQuery = query(
        eventsRef,
        where("status", "==", "pending")
      );
      const activeEventSnapshot = await getDocs(activeEventQuery);
      const activeEvents = activeEventSnapshot.docs.map((doc) => doc.data());
      return activeEvents;
    } catch (e) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      return rejectWithValue(e.message);
    }
  }
);
export const fetchEventById = createAsyncThunk(
  "event/fetchEventById",
  async (id, { rejectWithValue }) => {
    try {
      const eventRef = doc(db, "events", id);
      const eventSnapshot = await getDoc(eventRef);
      const event = eventSnapshot.data();

  
      return event;
    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      return rejectWithValue(e.message);
    }
  }
);
export const joinEvent = createAsyncThunk(
  "event/joinEvent",
  async (data, { rejectWithValue,dispatch }) => {
    try {
      // Kullanıcının kulübe üye olup olmadığını kontrol etme
      
      const clubRef = doc(db, "clubs", data.clubID);
      const clubSnapshot = await getDoc(clubRef);
      const { members } = clubSnapshot.data();
      if (!members.includes(data.userID)) {
        toast.error("Bu kulübe üye değilsiniz. Etkinliğe katılamazsınız.");
        return rejectWithValue(
          "Bu kulübe üye değilsiniz. Etkinliğe katılamazsınız."
        );
      }
      // Etkinliğin kapasitesini kontrol etme
      const eventRef = doc(db, "events", data.eventID);
      const eventSnapshot = await getDoc(eventRef);
      const { participants, eventCapacity } = eventSnapshot.data();
      if (participants.length >= eventCapacity) {
        toast.error("Etkinlik kapasitesi dolmuştur.");
        return rejectWithValue("Etkinlik kapasitesi dolmuştur.");
      }
      // Kullanıcının etkinliğe katılıp katılmadığını kontrol etme
      if (participants.includes(data.userID)) {
        toast.error("Bu etkinliğe zaten katıldınız.");
        return rejectWithValue("Bu etkinliğe zaten katıldınız.");
      }

      // Etkinlik katılımcıları içerisine user'in ID'sini ekleme
      await updateDoc(eventRef, {
        participants: arrayUnion(data.userID),
      });
      const userRef = doc(db, "users", data.userID);
     await updateDoc(userRef, {
        events: arrayUnion(data.eventID),
      });

      dispatch(fetchEventById(data.eventID));
      toast.success("Etkinliğe katılımınız alınmıştır.");
    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      return rejectWithValue(e.message);
    }
  }
);

export const fetchEventByUserID = createAsyncThunk(
  "event/fetchEventByUserID",
  async (userID, { rejectWithValue }) => {
    try {
      const eventsRef = collection(db, "events");
      const eventQuery = query(eventsRef, where("participants", "array-contains", userID));
      const eventSnapshot = await getDocs(eventQuery);
      const events = eventSnapshot.docs.map((doc) => doc.data());
      return events;
    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      return rejectWithValue(e.message);
    }
  }
)

export const setFinishedEventByID = createAsyncThunk(
  "event/setFinishedEventByID",
  async (id, { rejectWithValue }) => {
    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, {
        status: "finished",
      });
      return id;
    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      return rejectWithValue(e.message);
    }
  });


export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    resetCurrentEvent: (state) => {
      state.currentEvent = {};
    },
    resetEvents: (state) => {
      state.events = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActiveEvents.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(fetchActiveEvents.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.status = "success";
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(joinEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(joinEvent.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(joinEvent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchEventByUserID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventByUserID.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(fetchEventByUserID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { resetCurrentEvent,resetEvents } = eventSlice.actions;
export default eventSlice.reducer;
