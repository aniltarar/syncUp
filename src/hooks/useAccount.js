import { useSelector } from "react-redux";

export const useAccount = () => {
   return useSelector(state => state.auth.user)
}