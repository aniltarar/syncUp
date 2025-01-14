import React, { useEffect, useRef, useState } from 'react';
import { useAccount } from '../../../hooks/useAccount';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs } from '../../../redux/slices/adminSlice';
import ClubBox from '../../../components/Admin/Clubs/ClubBox';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import autoAnimate from '@formkit/auto-animate';

const AdminClubs = () => {
  const user = useAccount();
  const dispatch = useDispatch();
  const { clubs } = useSelector((state) => state.admin);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredClubs = clubs?.filter((club) => {
    const matchSearch = club.clubName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === 'all' || club.status === status;
    return matchSearch && matchStatus;
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedClubs = filteredClubs?.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.clubName.localeCompare(b.clubName);
    } else {
      return b.clubName.localeCompare(a.clubName);
    }
  });
  const clubsContainerRef = useRef(null);

  useEffect(() => {
    if (clubsContainerRef.current) {
      autoAnimate(clubsContainerRef.current);
    }

  }, [clubsContainerRef])
  useEffect(() => {
    dispatch(getClubs());
  }, [dispatch]);

  return (
    <div className="flex flex-col  gap-y-5">
      <div className="bg-neutral-100 p-3 rounded-lg flex flex-row items-center justify-between gap-y-2">
        <div>
          <h1 className="text-2xl font-semibold">Kulüp Yönetim Paneli</h1>
          <p className="text-sm">
            Tüm kulüpleri görüntüleyebilir, durumlarını kontrol edebilir ve detaylı bilgilere ulaşabilirsiniz.
          </p>
        </div>
        <div className="text-xl flex items-center gap-x-2 animate-pulse">
          <span className="text-2xl font-semibold text-primary">{sortedClubs?.length}</span> Kulüp Mevcut
        </div>
      </div>

      <div className="bg-neutral-100 p-3 rounded-lg shadow">
        <div className="grid grid-cols-3 gap-3 items-center">
          <input
            type="text"
            placeholder="Kulüp Adı Ara..."
            className="col-span-2 px-2 py-1 outline-none rounded-lg border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="col-span-1 px-2 py-1 rounded-lg border"
          >
            <option value="all">Tümü</option>
            <option value="active">Aktif</option>
            <option value="passive">Pasif</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 bg-neutral-100 p-3 rounded-lg shadow font-semibold">
        <span onClick={toggleSortOrder} className="cursor-pointer flex items-center gap-x-3 justify-self-start">
          Kulüp Adı {sortOrder === 'asc' ? <FaSortAlphaDown size={20} /> : <FaSortAlphaDownAlt size={20} />}
        </span>
        <span className="justify-self-start">Açıklama</span>
        <span className="justify-self-center">Liderler</span>
        <span className="justify-self-center">Üye Sayısı</span>
        <span className="justify-self-center">Etkinlik Sayısı</span>
        <span className="justify-self-center">Durum</span>
      </div>
      
         {
          clubs?.length === 0 && (
            <div className='text-center text-lg text-gray-500'>
              Henüz kulüp oluşturulmamış.
            </div>
          )
        }
      

      <div ref={clubsContainerRef} className='flex flex-col gap-y-3'>

        {sortedClubs?.map((club) => (
          <ClubBox key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default AdminClubs;
