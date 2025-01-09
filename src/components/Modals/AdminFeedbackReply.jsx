import React from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { replyFeedback } from '../../redux/slices/adminSlice'

const AdminFeedbackReply = ({ feedback, setIsReplyModalOpen }) => {

    const modalRoot = document.getElementById('modal-root')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const replyData = {
            feedbackID: feedback.id,
            reply: data.reply,
            userID: feedback.userID
        }
        dispatch(replyFeedback(replyData))
        setIsReplyModalOpen(false)

    }


    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white rounded-lg shadow-lg w-1/3  p-6">
                {/* header */}
                <div className="flex justify-between items-center mb-4 border-b">
                    <h2 className="text-xl font-semibold">Geri Bildirim Cevapla</h2>
                    <button onClick={()=>setIsReplyModalOpen(false)} className="text-gray-500 hover:text-black text-xl">&times;</button>
                </div>

                {/* content */}
                <div className="flex flex-col gap-y-4 ">
                    <div>
                        <h1 className='text-md font-semibold'>{feedback.title}</h1>
                    </div>
                    <div className='bg-neutral-100 rounded-md p-3'>
                        <h2 className='text-md font-semibold'>Kullanıcın mesajı</h2>
                        <p className='text-sm'>{feedback.description}</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                        <textarea
                            {...register('reply', { required: "Yanıt Vermek Zorunludur", minLength: { value: 10, message: "En az 10 karakter" }, maxLength: { value: 200, message: "Maksimum 200 karakter girilebilir." } })}
                            placeholder='Cevap Yazın'
                            className='border p-2 rounded-md min-h-32 max-h-52'
                        ></textarea>
                        {errors.reply && <span className='text-red-500 text-sm'>{errors.reply.message}</span>}
                        <button className='bg-primary text-white rounded-md p-2'>Gönder</button>
                    </form>
                </div>
            </div>
        </div>,
        modalRoot
    )
}

export default AdminFeedbackReply