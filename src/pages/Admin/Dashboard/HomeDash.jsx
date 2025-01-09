import React from 'react'
import { useAdmin } from '../../../hooks/useAdmin'
import { useSelector } from 'react-redux';
import { useAccount } from '../../../hooks/useAccount';
import { FaUsers, FaBullhorn } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { FaPeopleRoof, FaClipboardCheck, FaArrowTrendUp, FaCalendarDay } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import PopulerClubBox from '../../../components/Admin/AdminDashboard/PopulerClubBox';
import LastEventBox from '../../../components/Admin/AdminDashboard/LastEventBox';


const TopSection = ({ user, applies, clubs, users, events, announcements, feedbacks }) => {

  const filteredPendingApplies = applies?.filter(apply => apply.status === 'pending');

  const filteredPendingEvents = events?.filter(event => event.status === 'pending');

  const filteredPendingFeedbacks = feedbacks?.filter(feedback => feedback.status === 'pending');

 


  return (
    <>
      <div className="w-full bg-neutral-100 p-3 rounded-lg">
        <h1 className='text-2xl'>Hoş Geldiniz, <span className='text-primary font-semibold'>{user?.displayName}</span> </h1>
        <p>Hızlı erişim paneli üzerinden uygulamanızın genel durumunu kontrol edebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-3 grid-rows-2  gap-5">

        <div className='border shadow p-3 bg-neutral-100 rounded-md '>

          <div className=' flex items-center justify-between border-b-2 mb-4 pb-2'>
            <h2 className='text-xl  text-black font-semibold'>Toplam Kullanıcı Sayısı</h2>
            <FaUsers size={22} className='text-black' />
          </div>

          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full ">
            <span className='text-3xl font-bold text-primary'>{users.length}</span>
            <span className='text-xl'>Aktif Kullanıcı</span>
          </div>

        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2 pb-2  mb-4'>
            <h2 className='text-xl text-black font-semibold '>Toplam Kulüp Sayısı</h2>
            <FaPeopleRoof size={22} className='text-black' />
          </div>
          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full">
            <span className='text-3xl font-bold text-primary'>{clubs?.length}</span>
            <span className='text-xl'>Aktif Kulüp</span>
          </div>
        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2 pb-2  mb-4'>
            <h2 className='text-xl text-black font-semibold'>Toplam Etkinlik Sayısı</h2>
            <FaCalendarDay size={22} className='text-black' />
          </div>
          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full">
            <span className='text-3xl font-bold text-primary'>{filteredPendingEvents?.length}</span>
            <span className='text-xl'>Aktif Etkinlik</span>
          </div>
        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2 pb-2  mb-4'>
            <h2 className='text-xl text-black font-semibold'>Toplam Duyuru Sayısı</h2>
            <FaBullhorn size={22} className='text-black' />
          </div>
          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full">
            <span className='text-3xl font-bold text-primary'>{announcements.length}</span>
            <span className='text-xl'>Aktif Duyuru</span>
          </div>
        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2 pb-2 mb-4'>
            <h2 className='text-xl text-black font-semibold'>Toplam Geri Bildirim Sayısı</h2>
            <MdFeedback size={22} className='text-black' />
          </div>
          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full">
            <span className='text-3xl font-bold text-primary'>{filteredPendingFeedbacks?.length}</span>
            <span className='text-xl'>Aktif Geri Bildirim</span>
          </div>
        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2 pb-2 mb-4'>
            <h2 className='text-xl text-black font-semibold'>Bekleyen Kulüp Onayları</h2>
            <FaClipboardCheck size={22} className='text-black' />
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-lg  ">
            <div className='flex items-center justify-between gap-x-3'>

              <span className='text-3xl font-bold text-primary '>{filteredPendingApplies?.length}</span>
              <span className='text-xl'>Bekleyen Kulüp Onayı</span>
            </div>
            <Link to="/admin/clubs-applies" className='px-4 py-2 bg-primary rounded-lg hover:bg-primary-hover'>İncele</Link>
          </div>
        </div>
      </div>
    </>
  )
}

const MidSection = ({ clubs, events }) => {

  // kulüpleri üye sayısına göre sırala
  const copyClubs = [...clubs];
  const sortedClubs = copyClubs.sort((a, b) => b.members.length - a.members.length).slice(0, 5);

  // etkinlikleri yeniden eskiye sırala
  const copyEvents = [...events];
  const sortedEvents = copyEvents.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate)).slice(0, 5);

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {/* Sol taraf: Popüler kulüpler listesi */}
        <div className="flex flex-col bg-neutral-100 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl  font-semibold text-black">En Popüler Kulüpler</span>
            <FaArrowTrendUp size={30} className="text-black" />
          </div>
          {/* listeleme */}
          <div className='space-y-3'>
            {
              sortedClubs.length === 0 &&
              <div className='text-center text-lg font-semibold text-gray-500'>Henüz kulüp bulunmamaktadır.</div>
            }

            {
              sortedClubs?.map((club, index) => (
                <PopulerClubBox key={index} club={club} />
              ))
            }
          </div>

        </div>

        {/* Sağ taraf: Tamamlanan Son Etkinlikler */}
        <div className="flex flex-col bg-neutral-100 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-semibold text-black">Son Etkinlikler</span>
            <FaCalendarDay size={30} className="text-black" />
          </div>
          <div className='space-y-3'>

            {
              sortedEvents.length === 0 &&
              <div className='text-center text-lg font-semibold text-gray-500'>Henüz etkinlik bulunmamaktadır.</div>
            }
            {
              sortedEvents?.map((event, index) => (
                <LastEventBox key={index} event={event} />
              ))

            }

          </div>

        </div>
      </div>





    </>)
};

const HomeDash = () => {
  // Servisler
  const user = useAccount();
  useAdmin();
  // Redux Stateler
  const { applies, clubs, users, events, announcements,feedbacks } = useSelector(state => state.admin);



  return (
    <div className=' flex flex-col gap-y-5'>
      <TopSection user={user} applies={applies} clubs={clubs} users={users} events={events} announcements={announcements} feedbacks={feedbacks} />
      <MidSection clubs={clubs} events={events} />
    </div>
  )
}

export default HomeDash;
