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
  applies: [],
  memberApplies: [],
  message: "",
};

export const createApply = createAsyncThunk(
  "club/createClubApply",
  async (data, { rejectWithValue }) => {
    try {
      const applyRef = doc(collection(db, "applies"));
      const applyData = {
        id: applyRef.id,
        createdAt: dayjs().toDate(),
        ...data,
      };
      await setDoc(applyRef, applyData);
      const setUserApplies = doc(db, "users", data.createdBy);
      await updateDoc(setUserApplies, {
        applies: arrayUnion(applyRef.id),
      });

      toast.success("Kulüp başvurunuz başarıyla gönderildi!");

      return data;
    } catch (error) {
      console.log(rejectWithValue(error.message));
     
      toast.error("Kulüp başvurunuz gönderilemedi!");
      return rejectWithValue(error.message);
    }
  }
);

export const getMemberAppliesByUserID = createAsyncThunk(
  "apply/getMemberAppliesByUserID",
  async (userID, { rejectWithValue }) => {
    try {
      const memberAppliesRef = collection(db, "memberApplies");
      const userMemberAppliesQuery = query(
        memberAppliesRef,
        where("userID", "==", userID)
      );
      const memberAppliesSnapshot = await getDocs(userMemberAppliesQuery);
      const memberAppliesData = memberAppliesSnapshot.docs.map((doc) =>
        doc.data()
      );
      
      return memberAppliesData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getClubAppliesByUserID = createAsyncThunk(
  "apply/getClubAppliesByUserID",
  async (userID, { rejectWithValue }) => {
    try {
      const clubAppliesRef = collection(db, "applies");
      const userClubAppliesQuery = query(
        clubAppliesRef,
        where("createdBy", "==", userID)
      );
      const clubAppliesSnapshot = await getDocs(userClubAppliesQuery);
      const clubAppliesData = clubAppliesSnapshot.docs.map((doc) => doc.data());

      return clubAppliesData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const applySlice = createSlice({
  name: "apply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createApply.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createApply.fulfilled, (state, action) => {
      state.status = "idle";
      state.applies.push(action.payload);
      state.message = "Club applied successfully sended!";
    });
    builder
      .addCase(createApply.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Club creation failed.";
      })
      .addCase(getMemberAppliesByUserID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMemberAppliesByUserID.fulfilled, (state, action) => {
        state.status = "idle";
        state.memberApplies = action.payload;
      })
      .addCase(getMemberAppliesByUserID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Member applies couldn't fetched.";
      })
      .addCase(getClubAppliesByUserID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClubAppliesByUserID.fulfilled, (state, action) => {
        state.status = "idle";
        state.applies = action.payload;
      })
      .addCase(getClubAppliesByUserID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Club applies couldn't fetched.";
      });
  },
});

export const {} = applySlice.actions;
export default applySlice.reducer;
