import React from 'react'
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { cancelEvent } from '../../redux/slices/leaderSlice';

const CancelledEvent = ({ event, setIsOpen }) => {
    const modalRoot = document.getElementById("modal-root");

    const dispatch = useDispatch();

    const handleCancelEvent = async () => {
        dispatch(cancelEvent(event.id))
        setIsOpen(false)
    }

    return createPortal(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>

            <div className='bg-white rounded-lg shadow-lg w-96  p-6'>
                <div className='flex flex-col gap-y-3'>
                    <div className='flex justify-between items-center mb-4 border-b pb-2'>
                        <h2 className='text-xl font-semibold '>Etkinliği İptal Et</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <div>
                        <span className='font-semibold'>{event?.eventName}</span> adlı etkinliği iptal etmek istediğinize emin misiniz?
                    </div>
                </div>
                <div className='flex flex-col gap-y-4 mt-3'>
                    <div className='flex items-center justify-center  gap-x-5'>

                        <button onClick={handleCancelEvent} className='bg-red-500 flex-1 text-center text-sm  text-white rounded-md py-2 px-4 hover:bg-red-600'>Etkinliği İptal Et</button>
                        <button onClick={() => setIsOpen(false)} className='bg-gray-500 text-center text-sm  text-white rounded-md py-2 px-4 hover:bg-gray-600'>Vazgeç</button>
                    </div>
                </div>
            </div>
        </div>, modalRoot
    )

}

export default CancelledEvent