import dayjs from 'dayjs';
import React from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createAnnouncement } from '../../redux/slices/leaderSlice';



const LeaderCreateAnnouncement = ({ setIsOpen, club }) => {

    const modalRoot = document.getElementById('modal-root')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const announcementSubmit = async (data) => {

        const file = data.announcementImage[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'syncUpMedia');
        formData.append('cloud_name', 'dqc5gegkm');
        const response = await fetch(" https://api.cloudinary.com/v1_1/dqc5gegkm/image/upload", {
            method: "POST",
            body: formData
        });
        const fileData = await response.json();

        const announcementData = {
            title: data.title,
            content: data.content,
            announcementImage: fileData.url,
            clubID: club.id,
            publisher: club.clubName,
            createdAt: dayjs().toDate(),
            createdBy: club.leaders,
            clubName: club.clubName,
        }
        dispatch(createAnnouncement(announcementData))
        setIsOpen(false);
    }


    return createPortal(

        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg w-1/3'>

                <h1 className='text-2xl font-semibold'>{club.clubName} - Duyuru Oluştur</h1>
                <hr className='my-4' />
                <form onSubmit={handleSubmit(announcementSubmit)}>
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="title" className='font-semibold'>Duyuru Başlığı</label>
                            <input type="text" id="title" {...register('title', { required: true })} className='border border-gray-300 rounded-lg p-2' />
                            {errors.title && <span className='text-red-500'>Bu alan zorunludur</span>}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label>Duyuru Resmi</label>
                            <input
                                type="file"
                                {...register("announcementImage", {
                                    required: "Duyuru Görseli Eklemek Zorunludur."
                                })}
                                className='p-2 border rounded-lg   '
                            />
                            {errors.announcementImage && <p className="text-red-500 text-sm">{errors.announcementImage.message}</p>}

                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="content" className='font-semibold'>Duyuru İçeriği</label>
                            <textarea id="content" {...register('content', { required: true })} className='border border-gray-300 rounded-lg p-2 min-h-24 max-h-56'></textarea>
                            {errors.content && <span className='text-red-500'>Bu alan zorunludur</span>}
                        </div>
                        <div className='flex justify-end gap-x-4'>
                            <button type='button' onClick={() => setIsOpen(false)} className='p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>İptal</button>
                            <button type='submit' className='p-2 bg-primary rounded-lg text-white hover:bg-primary-hover'>Oluştur</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
        ,
        modalRoot
    )
}

export default LeaderCreateAnnouncement