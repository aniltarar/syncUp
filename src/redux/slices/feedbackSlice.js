import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
    status: "idle",
    feedbacks: [],
    message: "",
}

export const fetchFeedbacksByUserID = createAsyncThunk(
    "feedback/fetchFeedbacksByUserID",
    async (userID, { rejectWithValue }) => {
        try {
            const feedbacksRef = collection(db, "feedbacks");
           const feedbackQuery = query(feedbacksRef, where("userID", "==", userID))
            const feedbackSnapshot = await getDocs(feedbackQuery)
            const feedbacks = feedbackSnapshot.docs.map(doc => doc.data())
            return feedbacks

        } catch (e) {
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.")
            return rejectWithValue(e.message)
        }
    }
)



export const createFeedback = createAsyncThunk(
    "feedback/createFeedback",
    async (data, { rejectWithValue,dispatch }) => {
        try {
            const feedbackRef = doc(collection(db, "feedbacks"));
            const feedbackData = {
                id: feedbackRef.id,
                ...data
            }
            await setDoc(feedbackRef, feedbackData)
            toast.success("Geri Bildirim Oluşturuldu.")
            dispatch(fetchFeedbacksByUserID(data.userID))

            return feedbackData;

        } catch (e) {
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.")
            console.log(rejectWithValue(e.message))
            return rejectWithValue(e.message)
        }
    }
)



export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
       
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchFeedbacksByUserID.pending,(state)=>{
            state.status="loading"
        }).addCase(fetchFeedbacksByUserID.fulfilled,(state,action)=>{
            state.status="success"
            state.feedbacks=action.payload
        }).addCase(fetchFeedbacksByUserID.rejected,(state,action)=>{
            state.status="failed"
            state.message=action.payload
        }).addCase(createFeedback.pending,(state)=>{
            state.status="loading"
        }).addCase(createFeedback.fulfilled,(state)=>{
            state.status="success"
            
        }).addCase(createFeedback.rejected,(state,action)=>{
            state.status="failed"
            state.message=action.payload
        })

    }
})

export const { } = feedbackSlice.actions
export default feedbackSlice.reducer