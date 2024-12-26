import React from 'react'
import { useDispatch } from 'react-redux';

import { useState } from 'react';
import LeaderGiveLeadershipModal from '../Modals/LeaderGiveLeadershipModal';
import LeaderRemoveMemberModal from '../Modals/LeaderRemoveMemberModal';

const LeaderMemberBox = ({ member, leaders }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isRemoveOpen, setIsRemoveOpen] = useState(false)





    return (
        <>
            {
                isOpen && <LeaderGiveLeadershipModal member={member} setIsOpen={setIsOpen} />
            }
            {
                isRemoveOpen && <LeaderRemoveMemberModal member={member} setIsRemoveOpen={setIsRemoveOpen} />
            }

            <div className='grid grid-cols-6 bg-white p-3 rounded-lg shadow border border-neutral-200 items-center'>
                <span className='justify-self-center'>{member.displayName}</span>
                <a className='hover:text-primary justify-self-center' href={`mailto:${member.email}`}>{member.email}</a>
                <a className='hover:text-primary justify-self-center' href={`tel:${member.phoneNumber}`}>{member.phoneNumber}</a>
                <span className='justify-self-center'>{member.faculty}</span>
                <span className='justify-self-center'>{member.department}</span>

                <span className='flex gap-2 justify-self-center'>
                    {
                        leaders?.find((leader) => leader === member.uid) ? <button className=' bg-blue-500 text-white px-4 py-1 rounded-lg w-24 hover:bg-blue-600'>Lider</button> : <button onClick={() => setIsOpen(true)} className='bg-primary text-white  px-4 py-1 rounded-lg w-24 hover:bg-primary-dark'>Üye</button>
                    }

                    <button onClick={() => setIsRemoveOpen(true)} className='bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600'>Kulüpten Çıkar</button>
                </span>

            </div>
        </>
    )
}

export default LeaderMemberBox