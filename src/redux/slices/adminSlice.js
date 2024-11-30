import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

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

// Apply / Başvuru servisleri

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

export const successApply = createAsyncThunk(
  "apply/successApply",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const applyRef = doc(db, "applies", id);
      await updateDoc(applyRef, { status: "success" });
      toast.success("Kulüp onayınız başarıyla gerçekleşti!");
      // İşlem tamamlandıktan sonra getApplies'i çağır
      dispatch(getApplies());
      return id;
    } catch (error) {
      toast.error("Kulüp onayınız başarısız oldu! Lütfen tekrar deneyin.");
      return rejectWithValue(error.message);
    }
  }
);

export const rejectApply = createAsyncThunk(
  "apply/rejectApply",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const applyRef = doc(db, "applies", id);
      await updateDoc(applyRef, { status: "rejected" });
      toast.success("Kulüp başvurunuz başarıyla reddedildi!");
      // İşlem tamamlandıktan sonra getApplies'i çağır
      dispatch(getApplies());
      return id;
    } catch (error) {
      toast.error("Kulüp başvurunuz reddedilemedi! Lütfen tekrar deneyin.");
      return rejectWithValue(error.message);
    }
  }
);

// Club/ Kulüp servisleri

export const getClubs = createAsyncThunk(
  "admin/getClubs",
  async (_, { rejectWithValue }) => {
    try {
      const clubsRef = collection(db, "clubs");
      const clubs = await getDocs(clubsRef);
      const clubsData = clubs.docs.map((doc) => doc.data());
      return clubsData;
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
      })
      .addCase(getClubs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClubs.fulfilled, (state, action) => {
        state.status = "success";
        state.clubs = action.payload;
      })
      .addCase(getClubs.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(successApply.pending, (state) => {
        state.status = "loading";
      })
      .addCase(successApply.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(successApply.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(rejectApply.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rejectApply.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(rejectApply.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;
