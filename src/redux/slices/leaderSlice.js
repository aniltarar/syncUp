import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayRemove,
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
  clubs: [],
  currentClub: {},
  leaders: [],
  events: [],
  currentEvent: {},
  members: [],
  memberApplies: [],
};
// Club Services
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

export const updateClubByClubID = createAsyncThunk(
  "leader/updateClubByClubID",
  async (clubData, { rejectWithValue,dispatch }) => {
    try {
      const {id,clubName,clubLogo,description,leaders} = clubData;
      
      const clubRef = doc(db, "clubs", clubData.id);
      await updateDoc(clubRef, clubData);
      dispatch(fetchLeaderClubsByUserID(leaders[0]));
      toast.success("Kulüp başarıyla güncellendi.");

    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Kulüp güncellenirken bir hata oluştu.");
      return rejectWithValue(e.message);
    }
  }
);

// Event Services
export const fetchEventsByLeaderID = createAsyncThunk(
  "leader/fetchEventsByLeaderID",
  async (leaderID, { rejectWithValue }) => {
    try {
      const eventsRef = collection(db, "events");
      const eventsQuery = query(
        eventsRef,
        where("leaders", "array-contains", leaderID)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsData = eventsSnapshot.docs.map((doc) => doc.data());
      return eventsData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchClubByClubID = createAsyncThunk(
  "leader/fetchClubByClubID",
  async (clubID, { rejectWithValue }) => {
    try {
      const clubRef = doc(db, "clubs", clubID);
      const club = await getDoc(clubRef);
      return club.data();
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

export const cancelEvent = createAsyncThunk(
  "leader/cancelEvent",
  async (eventID, { rejectWithValue, dispatch }) => {
    try {
      const eventRef = doc(db, "events", eventID);
      const event = await getDoc(eventRef);
      const { leaders, status } = event.data();

      if (status === "failed") {
        toast.error("Etkinlik zaten iptal edilmiş.");
        return;
      }

      await setDoc(
        eventRef,
        {
          status: "failed",
        },
        { merge: true }
      );

      toast.success("Etkinlik başarıyla iptal edildi.");

      dispatch(fetchEventsByLeaderID(leaders[0]));
    } catch (e) {
      toast.error("Etkinlik iptal edilirken bir hata oluştu.");
      return rejectWithValue(e.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "leader/updateEvent",
  async (eventData, { rejectWithValue, dispatch }) => {
    try {
      const eventRef = doc(db, "events", eventData.id);
      await updateDoc(eventRef, eventData);

      toast.success("Etkinlik başarıyla güncellendi.");

      dispatch(fetchEventsByLeaderID(eventData.leaders[0]));
    } catch (e) {
      toast.error("Etkinlik güncellenirken bir hata oluştu.");
      return rejectWithValue(e.message);
    }
  }
);

// Member Apply Services
export const fetchMemberAppliesByClubID = createAsyncThunk(
  "leader/fetchMemberAppliesByClubID",
  async (clubID, { rejectWithValue, dispatch }) => {
    try {
      const memberAppliesRef = collection(db, "memberApplies");
      const memberAppliesQuery = query(
        memberAppliesRef,
        where("clubID", "==", clubID)
      );
      const memberAppliesSnapshot = await getDocs(memberAppliesQuery);

      const memberAppliesData = memberAppliesSnapshot.docs.map((doc) =>
        doc.data()
      );
      return memberAppliesData;
    } catch (e) {
      console.log(rejectWithValue(e.message));
      return rejectWithValue(e.message);
    }
  }
);

export const fetchPendingMemberApplies = createAsyncThunk(
  "leader/fetchPendingMemberApplies",
  async (clubID, { rejectWithValue }) => {
    try {
      const memberAppliesRef = collection(db, "memberApplies");
      const pendingAppliesQuery = query(
        memberAppliesRef,
        where("clubID", "==", clubID),
        where("status", "==", "pending")
      );
      const pendingAppliesSnapshot = await getDocs(pendingAppliesQuery);
      const pendingAppliesData = pendingAppliesSnapshot.docs.map((doc) =>
        doc.data()
      );

      return pendingAppliesData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const successMemberApply = createAsyncThunk(
  "leader/successMemberApply",
  async (memberApply, { rejectWithValue, dispatch }) => {
    try {
      // memberApply'nin status'ünü success yap
      const memberApplyRef = doc(db, "memberApplies", memberApply.id);
      // memberApply'nin status'ü success veya failed ise işlem yapma
      const memberApplyData = await getDoc(memberApplyRef);
      if (
        memberApplyData.data().status === "success" ||
        memberApplyData.data().status === "failed"
      ) {
        if (memberApplyData.data().status === "success") {
          toast.error("Üyelik zaten onaylanmış.");
          return;
        } else if (memberApplyData.data().status === "failed") {
          toast.error("Üyelik zaten reddedilmiş.");
          return;
        }
        return;
      }
      await updateDoc(memberApplyRef, {
        status: "success",
      });

      // memberApply'nin clubID'sini kullanarak kulüp members içerisine userID ekle
      const clubRef = doc(db, "clubs", memberApply.clubID);
      await updateDoc(
        clubRef,
        {
          members: arrayUnion(memberApply.userID),
        },
        { merge: true }
      );

      const notificationRef = doc(collection(db, "notifications"));
      const setNotificationData = {
        id: notificationRef.id,
        to: memberApply.userID,
        from: memberApply.clubName,
        title: "Üyelik Başvurusu Onaylandı",
        message: `${memberApply.clubName} kulübüne üyelik başvurunuz onaylandı.`,
        createdAt: dayjs().toDate(),
        isRead: false,
      };
      await setDoc(notificationRef, setNotificationData);

      // memberApply'nin userID'sini kullanarak user'ın clubs içerisine clubID ekle
      const userRef = doc(db, "users", memberApply.userID);
      await updateDoc(
        userRef,
        {
          clubs: arrayUnion(memberApply.clubID),
          notifications: arrayUnion(notificationRef.id),
        },
        { merge: true }
      );

      dispatch(fetchMemberAppliesByClubID(memberApply.clubID));
      toast.success("Üyelik başarıyla onaylandı.");
    } catch (e) {
      console.log(rejectWithValue(e.message));
      return rejectWithValue(e.message);
    }
  }
);

export const rejectMemberApply = createAsyncThunk(
  "leader/rejectMemberApply",
  async (memberApply, { rejectWithValue, dispatch }) => {
    try {
      // memberApply'nin status'ünü failed yap
      const memberApplyRef = doc(db, "memberApplies", memberApply.id);
      // memberApply'nin status'ü success veya failed ise işlem yapma
      const memberApplyData = await getDoc(memberApplyRef);
      if (
        memberApplyData.data().status === "success" ||
        memberApplyData.data().status === "rejected"
      ) {
        if (memberApplyData.data().status === "success") {
          toast.error("Üyelik zaten onaylanmış.");
          return;
        } else if (memberApplyData.data().status === "rejected") {
          toast.error("Üyelik zaten reddedilmiş.");
          return;
        }
        return;
      }
      await updateDoc(memberApplyRef, {
        status: "failed",
      });

      const notificationRef = doc(collection(db, "notifications"));
      const setNotificationData = {
        id: notificationRef.id,
        to: memberApply.userID,
        from: memberApply.clubName,
        title: "Üyelik Başvurusu Reddedildi",
        message: `${memberApply.clubName} kulübüne üyelik başvurunuz reddedildi.`,
        createdAt: dayjs().toDate(),
        isRead: false,
      };
      await setDoc(notificationRef, setNotificationData);

      const userRef = doc(db, "users", memberApply.userID);
      await updateDoc(
        userRef,
        {
          notifications: arrayUnion(notificationRef.id),
        },
        { merge: true }
      );

      dispatch(fetchMemberAppliesByClubID(memberApply.clubID));
      toast.success("Üyelik başarıyla reddedildi.");
    } catch (e) {
      console.log(rejectWithValue(e.message));
      return rejectWithValue(e.message);
    }
  }
);

// Announcement Services

export const fetchAnnouncementsByClubID = createAsyncThunk(
  "leader/fetchAnnouncementsByClubID",
  async (clubID, { rejectWithValue }) => {
    try {
      const announcementsRef = collection(db, "announcements");
      const announcementsQuery = query(
        announcementsRef,
        where("clubID", "==", clubID)
      );
      const announcementsSnapshot = await getDocs(announcementsQuery);
      const announcementsData = announcementsSnapshot.docs.map((doc) =>
        doc.data()
      );
      return announcementsData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const createAnnouncement = createAsyncThunk(
  "leader/createAnnouncement",
  async (announcementData, { rejectWithValue, dispatch }) => {
    try {
      const announcementRef = doc(collection(db, "announcements"));
      const setAnnouncementData = {
        id: announcementRef.id,
        status: "active",
        ...announcementData,
      };
      await setDoc(announcementRef, setAnnouncementData);
      const clubRef = doc(db, "clubs", announcementData.clubID);
      await updateDoc(clubRef, {
        announcements: arrayUnion(announcementRef.id),
      });
      dispatch(fetchAnnouncementsByClubID(announcementData.clubID));
      toast.success("Duyuru başarıyla oluşturuldu.");
    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Duyuru oluşturulurken bir hata oluştu.");
      return rejectWithValue(e.message);
    }
  }
);

export const toggleAnnouncementStatus = createAsyncThunk(
  "leader/toggleAnnouncementStatus",
  async ({ announcementID, clubID, status }, { rejectWithValue, dispatch }) => {
    try {
      const announcementRef = doc(db, "announcements", announcementID);

      if (status === "active") {
        await updateDoc(announcementRef, {
          status: "passive",
        });
        toast.success("Duyuru başarıyla yayından kaldırıldı.");
      } else {
        await updateDoc(announcementRef, {
          status: "active",
        });
        toast.success("Duyuru başarıyla yayınlandı.");
      }
      dispatch(fetchAnnouncementsByClubID(clubID));
    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Duyuru durumu değiştirilirken bir hata oluştu.");
      return rejectWithValue(e.message);
    }
  }
);

export const updateAnnouncement = createAsyncThunk(
  "leader/updateAnnouncement",
  async (announcementData, { rejectWithValue, dispatch }) => {
    try {
      const announcementRef = doc(db, "announcements", announcementData.id);
      await updateDoc(announcementRef, announcementData);
      dispatch(fetchAnnouncementsByClubID(announcementData.clubID));
      toast.success("Duyuru başarıyla güncellendi.");
    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Duyuru güncellenirken bir hata oluştu.");
      return rejectWithValue(e.message);
    }
  }
);

// Member Services

export const fetchMembersByClubID = createAsyncThunk(
  "leader/fetchMembersByClubID",
  async (clubID, { rejectWithValue }) => {
    try {
      const membersRef = collection(db, "users");
      const membersQuery = query(
        membersRef,
        where("clubs", "array-contains", clubID)
      );
      const membersSnapshot = await getDocs(membersQuery);
      const membersData = membersSnapshot.docs.map((doc) => doc.data());
      return membersData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLeadersByClubID = createAsyncThunk(
  "leader/fetchLeadersByClubID",
  async (clubID, { rejectWithValue }) => {
    try {
    const clubRef = doc(db, "clubs", clubID);
    const club = await getDoc(clubRef);
    const { leaders } = club.data();

    return leaders;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const giveLeadership = createAsyncThunk(
  "leader/giveLeadership",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { clubID, newLeaderID } = data;
      const clubRef = doc(db, "clubs", clubID);
      const club = await getDoc(clubRef);
      const { leaders } = club.data();
      if (leaders.includes(newLeaderID)) {
        toast.error("Kullanıcı zaten lider.");
        return;
      }
      await updateDoc(clubRef, {
        leaders: arrayUnion(newLeaderID),
      });

      const userRef = doc(db, "users", newLeaderID);
      await updateDoc(userRef, {
        role: "leader",
      });

      dispatch(fetchLeaderClubsByUserID(newLeaderID));
      dispatch(fetchLeadersByClubID(clubID));
      toast.success("Liderlik başarıyla verildi.");
    } catch (e) {
      toast.error("Liderlik verilirken bir hata oluştu.");
      console.log(rejectWithValue(e.message));
      return rejectWithValue(e.message);
    }
  }
);

export const removeMember = createAsyncThunk(
  "leader/removeMember",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { clubID, memberID } = data;
      const clubRef = doc(db, "clubs", clubID);
      const club = await getDoc(clubRef);
      const { leaders } = club.data();
      if (leaders.includes(memberID)) {
        toast.error("Kullanıcı lider olduğu için kulüpten çıkarılamaz.");
        return;
      }

      await updateDoc(clubRef, {
        members: arrayRemove(memberID),
      });
      const userRef = doc(db, "users", memberID);
      await updateDoc(userRef, {
        clubs: arrayRemove(clubID),
      });
      dispatch(fetchMembersByClubID(clubID));
      toast.success("Üye başarıyla kulüpten çıkarıldı.");
    } catch (e) {
      console.log(rejectWithValue(e.message));
      return rejectWithValue(e.message);
    }
  }
);



export const leaderSlice = createSlice({
  name: "leader",
  initialState,
  reducers: {
    resetMemberApplies: (state) => {
      state.memberApplies = [];
    },
    resetAnnouncements: (state) => {
      state.announcements = [];
    },
    resetCurrentClub: (state) => {
      state.currentClub = {};
    },
    resetMembers: (state) => {
      state.members = [];
    },
    resetLeaders: (state) => {
      state.leaders = [];
    }
  },
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
      })
      .addCase(fetchEventsByLeaderID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventsByLeaderID.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(fetchEventsByLeaderID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(cancelEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelEvent.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(cancelEvent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEvent.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchMemberAppliesByClubID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMemberAppliesByClubID.fulfilled, (state, action) => {
        state.status = "success";
        state.memberApplies = action.payload;
      })
      .addCase(fetchMemberAppliesByClubID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchClubByClubID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClubByClubID.fulfilled, (state, action) => {
        state.status = "success";
        state.currentClub = action.payload;
      })
      .addCase(fetchClubByClubID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchAnnouncementsByClubID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnnouncementsByClubID.fulfilled, (state, action) => {
        state.status = "success";
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncementsByClubID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(createAnnouncement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAnnouncement.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(toggleAnnouncementStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleAnnouncementStatus.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(toggleAnnouncementStatus.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(updateAnnouncement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAnnouncement.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchMembersByClubID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembersByClubID.fulfilled, (state, action) => {
        state.status = "success";
        state.members = action.payload;
      })
      .addCase(fetchMembersByClubID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchLeadersByClubID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeadersByClubID.fulfilled, (state, action) => {
        state.status = "success";
        state.leaders = action.payload;
      })
      .addCase(fetchLeadersByClubID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(giveLeadership.pending, (state) => {
        state.status = "loading";
      })
      .addCase(giveLeadership.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(giveLeadership.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(removeMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeMember.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(successMemberApply.pending, (state) => {
        state.status = "loading";
      })
      .addCase(successMemberApply.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(successMemberApply.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(rejectMemberApply.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rejectMemberApply.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(rejectMemberApply.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
      
  },
});

export const {
  resetMemberApplies,
  resetAnnouncements,
  resetCurrentClub,
  resetMembers,
  resetLeaders
} = leaderSlice.actions;
export default leaderSlice.reducer;
