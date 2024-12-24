import React from 'react'
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { updateAnnouncement } from '../../redux/slices/leaderSlice';
import { useDispatch } from 'react-redux';

const LeaderAnnouncementEditModal = ({ setIsEdit, announcement }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id, title, content, announcementImage, status, clubID } = announcement;
    const modalRoot = document.getElementById('modal-root')
    const dispatch = useDispatch();

    const onUpdateSubmit = async (data) => {
        let updatedImage = announcementImage; // Mevcut resmi varsayılan olarak belirleyin

        if (data?.announcementImage?.[0]) {
            try {
                const file = data.announcementImage[0];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'syncUpMedia');
                formData.append('cloud_name', 'dqc5gegkm');

                const response = await fetch("https://api.cloudinary.com/v1_1/dqc5gegkm/image/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    console.error("Cloudinary API hatası:", response.statusText);
                    return;
                }

                const fileData = await response.json();
                updatedImage = fileData.url; // Yeni yüklenen resmi kullan
            } catch (error) {
                console.error("Resim yükleme sırasında bir hata oluştu:", error);
                return;
            }
        }
        const updatedData = {
            id,
            clubID,
            title: data.title,
            content: data.content,
            announcementImage: updatedImage, // Yeni veya mevcut resmi ayarla
            status: "active",
        };

        dispatch(updateAnnouncement(updatedData));
        setIsEdit(false);
    };

    return createPortal(
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg w-1/3  flex flex-col gap-y-4'>

                <form className='flex flex-col gap-y-4 h-full' onSubmit={handleSubmit(onUpdateSubmit)}>
                    <h1 className='text-2xl font-semibold'>Duyuru Düzenle</h1>
                    <hr />

                    <label htmlFor='title'>Duyuru Başlığı</label>
                    <input
                        type='text'
                        className='border border-gray-300 rounded-md p-2'
                        defaultValue={title}
                        id='title'
                        {...register('title',)}
                    />
                    {errors.title && <span className='text-red-500'>Bu alan zorunludur</span>}

                    <label htmlFor='content'>Duyuru İçeriği</label>
                    <textarea
                        className='border border-gray-300 rounded-md p-2 min-h-32 max-h-64'
                        defaultValue={content}
                        id='content'
                        {...register('content', { maxLength: { value: 500, message: 'En fazla 500 karakter olabilir' }, minLength: { value: 30, message: 'En az 30 karakter olabilir' } })}
                    />
                    {errors.content && <span className='text-red-500'>Bu alan zorunludur</span>}

                    <input
                        type='file'
                        className='border border-gray-300 rounded-md p-2'
                        {...register('announcementImage',)}
                    />
                    {errors.announcementImage && <span className='text-red-500'>Bu alan zorunludur</span>}

                    <div className='flex justify-end gap-x-2'>
                        <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600'>Kaydet</button>
                        <button onClick={() => setIsEdit(false)} className='bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-600'>İptal</button>
                    </div>
                </form>


            </div>
        </div>
        ,
        modalRoot
    )
}

export default LeaderAnnouncementEditModal