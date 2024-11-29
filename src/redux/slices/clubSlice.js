import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
const initialState = {
  status: "idle",
  clubs: [],
  applies: [],
  message: "",
};

export const createClubApply = createAsyncThunk(
  "club/createClubApply",
  async (data,{rejectWithValue}) => {
    try {
      const applyRef = doc(collection(db, "applies"));
      await setDoc(applyRef, data);
      toast.success("Kulüp başvurunuz başarıyla gönderildi!");
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Kulüp başvurunuz gönderilemedi!");
      return rejectWithValue(error.message);
    }
  }
);

export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createClubApply.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createClubApply.fulfilled, (state, action) => {
      state.status = "idle";
      state.applies.push(action.payload);
      state.message = "Club applied successfully sended!";
    });
    builder.addCase(createClubApply.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload || "Club creation failed.";
    });
  },
});

export const {} = clubSlice.actions;
export default clubSlice.reducer;
