import React from 'react'
import { IoCloseSharp } from 'react-icons/io5';

const ClubDetail = ({ club, setIsOpen }) => {
    const modalRoot = document.getElementById("modal-root");

    const { clubName, clubLogo, events, members, clubDescription } = club


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white rounded-lg shadow-lg w-1/2  p-6">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{clubName}</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-black text-lg"
                    >
                        <IoCloseSharp size={20} />
                    </button>
                </div>

                <div className='flex gap-x-3  items-center justify-between w-full border-b '>
                 <img src={clubLogo} className='w-52 h-52' alt="" />
                 <p>{clubDescription}</p>
                </div>

                <div>
                    <h3 className="text-lg font-medium">Üyeler</h3>
                    <p>{members.length} Üye</p>
                </div>



            </div>
        </div>

    )
}

export default ClubDetail