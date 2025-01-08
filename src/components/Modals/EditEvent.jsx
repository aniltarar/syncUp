import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { updateEvent } from '../../redux/slices/leaderSlice'; // Assuming you have an updateEvent action
import { useForm } from 'react-hook-form';

const EditEvent = ({ event, setIsEditOpen }) => {
    const modalRoot = document.getElementById("modal-root");

    const formattedEventDate = event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 16) : '';

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            eventName: event.eventName,
            eventDate: formattedEventDate,
            eventLocation: event.eventLocation,
            eventDescription: event.eventDescription,
            clubID: event.clubID,
            eventCapacity: event.eventCapacity,
        }
    });

    const [personCount, setPersonCount] = useState(event.eventCapacity || 5);

    const dispatch = useDispatch();

    const onUpdateSubmit = async (data) => {

        const updatedEvent = {
            ...data,
            id: event.id,
            clubName: event.clubName,
            leaders: event.leaders,
            status: event.status,
            eventDate: data.eventDate,
            eventCapacity: personCount,
            status: "pending"
        };

        dispatch(updateEvent(updatedEvent));
        setIsEditOpen(false);
    }

    const minDateTime = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16);

    return createPortal(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg shadow-lg w-1/2 p-6'>
                <div className='flex flex-col gap-y-3'>
                    <div className='flex justify-between items-center mb-4 border-b pb-2'>
                        <h2 className='text-xl font-semibold '>Etkinliği Düzenle</h2>
                        <button
                            onClick={() => setIsEditOpen(false)}
                            className="text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onUpdateSubmit)} className='flex flex-col gap-y-4'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='eventName' className='text-sm font-medium'>Etkinlik Adı</label>
                            <input
                                type='text'
                                id='eventName'
                                {...register('eventName', {
                                    required: "Etkinlik adı zorunludur",
                                    minLength: {
                                        value: 5,
                                        message: "Etkinlik adı en az 5 karakter olmalıdır"
                                    }
                                })}
                                className='border border-gray-300 rounded-md px-3 py-2'
                            />
                            {errors.eventName && <span className='text-red-500 text-xs'>{errors.eventName.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='eventDate' className='text-sm font-medium'>Etkinlik Tarihi</label>
                            <input
                                type='datetime-local'
                                id='eventDate'
                                {...register('eventDate', { required: "Etkinlik tarihi zorunludur" })}
                                defaultValue={formattedEventDate}
                                min={minDateTime}
                                className='border border-gray-300 rounded-md px-3 py-2'
                            />
                            {errors.eventDate && <span className='text-red-500 text-xs'>{errors.eventDate.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='eventLocation' className='text-sm font-medium'>Etkinlik Konumu</label>
                            <input
                                type='text'
                                id='eventLocation'
                                {...register('eventLocation', {
                                    required: "Etkinlik konumu zorunludur",
                                    maxLength: {
                                        value: 30,
                                        message: "Etkinlik konumu en fazla 30 karakter olabilir"
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "Etkinlik konumu en az 5 karakter olmalıdır"
                                    }
                                })}
                                className='border border-gray-300 rounded-md px-3 py-2'
                            />
                            {errors.eventLocation && <span className='text-red-500 text-xs'>{errors.eventLocation.message}</span>}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='eventDescription' className='text-sm font-medium '>Etkinlik Detayı</label>
                            <textarea
                                id='eventDescription'
                                {...register('eventDescription', {
                                    required: "Etkinlik detayı zorunludur",
                                    maxLength: {
                                        value: 400,
                                        message: "Etkinlik detayı en fazla 400 karakter olabilir"
                                    },
                                    minLength: {
                                        value: 30,
                                        message: "Etkinlik detayı en az 30 karakter olmalıdır"
                                    }
                                })}
                                className='border border-gray-300 rounded-md px-3 py-2 min-h-32 max-h-60'
                            />
                            {errors.eventDescription && <span className='text-red-500 text-xs'>{errors.eventDescription.message}</span>}
                        </div>

                        {/* Kişi Sayısı Input ve Range */}
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='eventCapacity' className='text-sm font-medium'>Etkinlik Kapasitesi</label>
                            <input
                                type='number'
                                id='eventCapacity'
                                value={personCount}
                                onChange={(e) => setPersonCount(e.target.value)}
                                min={5} // Minimum kapasite
                                max={100} // Maximum kapasite
                                className='border border-gray-300 rounded-md px-3 py-2'
                            />
                            <input
                                type='range'
                                min={5}
                                max={100}
                                value={personCount}
                                onChange={(e) => setPersonCount(e.target.value)}
                                className='w-full'
                            />
                            <span className='text-sm text-gray-500'>{personCount} kişi</span>
                        </div>

                        <button type='submit' className='bg-primary text-white rounded-md py-2 px-4 hover:bg-primary-hover'>
                            Etkinliği Güncelle
                        </button>
                    </form>
                </div>

                <div className='flex flex-col gap-y-4 mt-3'>
                    <div className='flex items-center justify-center gap-x-5'>
                        <button onClick={() => setIsEditOpen(false)} className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600'>
                            Vazgeç
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
}

export default EditEvent;
