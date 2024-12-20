import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchMemberAppliesByClubID } from '../../../redux/slices/leaderSlice';
import MemberApplyBox from '../../../components/Leader/MemberApplyBox';
import autoAnimate from '@formkit/auto-animate';
import { use } from 'react';

const LeaderMembershipAppliesDetail = () => {
    const { clubID } = useParams();
    const dispatch = useDispatch();
    const { memberApplies } = useSelector((state) => state.leader);

    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')

    const filteredMemberApplies = memberApplies?.filter((memberApply) => {
        return memberApply.displayName.toLowerCase().includes(search.toLowerCase()) && (status ? memberApply.status === status : true)
    })


    const memberApplyRef = useRef(null);


    useEffect(() => {
        autoAnimate(memberApplyRef.current, { duration: 300 });
    }
        , [filteredMemberApplies])





    useEffect(() => {
        dispatch(fetchMemberAppliesByClubID(clubID));
    }, [dispatch, clubID])



    return (
        <div className='flex flex-col gap-y-3'>
            <div className='grid grid-cols-5 gap-3 bg-neutral-100 p-3 rounded-lg shadow font-semibold'>
                <input type='text' placeholder='Ara...' className='col-span-4 p-2 rounded-lg' value={search} onChange={(e) => setSearch(e.target.value)} />
                <select className='col-span-1 p-2 rounded-lg' value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value=''>Tümü</option>
                    <option value='success'>Tamamlandı</option>
                    <option value='failed'>Reddedildi</option>
                    <option value='pending'>Beklemede</option>
                </select>

            </div>

            <div className='grid grid-cols-5 gap-3 bg-neutral-100 p-3 rounded-lg shadow font-semibold'>
                <span>Ad Soyad</span>
                <span>Kulüp Adı</span>
                <span>Üyelik Tarihi</span>
                <span>Durum</span>
                <span>İşlemler</span>
            </div>

            <div ref={memberApplyRef} className='flex flex-col gap-y-3'>

                {
                    filteredMemberApplies?.map((memberApply) => (
                        <MemberApplyBox key={memberApply.id} memberApply={memberApply} />
                    ))
                }
            </div>

        </div>
    )
}

export default LeaderMembershipAppliesDetail