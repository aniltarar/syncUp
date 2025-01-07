import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  getAnnouncements, getApplies, getClubs, getEvents, getUsers } from "../redux/slices/adminSlice";
export const useAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([
      dispatch(getApplies()),
      dispatch(getClubs()),
      dispatch(getUsers()),
      dispatch(getEvents()),
      dispatch(getAnnouncements()),
      
    ]);
  }, [dispatch]);
};
