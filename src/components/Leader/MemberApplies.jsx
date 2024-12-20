import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMemberAppliesByClubID } from '../../redux/slices/leaderSlice'
import MemberApplyBox from './MemberApplyBox'


const MemberApplies = ({ club }) => {

    const dispatch = useDispatch()
    const { memberApplies } = useSelector((state) => state.leader)


    useEffect(() => {
        dispatch(fetchMemberAppliesByClubID(club.id))
    }, [dispatch, club.id])


    return (
        <>
            {
                memberApplies?.map((memberApply) => (
                    <MemberApplyBox key={memberApply.id} memberApply={memberApply} />
                ))
            }
        </>
    )
}

export default MemberApplies