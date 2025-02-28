
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../redux/slices/leaderSlice';


const CreateEvent = ({ clubs, setIsOpen }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [personCount, setPersonCount] = useState(5);

    const modalRoot = document.getElementById("modal-root");
    const dispatch = useDispatch();

    const createOnSubmit = async (data) => {


        const file = data.eventImage[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'syncUpMedia');
        formData.append('cloud_name', 'dqc5gegkm');
        const response = await fetch(" https://api.cloudinary.com/v1_1/dqc5gegkm/image/upload", {
            method: "POST",
            body: formData
        });
        const fileData = await response.json();

        
        const eventData = {
            eventName: data.eventName,
            eventDescription: data.eventDescription,
            eventLocation: data.eventLocation,
            eventDate: data.eventDate,
            eventCapacity: Number(personCount),
            eventImage: fileData.secure_url,
            clubID: data.clubID,
            clubName: clubs.find(club => club.id === data.clubID).clubName,
            leaders: clubs.find(club => club.id === data.clubID).leaders,
            status: "pending",
            participants: []
        }

        dispatch(createEvent(eventData));
        setIsOpen(false);

    }

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 overflow-y-auto sm:max-w-5xl">
                <div className='flex flex-col gap-y-6'>

                    {/* header */}
                    <div className="flex justify-between items-center mb-4 border-b">
                        <h2 className="text-xl font-semibold">Etkinlik Oluştur</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-black text-lg"
                        >
                            &times;
                        </button>
                    </div>

                    {/* content */}
                    <form onSubmit={handleSubmit(createOnSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>

                        <div className='flex flex-col gap-y-2'>
                            <label>Etkinlik Adı</label>
                            <input type="text"
                                placeholder='Etkinlik Adını Giriniz.'
                                {...register("eventName", {
                                    required: "Etkinlik Adı Girmek Zorunludr.",
                                    maxLength: { value: 50, message: "Etkinlik adı en fazla 50 karakter olabilir." },
                                    minLength: { value: 5, message: "Etkinlik adı minimum 5 karakter olmalıdır." }
                                })}
                                className='p-2 border rounded-lg' />
                            {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName.message}</p>}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label>Etkinlik Konumu</label>
                            <input type="text"
                                placeholder='Etkinliğin Yapılacağı Yeri Giriniz.'
                                {...register("eventLocation", {
                                    required: "Etkinlik Konumu Girmek Zorunludr.",
                                    maxLength: { value: 50, message: "Etkinlik konumu en fazla 50 karakter olabilir." },
                                    minLength: { value: 5, message: "Etkinlik konumu minimum 5 karakter olmalıdır." }
                                })}
                                className='p-2 border rounded-lg' />
                            {errors.eventLocation && <p className="text-red-500 text-sm">{errors.eventLocation.message}</p>}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label>Etkinlik Tarihi</label>
                            <input
                                type="datetime-local"
                                min={new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 saat ekle
                                    .toISOString()
                                    .slice(0, 16)} // Tarihi YYYY-MM-DDTHH:MM formatında ayır
                                {...register("eventDate", {
                                    required: "Etkinlik Tarihi Girmek Zorunludur.",
                                    validate: value => {
                                        const nowPlus6Hours = new Date(Date.now() + 6 * 60 * 60 * 1000);
                                        const selectedDate = new Date(value);
                                        return selectedDate >= nowPlus6Hours || "Etkinlik tarihi en erken 6 saat sonrası olmalıdır.";
                                    }
                                })}
                                className='p-2 border rounded-lg'
                            />
                            {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate.message}</p>}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label>Etkinlik Kapasitesi</label>
                            <input
                                type="number"
                                placeholder='Etkinlik Katılımcı Sayısını Giriniz.'
                                onChange={(e) => setPersonCount(e.target.value)}
                                className='p-2 border rounded-lg'
                                value={personCount}
                            />
                            <input
                                type="range"
                                min={5}
                                max={100}
                                step={1}
                                value={personCount}
                                onChange={(e) => setPersonCount(e.target.value)}
                            />
                            {personCount > 100 && <p className="text-red-500 text-sm">Etkinlik kapasitesi en fazla 100 olabilir.</p>}
                            {personCount < 5 && <p className="text-red-500 text-sm">Etkinlik kapasitesi en az 5 olabilir.</p>}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label>Etkinlik Resmi</label>
                            <input
                                type="file"
                                {...register("eventImage", {
                                    required: "Etkinlik Resmi Eklemek Zorunludur."
                                })}
                                className='p-2 border rounded-lg'
                            />
                            {errors.eventImage && <p className="text-red-500 text-sm">{errors.eventImage.message}</p>}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label>Kulüp Seçiniz</label>
                            <select
                                {...register("clubID", {
                                    required: "Kulüp Seçmek Zorunludur."
                                })}
                                className='p-2 border rounded-lg'
                            >
                                {clubs.map((club) => (
                                    <option key={club.id} value={club.id}>{club.clubName}</option>
                                ))}
                            </select>
                            {errors.clubId && <p className="text-red-500 text-sm">{errors.clubId.message}</p>}
                        </div>

                        {/* Etkinlik Detayı en altta geniş şekilde yerleştirildi */}
                        <div className='flex flex-col gap-y-2 col-span-2'>
                            <label>Etkinlik Detayı</label>
                            <textarea
                                placeholder='Etkinliği Kısaca Anlatın.'
                                {...register("eventDescription", {
                                    required: "Etkinlik Detayı Girmek Zorunludr.",
                                    maxLength: { value: 400, message: "Etkinlik detayları en fazla 400 karakter olabilir." },
                                    minLength: { value: 30, message: "Etkinlik detayları minimum 30 karakter olmalıdır." }
                                })}
                                className='p-2 border rounded-lg max-h-40' // max-h-40 ile yüksekliği sınırlıyoruz
                            />
                            {errors.eventDescription && <p className="text-red-500 text-sm">{errors.eventDescription.message}</p>}
                        </div>

                        <div className='col-span-2 flex  items-end justify-end gap-2 '>
                            <button
                                type='submit'
                                className="w-44 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 "
                            >
                                Kaydet
                            </button>

                            <button type='button' onClick={() => setIsOpen(false)} className='w-44 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600'>
                                Vazgeç
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default CreateEvent;