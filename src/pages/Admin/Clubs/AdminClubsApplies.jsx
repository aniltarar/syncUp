import React, { useEffect, useState } from 'react'
import { useAdmin } from '../../../hooks/useAdmin'
import { useDispatch, useSelector } from 'react-redux';
import ApplyBox from '../../../components/Admin/ClubApplies/ApplyBox';
import { useAccount } from '../../../hooks/useAccount';
import { getApplies } from '../../../redux/slices/adminSlice';

const AdminClubsApplies = () => {

  
  useAdmin();
  const { applies } = useSelector((state) => state.admin);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const user = useAccount();



  const filteredApplies = applies?.filter(apply => {
  
    const matchSearch = apply.clubName.toLowerCase().includes(search.toLowerCase()) || apply.createdByName.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status==="all" || apply.status === status;

    return matchSearch && matchStatus;
  }
  )


  
  // Kulüp Adı , Açıklaması , Başvuran Kişi, Logo , İşlemler

  return (
    <div className='p-3 flex flex-col gap-y-3'>
      <div className="w-full bg-neutral-100 p-3 rounded-lg">
        <h1 className='text-2xl'>Hoş Geldiniz, <span className='text-primary font-semibold'>{user?.displayName}</span> </h1>
        <p>Kulüp Onayları paneli üzerinden başvuru yapılan kullanıcılar tarafından açılmak istenilen kulüpleri ve datayları görüntüleyebilirisiniz.</p>
      </div>

      <div className='flex items-center justify-between gap-x-3'>
        <input type="text" placeholder='Kulüp Adı, Başvuran Kişi' className='px-2 py-1 outline-none w-full rounded-lg' value={search} onChange={(e)=>setSearch(e.target.value)} />
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className='w-1/6 px-2 py-1 rounded-lg '>
          <option value="all">Tümü</option>
          <option value="pending">Beklemede</option>
          <option value="success">Onaylanmış</option>
          <option value="rejected">Reddedilmiş</option>
        </select>
      </div>

      <div className='grid grid-cols-6 bg-neutral-100 p-3 rounded-lg  shadow '>
        <span >Kulüp Adı</span>
        <span >Açıklama</span>
        <span >Başvuran Kişi</span>
        <span >Logo</span>
        <span>Durum</span>
        <span >İşlemler</span>
      </div>
      {
        filteredApplies?.map((apply,index) => (
          <ApplyBox key={index} apply={apply} />
        ))
      }



    </div>
  )
}

export default AdminClubsApplies