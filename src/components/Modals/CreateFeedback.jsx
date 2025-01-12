import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form';
import { useAccount } from '../../hooks/useAccount';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { createFeedback } from '../../redux/slices/feedbackSlice';
import toast from 'react-hot-toast';

const CreateFeedback = ({ setIsOpen }) => {

    const modalRoot = document.getElementById("modal-root");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = useAccount()
    const dispatch = useDispatch()

    const onUpdateSubmit = async (data) => {

        if (!user) {
            toast.error('Kullanıcı Bulunamadı')
            return;
        }

        const feedbackData = {
            userID: user.uid,
            createdAt: dayjs().toDate(),
            status: 'pending',
            ...data
        }
        dispatch(createFeedback(feedbackData))
        setIsOpen(false)
    }

  


    return createPortal(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg shadow-lg w-1/2  p-6'>
                <div className='flex flex-col gap-y-3'>
                    <div className='flex justify-between items-center mb-4 border-b pb-2'>
                        <h2 className='text-xl font-semibold '>Geri Bildirim Oluştur</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onUpdateSubmit)} className='flex flex-col gap-y-4 w-full justify-between'>
                        <div className='flex flex-col gap-y-2'>
                            <label className=' text-gray-500' htmlFor="title">Başlık*</label>
                            <input
                                {...register("title", {
                                    required: "Geri Bildirim Başlığı Zorunludur",
                                    minLength: {
                                        value: 5,
                                        message: "En az 5 karakter olmalıdır."
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "En fazla 50 karakter olmalıdır."
                                    }
                                })}
                                type="text"
                                placeholder="Başlık"
                                id='title'
                                className="border p-2 rounded-md"
                            />
                            {errors.title && <span className='text-red-500'>{errors.title.message}</span>}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className=' text-gray-500' htmlFor="description">Açıklama*</label>

                            <textarea
                                id='description'
                                {...register("description", {
                                    required: "Geri Bildirim Açıklaması Zorunludur.",
                                    minLength: {
                                        value: 20,
                                        message: "En az 20 karakter olmalıdır."
                                    },
                                    maxLength: {
                                        value: 200,
                                        message: "En fazla 200 karakter olmalıdır."
                                    }
                                })}
                                placeholder="Açıklama"
                                className="border p-2 rounded-md max-h-44 min-h-20"
                            />
                            {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
                        </div>

                        <div className='flex justify-end gap-x-3 mt-auto '>

                            <button type="submit" className='bg-primary py-2 rounded-md  text-white w-32 hover:bg-primary-hover'>Gönder</button>
                            <button onClick={() => setIsOpen(false)} className='bg-gray-500 py-2 rounded-md  text-white w-32 hover:bg-gray-600'>Vazgeç</button>
                        </div>

                    </form>


                </div>
            </div>
        </div>
        , modalRoot
    )
}

export default CreateFeedback