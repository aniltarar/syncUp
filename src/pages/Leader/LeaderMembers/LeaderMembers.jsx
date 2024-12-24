import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchMembersByClubID, resetMembers } from '../../../redux/slices/leaderSlice'
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import LeaderMemberBox from '../../../components/Leader/LeaderMemberBox';

const LeaderMembers = () => {

    const { clubID } = useParams()
    const dispatch = useDispatch()
    const { members } = useSelector((state) => state.leader)
    const [search, setSearch] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')

    const filteredMembers = members?.filter((member) => {
        const matchesSearch = member.displayName.toLowerCase().includes(search.toLowerCase())
        return matchesSearch
    })?.sort((a, b) => {
        return sortOrder === 'asc' ? a.displayName.localeCompare(b.displayName) : b.displayName.localeCompare(a.displayName)
    })

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
    }

    useEffect(() => {
        dispatch(resetMembers())
        dispatch(fetchMembersByClubID(clubID))
    }, [dispatch, clubID])


    return (
        <div className='flex flex-col gap-y-3'>
            <div className='flex flex-col gap-y-1 p-1'>
                <h1 className='text-2xl font-semibold'>Üyeler</h1>
                <hr />
            </div>
            <div className='bg-neutral-100 p-3 rounded-lg shadow font-semibold'>
                <input type='text' placeholder='Üye ara...' className='w-full p-2 rounded-lg shadow' onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className='grid grid-cols-6 bg-neutral-100 p-3 rounded-lg shadow font-semibold'>
                <span className='font-semibold flex items-center gap-x-2 justify-self-center'>Ad Soyad
                    {
                        sortOrder === 'asc' ? <FaSortAlphaDown size={20} className='inline-block ml-1 text-lg cursor-pointer' onClick={toggleSortOrder} /> : <FaSortAlphaDownAlt size={20} className='inline-block ml-1 text-lg cursor-pointer' onClick={toggleSortOrder} />
                    }
                </span>
                <span className='font-semibold justify-self-center'>E-Posta</span>
                <span className='font-semibold justify-self-center'>Telefon</span>
                <span className='font-semibold justify-self-center'>Fakülte</span>
                <span className='font-semibold justify-self-center'>Bölüm</span>
                <span className='font-semibold justify-self-center'>İşlemler</span>
            </div>

            {
                filteredMembers?.map((member) => (
                    <LeaderMemberBox key={member.uid} member={member} />
                ))
            }




        </div>
    )
}

export default LeaderMembers