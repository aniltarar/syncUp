import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from '../../../hooks/useAccount';
import { fetchLeaderClubsByUserID } from '../../../redux/slices/leaderSlice';
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import LeaderClubBox from '../../../components/Leader/LeaderClubBox';
import autoAnimate from '@formkit/auto-animate';


const LeaderClubs = () => {

  const dispatch = useDispatch();
  const user = useAccount()
  const { clubs } = useSelector(state => state.leader)
  const [sortOrder, setSortOrder] = useState("asc"); // A-Z veya Z-A sıralama
  
  const sortedClubs = [...clubs]?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.clubName.localeCompare(b.clubName);
    } else {
      return b.clubName.localeCompare(a.clubName);
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const clubBoxRef = useRef(null);






  useEffect(() => {
    dispatch(fetchLeaderClubsByUserID(user.uid))
  }, [dispatch, user])

  useEffect(() => {
    autoAnimate(clubBoxRef.current, { duration: 300 });
  }, [clubs])



  return (
    <div className='flex flex-col gap-y-3 '>
      <div className='border-b '>
        <h1 className='text-2xl font-semibold'>Lideri Olduğum Kulüpler</h1>
      </div>


      <div className='grid grid-cols-6 gap-3 bg-neutral-100 p-3 place-items-center rounded-lg shadow font-semibold'>
        <span className='justify-self-start flex items-center gap-x-3 cursor-pointer' onClick={toggleSortOrder}>Kulüp Adı {sortOrder === "asc" ? <FaSortAlphaDown size={20} /> : <FaSortAlphaDownAlt size={20} />}</span>
        <span className='justify-self-start'>Kulüp Logosu</span>
        <span className='justify-self-start'>Kulüp Liderleri</span>
        <span className='justify-self-center'>Etkinlik Sayısı</span>
        <span className='justify-self-center'>Üye Sayısı</span>
        <span className='justify-self-center'>Bekleyen Üye Başvurusu</span>
      </div>

      <div ref={clubBoxRef} className='grid gap-3'>
        {sortedClubs?.map((club) => (
          <LeaderClubBox key={club.id} club={club} />
        ))}
      </div>



    </div>
  )
}

export default LeaderClubs