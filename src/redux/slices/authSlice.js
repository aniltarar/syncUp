import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig"; // auth ve db'yi import edin

const initialState = {
  status: "idle",
  user: {},
  message: "",
};

export const registerUser = createAsyncThunk("auth/registerUser", async (data, { rejectWithValue }) => {
  const { username, email, password } = data;

  try {
    // Kullanıcı oluşturma
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    // Firestore'a veri ekleme
    const usersRef = doc(collection(db, "users"), user.uid);
    await setDoc(usersRef, {
      uid: user.uid,
      username,
      email,
    });
    
    return { uid: user.uid, username, email }; // Kullanıcı bilgilerini döndür
  } catch (e) {
    console.error("Register error:", e);
    return rejectWithValue(e.message); // Hata durumunu yakala
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Kullanıcı bilgilerini store'a kaydet
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Registration failed."; // Hata mesajını kaydet
      });
  },
});

export default authSlice.reducer;
