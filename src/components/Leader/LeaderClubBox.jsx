import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchClubLeadersName } from '../../redux/slices/leaderSlice';

const LeaderClubBox = ({ club }) => {
    const dispatch = useDispatch();
    const [leaderNames, setleaderNames] = useState([]);

   const capitalizeWords = (str) => {
       return str
         .split(' ')
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
         .join(' ');
     };
   
     useEffect(() => {
       dispatch(fetchClubLeadersName(club.id)).then((data) => {
         const leaderNames = data.payload.map((name) => capitalizeWords(name));
         setleaderNames(leaderNames);
       });
     }, [club, dispatch]);

    console.log(leaderNames);

    return (
        <div key={club.id} className='grid grid-cols-6 gap-3 bg-neutral-100 p-3 place-items-center rounded-lg shadow'>
            <span className='justify-self-start'>{club.clubName}</span>
            <span className='justify-self-start'><img src={club.clubLogo} alt={club.clubName} className='w-40  object-cover border rounded-md ' /></span>
            <span className='justify-self-start'>{leaderNames.length > 0 ? leaderNames.join(', ') : 'Lider Yok'}</span>
            <span className='justify-self-center'>{club?.members?.length}</span>
            <span className='justify-self-center'>{club?.events?.length}</span>
            <span className='justify-self-center'>{club?.membershipApplies?.length}</span>
        </div>
    )
}

export default LeaderClubBox