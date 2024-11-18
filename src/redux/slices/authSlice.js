import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig"; // auth ve db'yi import edin

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  message: "",
};

export const registerUser = createAsyncThunk("auth/registerUser", async (data, { rejectWithValue }) => {
  const { displayName, email, password } = data;

  console.log("Register Calıstı.");
  try {
    console.log("Register Calıstı.");
    // Kullanıcı oluşturma
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: displayName });

    // Firestore'a veri ekleme
    const usersRef = doc(collection(db, "users"), user.uid);
    

    const userData = {
      uid: user.uid,
      displayName,
      email,
      role: "user",
      notifications: [],
      clubs:[],
    }

    await setDoc(usersRef, userData)

    
    return userData; // Kullanıcı bilgilerini döndür
  } catch (e) {
    console.error("Register error:", e);
    return rejectWithValue(e.message); // Hata durumunu yakala
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (data, { rejectWithValue }) => { 
  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return rejectWithValue("User not found");
    }
  }
  catch (e) {
    console.error("Login error:", e);
    return rejectWithValue(e.message);
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
        localStorage.setItem("user", JSON.stringify(action.payload)); // Kullanıcı bilgilerini local storage'a kaydet
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Registration failed."; // Hata mesajını kaydet
      })
     .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Kullanıcı bilgilerini store'a kaydet
        localStorage.setItem("user", JSON.stringify(action.payload)); // Kullanıcı bilgilerini local storage'a kaydet
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Registration failed."; // Hata mesajını kaydet
      });
  },
});

export default authSlice.reducer;
