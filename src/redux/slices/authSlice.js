import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig"; // auth ve db'yi import edin
import toast from "react-hot-toast";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    const { displayName, email, password } = data;


    try {

      // Kullanıcı oluşturma
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
        clubs: [],
        phoneNumber: null,
        identity: null,
      };

      await setDoc(usersRef, userData);

      return userData; // Kullanıcı bilgilerini döndür
    } catch (e) {
      console.error("Register error:", e);
      return rejectWithValue(e.message); // Hata durumunu yakala
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        return rejectWithValue("User not found");
      }
    } catch (e) {
      console.error("Login error:", e);
      toast.error("Giriş başarısız oldu.");
      return rejectWithValue(e.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", data.uid);
      await updateDoc(userRef, data);
      const userDoc = await getDoc(userRef);
      toast.success("Profiliniz başarıyla güncellendi.");
      return userDoc.data();
    } catch (e) {
      console.error("Update error:", e);
      toast.error("Profil güncelleme başarısız oldu.");
      return rejectWithValue(e.message);
    }
  }
);

export const getUserByID = createAsyncThunk(
  "auth/getUserByID",
  async (uid, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      return userData;
    } catch (e) {
      console.error("Get user by ID error:", e);
      return rejectWithValue(e.message);
    }
  }
);

export const sendResetPasswordEmail = createAsyncThunk(
  "auth/sendResetPasswordEmail",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Şifre sıfırlama e-postası gönderildi.");
    } catch (e) {
      console.error("Send reset password email error:", e);
      toast.error("Şifre sıfırlama e-postası gönderilemedi.");
      return rejectWithValue(e.message);
    }
  }
);

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
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Kullanıcı bilgilerini store'a kaydet
        localStorage.setItem("user", JSON.stringify(action.payload)); // Kullanıcı bilgilerini local storage
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Update failed."; // Hata mesajını kaydet
      })
      .addCase(getUserByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Kullanıcı bilgilerini store'a kaydet
        localStorage.setItem("user", JSON.stringify(action.payload)); // Kullanıcı bilgilerini local storage
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Get user failed."; // Hata mesajını kaydet
      })
      .addCase(sendResetPasswordEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendResetPasswordEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "Send reset password email failed."; // Hata mesajını kaydet
      });
  },
});

export default authSlice.reducer;
