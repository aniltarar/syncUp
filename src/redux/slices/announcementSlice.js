import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const initialState = {
  status: "idle",
  announcements: [],
  currentAnnouncement: {},
  message: null,
};

export const fetchAnnouncements = createAsyncThunk(
  "announcement/fetchAnnouncements",
  async () => {
    try {
      const announcementsRef = collection(db, "announcements");
      const activeAnnouncementQuery = query(announcementsRef,where("status", "==", "active"));
      const announcementsSnapshot = await getDocs(activeAnnouncementQuery);
      const announcementsData = announcementsSnapshot.docs.map((doc) =>
        doc.data()
      );

      return announcementsData;
    } catch (error) {
      toast.error(
        "Duyurular yüklenirken bir hata oluştu. Lütfen Daha sonra tekrar deneyiniz."
      );
      console.log(error);
    }
  }
);

export const fetchAnnouncementById = createAsyncThunk(
  "announcement/fetchAnnouncementById",
  async (id, { rejectWithValue }) => {

    try {
      const announcementRef = doc(db, "announcements", id);
      const announcementSnap = await getDoc(announcementRef);
      const announcementData = announcementSnap.data();
      return announcementData;
    } catch (e) {
        console.log(rejectWithValue(e.message));
      return rejectWithValue(e.message);
    }
  }
);

export const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    resetCurrentAnnouncement: (state) => {
      state.currentAnnouncement = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = "idle";
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.error.message;
      })
      .addCase(fetchAnnouncementById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnnouncementById.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentAnnouncement = action.payload;
      })
      .addCase(fetchAnnouncementById.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      });
  },
});

export const { resetCurrentAnnouncement } = announcementSlice.actions;
export default announcementSlice.reducer;
