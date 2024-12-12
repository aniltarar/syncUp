import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { array } from "zod";
import dayjs from "dayjs";

const initialState = {
  status: "idle",
  message: "",
  users: [],
  applies: [],
  clubs: [],
  events: [],
  announcuments: [],
  feedbacks: [],
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
  async (apply, { dispatch, rejectWithValue }) => {
    const { id, createdBy, clubName } = apply;
    try {
      // Apply onaylama işlemi
      const applyRef = doc(db, "applies", id);
      await updateDoc(applyRef, { status: "success" });
      toast.success("Kulüp onayınız başarıyla gerçekleşti!");
      // İşlem tamamlandıktan sonra getApplies'i çağır
      dispatch(getApplies());

      // Kullanıcıya bildirim gönderme
      const notificationRef = doc(collection(db, "notifications"));
      const notificationData = {
        id: notificationRef.id,
        from: "admin",
        to: createdBy,
        createdAt: Timestamp.now(),
        title: "Kulüp Başvurusu Hakkında",
        message: `Tebrikler! ${clubName} kulübü için yaptığınız başvurunuz onaylandı!`,
        isRead: false,
      };
      // notifications collection'ına notificationData'yı ekle
      await setDoc(notificationRef, notificationData);

      const userRef = doc(db, "users", createdBy);
      await updateDoc(userRef, {
        notifications: arrayUnion(notificationRef.id),
      });
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

export const getClubLeadersName = createAsyncThunk(
  "admin/getClubLeadersName",
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

export const getClubMembers = createAsyncThunk(
  "admin/getClubMembers",
  async (clubID, { rejectWithValue }) => {
    try {
      // ilgili kulübün üyelerinin ID'sini al
      const clubRef = doc(db, "clubs", clubID);
      const club = await getDoc(clubRef);
      const { members } = club.data(); // üyelerin ID'si

      // üyelerin ID'sini kullanarak üyelerin isimlerini al
      const membersRef = collection(db, "users");
      const membersQuery = query(membersRef, where("uid", "in", members));
      const membersData = await getDocs(membersQuery);
      const membersName = membersData.docs.map((doc) => doc.data().displayName);

      return membersName;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const setClubActive = createAsyncThunk(
  "admin/setClubActive",
  async (clubID, { rejectWithValue, dispatch }) => {
    try {
      const clubRef = doc(db, "clubs", clubID);
      await updateDoc(clubRef, { status: "active" });
      toast.success("Kulüp başarıyla aktif hale getirildi!");
      dispatch(getClubs());
      return clubID;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const setClubPassive = createAsyncThunk(
  "admin/setClubPassive",
  async (clubID, { rejectWithValue, dispatch }) => {
    try {
      const clubRef = doc(db, "clubs", clubID);
      await updateDoc(clubRef, { status: "passive" });
      toast.success("Kulüp başarıyla pasif hale getirildi!");
      dispatch(getClubs());
      return clubID;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Users / Kullanıcı servisleri

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const usersRef = collection(db, "users");
      const users = await getDocs(usersRef);
      const usersData = users.docs.map((doc) => doc.data());
      return usersData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const disableUser = createAsyncThunk(
  "admin/disableUser",
  async (uid, { dispatch, rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { disabled: true });
      toast.success("Kullanıcı başarıyla engellendi!");
      // İşlem tamamlandıktan sonra getUsers'i çağır
      dispatch(getUsers());
      return uid;
    } catch (error) {
      toast.error("Kullanıcı engellenemedi! Lütfen tekrar deneyin.");
      return rejectWithValue(error.message);
    }
  }
);

export const enableUser = createAsyncThunk(
  "admin/enableUser",
  async (uid, { dispatch, rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { disabled: false });
      toast.success("Kullanıcı başarıyla engellenenler listesinden çıkarıldı!");
      // İşlem tamamlandıktan sonra getUsers'i çağır
      dispatch(getUsers());
      return uid;
    } catch (error) {
      toast.error(
        "Kullanıcı engellenenler listesinden çıkarılamadı! Lütfen tekrar deneyin."
      );
      return rejectWithValue(error.message);
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
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;
