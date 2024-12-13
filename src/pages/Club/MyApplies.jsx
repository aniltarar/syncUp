import React, { useEffect } from 'react'
import { useAccount } from '../../hooks/useAccount'
import { useDispatch } from 'react-redux';
import { getClubAppliesByUserID, getMemberAppliesByUserID } from '../../redux/slices/applySlice';

const MyApplies = () => {

  const user = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberAppliesByUserID(user.uid));
    dispatch(getClubAppliesByUserID(user.uid));
  }, [dispatch, user.id]);

  return (
    <div>MyApplies</div>
  )
}

export default MyApplies