import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

import dayjs from "dayjs";

const initialState = {
  status: "idle",
  message: "",
  users: [],
  applies: [],
  clubs: [],
  events: [],
  announcements: [],
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
        createdAt: dayjs().toDate(),
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
// Event / Etkinlik servisleri

export const getEvents = createAsyncThunk(
  "admin/getEvents",
  async (_, { rejectWithValue }) => {
    try {
      const eventsRef = collection(db, "events");
      const events = await getDocs(eventsRef);
      const eventsData = events.docs.map((doc) => doc.data());
      return eventsData;
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
// Announcument / Duyuru servisleri

export const getAnnouncements = createAsyncThunk(
  "admin/getAnnouncuments",
  async (_, { rejectWithValue }) => {
    try {
      const announcementsRef = collection(db, "announcements");
      const announcements = await getDocs(announcementsRef);
      const announcementsData = announcements.docs.map((doc) => doc.data());
      return announcementsData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const toggleAnnouncementStatus = createAsyncThunk(
  "admin/toggleAnnouncementStatus",
  async (announcementID, { dispatch, rejectWithValue }) => {
    try {
      const announcementRef = doc(db, "announcements", announcementID);
      const announcement = await getDoc(announcementRef);
      const { status } = announcement.data();
      await updateDoc(announcementRef, {
        status: status === "active" ? "passive" : "active",
      });
      toast.success("Duyuru başarıyla güncellendi!");
      dispatch(getAnnouncements());
      return announcementID;
    } catch (error) {
      toast.error("Duyuru güncellenemedi! Lütfen tekrar deneyin.");
      return rejectWithValue(error.message);
    }
  }
);

export const createAnnouncement = createAsyncThunk(
  "admin/createAnnouncement",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const announcementRef = doc(collection(db, "announcements"));
      const announcementData = {
        id: announcementRef.id,
        ...data,
      };
      await setDoc(announcementRef, announcementData);
      toast.success("Duyuru başarıyla oluşturuldu!");
      dispatch(getAnnouncements());
      return announcementData;
    } catch (e) {
      toast.error("Duyuru oluşturulamadı! Lütfen tekrar deneyin.");
      console.log(rejectWithValue(e.message));
      return rejectWithValue(e.message);
    }
  }
);
// Feedback / Geri Bildirim servisleri

export const getFeedbacks = createAsyncThunk(
  "admin/getFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      const feedbacksRef = collection(db, "feedbacks");
      const feedbacks = await getDocs(feedbacksRef);
      const feedbacksData = feedbacks.docs.map((doc) => doc.data());
      return feedbacksData;
    } catch (e) {
      toast.error("Geri bildirimler alınamadı! Lütfen tekrar deneyin.");
      return rejectWithValue(e.message);
    }
  }
);

export const replyFeedback = createAsyncThunk(
  "admin/replyFeedback",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { feedbackID, reply, userID } = data;
      const feedbackRef = doc(db, "feedbacks", feedbackID);
      await updateDoc(feedbackRef, {
        reply,
        status: "success",
      });

      const notificationRef = doc(collection(db, "notifications"));
      const notificationData = {
        createdAt: dayjs().toDate(),
        from: "SyncUp Yöneticisi",
        id: notificationRef.id,
        isRead: false,
        message: `Geri bildiriminiz yanıtlandı!`,
        status: "unread",
        to: userID,
        title: "Geri Bildirim Yanıtı",
      };
      await setDoc(notificationRef, notificationData);

      const userRef = doc(db, "users", userID);
      await updateDoc(userRef, {
        notifications: arrayUnion(notificationRef.id),
      });
      

      toast.success("Geri bildirim başarıyla yanıtlandı!");
      dispatch(getFeedbacks());
      return feedbackID;
    } catch (error) {
      toast.error("Geri bildirim yanıtlanamadı! Lütfen tekrar deneyin.");
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
      })
      .addCase(disableUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(disableUser.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(disableUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(enableUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(enableUser.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(enableUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(setClubActive.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setClubActive.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(setClubActive.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(setClubPassive.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setClubPassive.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(setClubPassive.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getAnnouncements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnnouncements.fulfilled, (state, action) => {
        state.status = "success";
        state.announcements = action.payload;
      })
      .addCase(getAnnouncements.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(toggleAnnouncementStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleAnnouncementStatus.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(toggleAnnouncementStatus.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getFeedbacks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFeedbacks.fulfilled, (state, action) => {
        state.status = "success";
        state.feedbacks = action.payload;
      })
      .addCase(getFeedbacks.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;
