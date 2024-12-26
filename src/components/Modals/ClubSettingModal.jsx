import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateClubByClubID } from '../../redux/slices/leaderSlice';

const ClubSettingModal = ({ club, setIsEditOpen }) => {
    const modalRoot = document.getElementById("modal-root");
    const { register, handleSubmit ,formState: { errors } } = useForm();

    const defaultValues = {
        clubName: club.clubName,
        clubDescription: club.clubDescription,
        clubLogo: club.clubLogo,
    };

    const dispatch = useDispatch();

    const onUpdateSubmit = async (data) => {

        let updatedClubLogo = club.clubLogo;
        if(data.clubLogo[0]){
            const file = data.clubLogo[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'syncUpMedia');
            formData.append('cloud_name', 'dqc5gegkm');
            const response = await fetch(" https://api.cloudinary.com/v1_1/dqc5gegkm/image/upload", {
                method: "POST",
                body: formData
            });
            const fileData = await response.json();
            updatedClubLogo = fileData.url;
        }

        const clubData = {
            id: club.id,
            clubName: data.clubName,
            clubDescription: data.clubDescription,
            clubLogo: updatedClubLogo,
            leaders: club.leaders,
        };

        dispatch(updateClubByClubID(clubData));
        setIsEditOpen(false);
       
    };

    return createPortal(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg shadow-lg w-1/2 p-6'>
                <div className='flex flex-col gap-y-3 '>
                    <div className='flex justify-between items-center mb-4 border-b pb-2'>
                        <h2 className='text-xl font-semibold '>Kulüp Bilgilerini Düzenle</h2>
                        <button
                            onClick={() => setIsEditOpen(false)}
                            className="text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <form className='flex flex-col gap-y-3' onSubmit={handleSubmit(onUpdateSubmit)}>

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='clubName' className='font-semibold'>Kulüp Adı</label>
                            <input
                                type='text'
                                id='clubName'
                                {...register('clubName')}
                                className='border border-gray-200 rounded-md p-2'
                                defaultValue={defaultValues.clubName}
                            />
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='clubDescription' className='font-semibold'>Kulüp Açıklaması</label>
                            <textarea
                                id='clubDescription'
                                {...register('clubDescription')}
                                className='border border-gray-200 rounded-md p-2 min-h-32 max-h-60'
                                defaultValue={defaultValues.clubDescription}
                            />
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='clubLogo' className='font-semibold'>Kulüp Logosu</label>
                            <input
                                type='file'
                                id='clubLogo'
                                {...register('clubLogo')}
                                className='border border-gray-200 rounded-md p-2'
                            />
                        </div>

                        <div className='flex items-center justify-center gap-x-5 mt-4'>
                            <button type='button' onClick={() => setIsEditOpen(false)} className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600'>
                                Vazgeç
                            </button>
                            <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>
                                Güncelle
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default ClubSettingModal;
