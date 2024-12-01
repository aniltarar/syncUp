import React from 'react'
import { useAdmin } from '../../../hooks/useAdmin'
import { useSelector } from 'react-redux';
import { useAccount } from '../../../hooks/useAccount';
import { FaUsers, FaBullhorn } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { FaPeopleRoof, FaClipboardCheck, FaArrowTrendUp, FaCalendarDay } from "react-icons/fa6";




const TopSection = ({ user, applies ,clubs}) => {

  const filteredPendingApplies = applies?.filter(apply => apply.status === 'pending');


  return (
    <>
      <div className="w-full bg-neutral-100 p-3 rounded-lg">
        <h1 className='text-2xl'>Hoş Geldiniz, <span className='text-primary font-semibold'>{user?.displayName}</span> </h1>
        <p>Hızlı erişim paneli üzerinden uygulamanızın genel durumunu kontrol edebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-3 grid-rows-2  gap-5">

        <div className='border shadow p-3 bg-neutral-100 rounded-md '>

          <div className=' flex items-center justify-between border-b-2 mb-4'>
            <h2 className='text-2xl  text-black'>Toplam Kullanıcı Sayısı</h2>
            <FaUsers size={22} className='text-primary' />
          </div>

          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full ">
            <span className='text-3xl font-bold text-primary'>123</span>
            <span className='text-xl'>Aktif Kullanıcı</span>
          </div>

        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2  mb-4'>
            <h2 className='text-2xl text-black'>Toplam Kulüp Sayısı</h2>
            <FaPeopleRoof size={22} className='text-primary' />
          </div>
          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full">
            <span className='text-3xl font-bold text-primary'>{clubs?.length}</span>
            <span className='text-xl'>Aktif Kulüp</span>
          </div>
        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2  mb-4'>
            <h2 className='text-2xl text-black'>Toplam Etkinlik Sayısı</h2>
            <FaCalendarDay size={22} className='text-primary' />
          </div>
          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full">
            <span className='text-3xl font-bold text-primary'>20</span>
            <span className='text-xl'>Aktif Etkinlik</span>
          </div>
        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2  mb-4'>
            <h2 className='text-2xl text-black'>Toplam Duyuru Sayısı</h2>
            <FaBullhorn size={22} className='text-primary' />
          </div>
          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full">
            <span className='text-3xl font-bold text-primary'>46</span>
            <span className='text-xl'>Aktif Duyuru</span>
          </div>
        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2  mb-4'>
            <h2 className='text-2xl text-black'>Toplam Geri Bildirim Sayısı</h2>
            <MdFeedback size={22} className='text-primary' />
          </div>
          <div className="flex items-center gap-x-3 bg-white p-3 rounded-lg w-full">
            <span className='text-3xl font-bold text-primary'>26</span>
            <span className='text-xl'>Aktif Geri Bildirim</span>
          </div>
        </div>

        <div className='border shadow p-3 bg-neutral-100 rounded-md'>
          <div className=' flex items-center justify-between border-b-2  mb-4'>
            <h2 className='text-2xl text-black'>Bekleyen Kulüp Onayları</h2>
            <FaClipboardCheck size={22} className='text-primary' />
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-lg  ">
            <div className='flex items-center justify-between gap-x-3'>

              <span className='text-3xl font-bold text-primary '>{filteredPendingApplies?.length}</span>
              <span className='text-xl'>Bekleyen Kulüp</span>
            </div>
            <button className='px-4 py-2 bg-primary rounded-lg hover:bg-primary-hover'>İncele</button>
          </div>
        </div>
      </div>
    </>
  )
}

const MidSection = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {/* Sol taraf: Popüler kulüpler listesi */}
        <div className="flex flex-col bg-neutral-100 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl  font-semibold text-black">En Popüler Kulüpler</span>
            <FaArrowTrendUp size={30} className="text-primary" />
          </div>
          <ul className="space-y-3">
            {["Kulüp 1", "Kulüp 2", "Kulüp 3", "Kulüp 4", "Kulüp 5"].map((club, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-lg font-medium">{club}</span>
                <span className="text-sm text-gray-500">10 üye</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ taraf: Tamamlanan Son Etkinlikler */}
        <div className="flex flex-col bg-neutral-100 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-semibold text-primary">Tamamlanan Son Etkinlikler</span>
            <FaCalendarDay size={30} className="text-primary" />
          </div>
          <ul className="space-y-3">
            {[
              { name: "Etkinlik 1", date: "27 Kasım 2024", status: "Başarılı" },
              { name: "Etkinlik 2", date: "25 Kasım 2024", status: "Başarılı" },
              { name: "Etkinlik 3", date: "20 Kasım 2024", status: "Başarılı" },
              { name: "Etkinlik 4", date: "15 Kasım 2024", status: "İptal Edildi" },
            ].map((event, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-lg font-medium">{event.name}</span>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
                <span
                  className={`text-sm font-medium ${event.status === "Başarılı" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {event.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>





    </>)
};

const HomeDash = () => {
  // Servisler
  const user = useAccount();
  useAdmin();
// Redux Stateler
const { applies,clubs } = useSelector((state) => state.admin);



  return (
    <div className='p-3 flex flex-col gap-y-5'>

      <TopSection user={user} applies={applies} clubs={clubs} />
      <MidSection />
    </div>
  )
}

export default HomeDash;
