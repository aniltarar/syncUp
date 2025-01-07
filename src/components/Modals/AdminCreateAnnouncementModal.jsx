import React from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { createAnnouncement } from '../../redux/slices/adminSlice'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'


const AdminCreateAnnouncementModal = ({ setIsOpen }) => {

    const dispatch = useDispatch()
    const modalRoot = document.getElementById('modal-root')

const { register, handleSubmit, formState: { errors } } = useForm();


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
            clubID: "11111",
            publisher: "SyncUp Yönetimi",
            createdAt: dayjs().toDate(),
            status:"active"
        }
        dispatch(createAnnouncement(announcementData))
        setIsOpen(false);
    }



    return createPortal(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg shadow-lg w-1/2  p-6'>
                <div className='w-full flex  items-start justify-between mb-2 '>
                    <div >
                        <h1 className='text-2xl font-semibold'>Yeni Duyuru Oluştur</h1>
                        <p className='text-sm text-neutral-600 mt-2'>Duyurunuzu oluşturun ve yayınlayın</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black text-2xl" >&times;</button>
                </div>
                
                <hr />

                <form onSubmit={handleSubmit(announcementSubmit)}>
                    <div className='flex flex-col gap-y-4 my-2'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="title" className='font-semibold'>Duyuru Başlığı</label>
                            <input type="text" id="title" {...register('title', { required: true })} className='border border-gray-300 rounded-lg p-2' />
                            {errors.title && <span className='text-red-500'>Bu alan zorunludur</span>}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className='font-semibold'>Duyuru Resmi</label>
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
        </div>, modalRoot

    )
}

export default AdminCreateAnnouncementModal