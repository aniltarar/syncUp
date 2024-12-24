import React from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux';
import { giveLeadership } from '../../redux/slices/leaderSlice';
import { useParams } from 'react-router-dom';

const LeaderGiveLeadershipModal = ({ member, setIsOpen }) => {
    const modalRoot = document.getElementById('modal-root')
    const dispatch = useDispatch();
     const { clubID } = useParams()
    const handleGiveLeadership = () => {
        const data = {
            clubID,
            newLeaderID: member.uid
        }
        dispatch(giveLeadership(data))
        setIsOpen(false)
    }

    return createPortal(
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg w-1/3 flex flex-col gap-y-4'>
                <h1 className='text-2xl font-semibold'>Liderlik Vermeyi Onaylıyor musunuz ?</h1>
                <hr className='' />
                <div className='flex flex-col gap-y-4'>
                    <p>
                       <span className='font-semibold'>{member.displayName}</span>  isimli kişiye liderlik vermek istediğinizden emin misiniz ?
                    </p>
                </div>
                <div className='flex justify-end gap-x-3'>
                    <button onClick={handleGiveLeadership} className='bg-primary text-white px-4 py-2 rounded-lg mt-4 hover:bg-primary-hover'>Onayla</button>
                    <button onClick={() => setIsOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-600'>Kapat</button>
                </div>
            </div>
        </div>
        ,
        modalRoot

    )
}

export default LeaderGiveLeadershipModal