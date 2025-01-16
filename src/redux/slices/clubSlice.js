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
  clubs: [],
  currentClub: {},
  applies: [],
  message: "",
};

// Tüm Kulüpleri getirme işlemi
export const fetchClubs = createAsyncThunk("club/fetchClubs", async () => {
  try {
    const clubsRef = collection(db, "clubs");
    const clubsSnapshot = await getDocs(clubsRef);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data());
    return clubs;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

// ID'si verilen kulübü getirme işlemi

// export const fetchClubByID = createAsyncThunk(
//   "club/fetchClubByID",
//   async (id) => {
//     try {
//       // Kulüp bilgilerinin getirilmesi
//       const clubRef = doc(db, "clubs", id);
//       const clubSnapshot = await getDoc(clubRef);
//       const club = clubSnapshot.data();

//       const clubData = {
//         clubID: club.id,
//         clubName: club.clubName,
//         clubLogo: club.clubLogo,
//         clubDescription: club.clubDescription,
//         clubLocation: club.clubLocation,
//         clubCreatedAt: club.createdAt,
//         clubMembers: club.members,
//       }

//       // Etkinliklerin getirilmesi
//       const eventsRef = collection(db, "events");
//       const eventsQuery = query(eventsRef,where("clubID", "==", id));
//       const eventsSnapshot = await getDocs(eventsQuery);
//       const events = eventsSnapshot.docs.map((doc) => doc.data());

//       const eventsData = {
//         eventID: events.id,
//         eventName: events.eventName,
//         eventDate: events.eventDate,
//         eventLocation: events.eventLocation,
//       }

//       // Duyuruların getirilmesi
//       const announcementsRef = collection(db, "announcements");
//       const announcementsQuery = query(announcementsRef,where("clubID", "==", id));
//       const announcementsSnapshot = await getDocs(announcementsQuery);
//       const announcements = announcementsSnapshot.docs.map((doc) => doc.data());

//       const announcementsData = {
//         announcementID: announcements.id,
//         announcementTitle : announcements.title,
//         announcementDate : announcements.createdAt,

//       }

//       const clubDetailData = {
//         clubData,
//         eventsData,
//         announcementsData
//       }

//       return clubDetailData;

//     } catch (e) {
//       toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
//       console.log(rejectWithValue(e.message));
//       return rejectWithValue(e.message);
//     }
//   }
// );

// Club oluşturma / Apply'i onaylama işlemi

export const fetchClubByID = createAsyncThunk(
  "club/fetchClubByID",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // Kulüp bilgilerinin getirilmesi
      const clubRef = doc(db, "clubs", id);
      const clubSnapshot = await getDoc(clubRef);
      const club = clubSnapshot.data();

      const clubData = {
        clubID: id, // `doc` referansındaki `id` doğrudan kullanılır
        clubName: club?.clubName || "",
        clubLogo: club?.clubLogo || "",
        clubDescription: club?.clubDescription || "",
        clubLocation: club?.clubLocation || "",
        clubCreatedAt: club?.createdAt || "",
        clubMembers: club?.members || [],
      };

      // Etkinliklerin getirilmesi
      const eventsRef = collection(db, "events");
      const eventsQuery = query(eventsRef, where("clubID", "==", id));
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        eventID: doc.id, // `doc.id` ile belge ID'si alınır
        eventName: doc.data().eventName || "",
        eventDate: doc.data().eventDate || "",
        eventLocation: doc.data().eventLocation || "",
      }));

      // Duyuruların getirilmesi
      const announcementsRef = collection(db, "announcements");
      const announcementsQuery = query(
        announcementsRef,
        where("clubID", "==", id)
      );
      const announcementsSnapshot = await getDocs(announcementsQuery);
      const announcementsData = announcementsSnapshot.docs.map((doc) => ({
        announcementID: doc.id, // `doc.id` ile belge ID'si alınır
        announcementTitle: doc.data().title || "",
        announcementDate: doc.data().createdAt || "",
        status: doc.data().status || "",
      }));

      // Kulüp liderlerinin isimlerinin getirilmesi
      const usersRef = collection(db, "users");
      const leadersQuery = query(usersRef, where("uid", "in", club.leaders));
      const leadersSnapshot = await getDocs(leadersQuery);
      const leaders = leadersSnapshot.docs.map((doc) => doc.data());
      const leadersData = leaders.map((leader) => {
        return {
          uid: leader.uid,
          displayName: leader.displayName,
        };
      });

      // Sonuç
      const clubDetailData = {
        clubData,
        eventsData,
        announcementsData,
        leadersData,
      };

      return clubDetailData;
    } catch (e) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);

