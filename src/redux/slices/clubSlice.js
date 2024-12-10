import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

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

export const fetchClubByID = createAsyncThunk(
  "club/fetchClubByID",
  async (id) => {
    try {
      const clubRef = doc(db, "clubs", id);
      const clubSnapshot = await getDoc(clubRef);
      const club = clubSnapshot.data();

      return club;
    } catch (e) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  }
);

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

// Kulübe Üye Başvurusu Yapma İşlemi
export const applyMemberClub = createAsyncThunk(
  "club/applyMemberClub",
  async (applyData, { rejectWithValue }) => {
    try {
      // Kulübün içerisindeki membershipApplies dizisine kullanıcının ID'si eklenir.

      const clubRef = doc(db, "clubs", applyData.clubID);
      const clubSnapshot = await getDoc(clubRef);
      const clubData = clubSnapshot.data();
      if (clubData.membershipApplies?.includes(applyData.userID)) {
        toast.error("Zaten başvurunuz alınmıştır. Lütfen onay bekleyiniz.");
        return;
      }
      await updateDoc(clubRef, {
        membershipApplies: arrayUnion(applyData.userID),
      });

      // Kullanıcının içerisindeki membershipApplies dizisine kulübün ID'si eklenir.
      const userRef = doc(db, "users", applyData.userID);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      if (userData.membershipApplies?.includes(applyData.clubID)) {
        toast.error("Zaten başvurunuz alınmıştır. Lütfen onay bekleyiniz.");
        return;
      }
      await updateDoc(userRef, {
        membershipApplies: arrayUnion(applyData.clubID),
      });

      toast.success("Başvurunuz alınmıştır. Lütfen onay bekleyiniz.");

      return applyData;
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
      });
  },
});

export const { resetCurrentClub } = clubSlice.actions;
export default clubSlice.reducer;
