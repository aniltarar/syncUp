import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApplies, getClubs } from "../redux/slices/adminSlice";


export const useAdmin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        Promise.all([dispatch(getApplies()),dispatch(getClubs())]);  
    }, [dispatch]);
    
}