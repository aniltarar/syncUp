import React, { useEffect, useRef, useState } from 'react';
import { getFeedbacks } from '../../../redux/slices/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from '../../../hooks/useAccount';
import AdminFeedbackBox from '../../../components/Admin/AdminFeedback/AdminFeedbackBox';
import autoAnimate from '@formkit/auto-animate';

const AdminFeedbacks = () => {
  const dispatch = useDispatch();
  const { feedbacks } = useSelector(state => state.admin);
  const user = useAccount();

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('all');
  const [sortDate, setSortDate] = useState('newest');

  useEffect(() => {
    dispatch(getFeedbacks());
  }, [dispatch]);

  const filteredFeedbacks = feedbacks
    ?.filter(feedback => {
      return (
        feedback.title.toLowerCase().includes(search.toLowerCase()) ||
        feedback.description.toLowerCase().includes(search.toLowerCase())
      );
    })
    .filter(feedback => {
      if (sortOrder === 'pending') return feedback.status === 'pending';
      if (sortOrder === 'success') return feedback.status === 'success';
      return true; // Tümü
    });

  const sortedFeedbacks = filteredFeedbacks?.sort((a, b) => {
    if (sortDate === 'newest') {
      return new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate());
    } else {
      return new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate());
    }
  });

  const feedbackBoxRef = useRef(null);

  useEffect(() => {
    if (feedbackBoxRef.current) {
      autoAnimate(feedbackBoxRef.current, { duration: 500 });
    }
  }, [sortedFeedbacks]);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="w-full flex items-center justify-between bg-neutral-100 p-3 rounded-lg">
        <div>
          <h1 className="text-2xl">
            Hoş Geldiniz, <span className="text-primary font-semibold">{user?.displayName}</span>
          </h1>
          <p>
            Geribildirimler ile ilgili detayları buradan görebilirsiniz. Seçtiğiniz geribildirimlere yanıt verip
            durumlarını güncelleyebilirsiniz.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
        <input
          onChange={e => setSearch(e.target.value)}
          type="text"
          placeholder="Duyuru ara"
          className="border col-span-3 p-2 rounded-md"
        />
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border p-2 rounded-md col-span-1"
        >
          <option value="all">Tümü</option>
          <option value="pending">Beklemede</option>
          <option value="success">Çözümlenmiş</option>
        </select>

        <select
          value={sortDate}
          onChange={e => setSortDate(e.target.value)}
          className="border p-2 rounded-md col-span-1"
        >
          <option value="newest">Yeniden Eskiye</option>
          <option value="oldest">Eskiden Yeniye</option>
        </select>
      </div>

      <div>
        {(sortedFeedbacks?.length < 1 && feedbacks?.length>0) && (
          <div className="text-center text-2xl bg-red-100 text-red-500 p-3 rounded-lg">
            Belirlediğiniz koşullarda geribildirim bulunmamaktadır.
          </div>
        )}
      </div>

      {
        (feedbacks?.length === 0) && (
          <div className='text-center text-lg text-gray-500'>
            Henüz geri bildirim oluşturulmamış.
          </div>
        )
      }


      <div ref={feedbackBoxRef} className="flex flex-col gap-y-3">
        {sortedFeedbacks?.map((feedback, index) => (
          <AdminFeedbackBox key={index} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default AdminFeedbacks;
