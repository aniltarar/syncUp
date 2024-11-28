import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClubApplies } from "../redux/slices/adminSlice";

export const useAdmin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        Promise.all([dispatch(getClubApplies()),]);  
    }, []);
    
}