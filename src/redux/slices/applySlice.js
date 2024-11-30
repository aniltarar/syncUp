import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { getApplies } from "./adminSlice";
const initialState = {
  status: "idle",
  applies: [],
  message: "",
};



export const createApply = createAsyncThunk(
  "club/createClubApply",
  async (data,{rejectWithValue}) => {
    try {
      const applyRef = doc(collection(db, "applies"));
      const applyData = {
        id: applyRef.id,
        ...data,
      }
      await setDoc(applyRef, applyData);
      toast.success("Kulüp başvurunuz başarıyla gönderildi!");
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Kulüp başvurunuz gönderilemedi!");
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
    builder.addCase(createApply.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload || "Club creation failed.";
    });
  },
});

export const {} = applySlice.actions;
export default applySlice.reducer;