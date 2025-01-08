import React, { useEffect, useRef, useState } from 'react'
import CreateFeedback from '../../components/Modals/CreateFeedback'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from '../../hooks/useAccount'
import { fetchFeedbacksByUserID } from '../../redux/slices/feedbackSlice'
import FeedbackBox from '../../components/Feedback/FeedbackBox'
import autoAnimate from '@formkit/auto-animate'

const Feedback = () => {

    const [search, setSearch] = useState('')
    const [sortOrder, setSortOrder] = useState('all') // Varsayılan sıralama "En Yeni"
    const [isOpen, setIsOpen] = useState(false)
    const { feedbacks } = useSelector(state => state.feedback)


    const filteredFeedbacks = feedbacks?.filter(feedback => {
        return feedback.title.toLowerCase().includes(search.toLowerCase()) || feedback.description.toLowerCase().includes(search.toLowerCase())
    }).filter(feedback => {
        if (sortOrder === 'pending') {
            return feedback.status === 'pending'
        } else if (sortOrder === 'success') {
            return feedback.status === 'success'
        } else if (sortOrder === 'rejected') {
            return feedback.status === 'rejected'
        }
        else {
            return feedback
        }
    }
    )

    const feedbackBoxRef = useRef(null)

    const dispatch = useDispatch()
    const user = useAccount()
    useEffect(() => {
        dispatch(fetchFeedbacksByUserID(user.uid))

    }, [dispatch])

    useEffect(() => {
        if (feedbackBoxRef.current) {
            autoAnimate(feedbackBoxRef.current)
        }
    }, [filteredFeedbacks])



    return (
        <>

            {
                isOpen && <CreateFeedback setIsOpen={setIsOpen} />
            }
            <div className="flex flex-col gap-y-3 mb-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Duyuru ara"
                        className="border col-span-3 p-2 rounded-md"
                    />
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border p-2 rounded-md col-span-1"
                    >
                        <option value="all">Tümü</option>
                        <option value="pending">Beklemede</option>
                        <option value="success">Çözümlenmiş</option>
                        <option value="rejected">Reddedilmiş</option>
                    </select>
                    <button onClick={() => setIsOpen(true)} className='bg-primary py-2 rounded-md text-white hover:bg-primary-hover'>Geri Bildirim Oluştur</button>
                </div>
                {
                    feedbacks?.length < 1 && <div className='text-center text-2xl bg-red-100 text-red-500 p-3 rounded-lg'>Henüz geri bildirim oluşturulmamış.</div>
                }

                <div ref={feedbackBoxRef} className='grid grid-cols-1 gap-3'>
                    {
                        filteredFeedbacks?.map(feedback => (
                            <FeedbackBox key={feedback.id} feedback={feedback} />
                        ))
                    }
                </div>

            </div>


        </>
    )
}

export default Feedback