// Kullanıcın Üye olduğu kulüpleri getirme işlemi
export const fetchUserClubs = createAsyncThunk(
  "club/fetchUserClubs",
  async (userID) => {
    try {
      // kullanıcıya erişmek
      const userRef = doc(db, "users", userID);
      const userSnapshot = await getDoc(userRef);
      const { clubs } = userSnapshot.data();

      // kulüplerin getirlimesi
      const clubsRef = collection(db, "clubs");
      const clubsQuery = query(clubsRef, where("id", "in", clubs));
      const clubsSnapshot = await getDocs(clubsQuery);
      const clubsData = clubsSnapshot.docs.map((doc) => doc.data());

      return clubsData;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

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
        createdAt: dayjs().toDate(),
        leaders: [applyData.createdBy],
        clubLocation: applyData.clubLocation,
        members: [],
        events: [],
        announcements: [],
        membershipApplies: [],
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

// Kulübe Üye Başvurusu Yapma İşlemi
export const applyMemberClub = createAsyncThunk(
  "club/applyMemberClub",
  async (applyData, { rejectWithValue }) => {
    try {
      // kullanıcıya eriş
      const userRef = doc(db, "users", applyData.userID);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      // memberApplies içinde aynı kulübe aynı kullanıcıdan başvuru var mı kontrolü
      const memberAppliesColRef = collection(db, "memberApplies");
      const isMemberExist = query(
        memberAppliesColRef,
        where("clubID", "==", applyData.clubID),
        where("userID", "==", applyData.userID)
      );

      // kullanıcı kulübe kayıtlı mı ?
      if (userData.clubs.includes(applyData.clubID)) {
        toast.error("Bu kulübe zaten üyesiniz.");
        return;
      }

      const isMemberExistSnapshot = await getDocs(isMemberExist);
      if (isMemberExistSnapshot.docs.length > 0) {
        toast.error("Bu kulübe zaten başvurunuz bulunmaktadır.");
        return;
      }

      // MemberApplies collection'unun olusturulması
      const memberAppliesRef = doc(collection(db, "memberApplies"));
      const memberApplyData = {
        id: memberAppliesRef.id,
        clubID: applyData.clubID,
        clubName: applyData.clubName,
        userID: applyData.userID,
        displayName: applyData.displayName,
        status: "pending",
        createdAt: dayjs().toDate(),
      };
      await setDoc(memberAppliesRef, memberApplyData);
      // Kulübün içerisindeki membershipApplies dizisine memberApply ID'si eklenir.
      const clubRef = doc(db, "clubs", applyData.clubID);

      await updateDoc(clubRef, {
        membershipApplies: arrayUnion(memberAppliesRef.id),
      });

      // Kullanıcının içerisindeki membershipApplies dizisine kulübün ID'si eklenir.

      await updateDoc(userRef, {
        membershipApplies: arrayUnion(memberAppliesRef.id),
      });

      toast.success("Başvurunuz alınmıştır. Lütfen onay bekleyiniz.");
      return memberApplyData;
    } catch (e) {
      console.log(rejectWithValue(e.message));
      toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      return rejectWithValue(e.message);
    }
  }
);

export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    resetCurrentClub: (state) => {
      state.currentClub = {};
    },
    resetClubs: (state) => {
      state.clubs = [];
    },
  },
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
      })
      .addCase(fetchClubByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClubByID.fulfilled, (state, action) => {
        state.status = "success";
        state.currentClub = action.payload;
      })
      .addCase(fetchClubByID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(createClub.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createClub.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(createClub.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(applyMemberClub.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applyMemberClub.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(applyMemberClub.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchUserClubs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserClubs.fulfilled, (state, action) => {
        state.status = "success";
        state.clubs = action.payload;
      })
      .addCase(fetchUserClubs.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { resetCurrentClub, resetClubs } = clubSlice.actions;
export default clubSlice.reducer;
