import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsByLeaderID, fetchLeaderClubsByUserID } from '../../../redux/slices/leaderSlice';
import { useAccount } from '../../../hooks/useAccount';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import CreateEvent from '../../../components/Modals/CreateEvent';
import LeaderEventBox from '../../../components/Leader/LeaderEventBox';
import autoAnimate from '@formkit/auto-animate';

const LeaderEvents = () => {
  const dispatch = useDispatch();
  const user = useAccount();
  const { clubs, events, } = useSelector((state) => state.leader);

  const [search, setSearch] = useState('');
  const [selectClub, setSelectClub] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Varsayılan sıralama yönü (A-Z)
  const [sortBy, setSortBy] = useState('eventName'); // Varsayılan sıralama alanı
  const [isOpen, setIsOpen] = useState(false); // Modal açma durumu



  const toggleSortOrder = (field) => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc'); // Yeni alan seçildiğinde varsayılan olarak A-Z başlatılır
    }
  };

  const filteredEvents = events
    ?.filter((event) => {
      const matchesSearch =
        event.eventName.toLowerCase().includes(search.toLowerCase()) ||
        event.clubName.toLowerCase().includes(search.toLowerCase());
      const matchesClub = selectClub ? event.clubName === selectClub : true;
      const matchesStatus = selectStatus ? event.status === selectStatus : true;

      return matchesSearch && matchesClub && matchesStatus;
    })
    ?.sort((a, b) => {
      if (sortBy === 'eventName') {
        return sortOrder === 'asc'
          ? a.eventName.localeCompare(b.eventName)
          : b.eventName.localeCompare(a.eventName);
      } else if (sortBy === 'eventDate') {
        return sortOrder === 'asc'
          ? new Date(a.eventDate) - new Date(b.eventDate)
          : new Date(b.eventDate) - new Date(a.eventDate);
      }
      return 0; // Varsayılan sıralama
    });

  useEffect(() => {
    dispatch(fetchLeaderClubsByUserID(user.uid));
    dispatch(fetchEventsByLeaderID(user.uid));
  }, [dispatch, user.uid]);

  useEffect(() => {
    autoAnimate(document.querySelector('.event-list'), { duration: 300 });
  }, [events]);

  return (
    <>
      {isOpen && <CreateEvent clubs={clubs} setIsOpen={setIsOpen} />}

      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Etkinlikler</h1>
          <button
            className="p-2 text-lg font-semibold bg-primary rounded-lg text-white hover:bg-primary-hover"
            onClick={() => setIsOpen(true)}
          >
            Etkinlik Oluştur
          </button>
        </div>
        <hr />
        <div className="grid grid-cols-5 gap-3 bg-neutral-100 p-3 rounded-lg shadow font-semibold">
          <input
            type="text"
            placeholder="Etkinlik, Kulüp Adına Göre Ara"
            className="col-span-3 p-2 rounded-lg shadow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="col-span-1 p-2 rounded-lg shadow"
            value={selectClub}
            onChange={(e) => setSelectClub(e.target.value)}
          >
            <option value="">Tüm Kulüpler</option>
            {clubs?.map((club) => (
              <option key={club.id} value={club.clubName}>
                {club.clubName}
              </option>
            ))}
          </select>
          <select
            className="col-span-1 p-2 rounded-lg shadow"
            value={selectStatus}
            onChange={(e) => setSelectStatus(e.target.value)}
          >
            <option value="">Tüm Durumlar</option>
            <option value="success">Tamamlanmış</option>
            <option value="failed">İptal Edilmiş</option>
            <option value="pending">Planlanmış</option>
          </select>
        </div>
        <div className="grid grid-cols-8 gap-3 bg-neutral-100 p-3 place-items-center rounded-lg shadow font-semibold">
          <span
            onClick={() => toggleSortOrder('eventName')}
            className="cursor-pointer flex items-center gap-x-3 justify-self-start "
          >
            Etkinlik Adı
            {
              sortBy === 'eventName' ? (
                sortOrder === 'asc' ? (
                  <FaSortAlphaDown size={20} />
                ) : (
                  <FaSortAlphaDownAlt size={20} />
                )
              ) : (
                <FaSortAlphaDown size={20} />
              )
            }
          </span>
          <span
            onClick={() => toggleSortOrder('eventDate')}
            className="cursor-pointer flex items-center gap-x-3 justify-self-start "
          >
            Etkinlik Tarihi
            {sortBy === 'eventDate' ? (
              sortOrder === 'asc' ? (
                <FaSortAlphaDown size={20} />
              ) : (
                <FaSortAlphaDownAlt size={20} />
              )
            ) : (
              <FaSortAlphaDown size={20} />
            )}
          </span>
          <span className="justify-self-center">Etkinlik Afişi</span>
          <span className="justify-self-center">Etkinlik Konumu</span>
          <span className="justify-self-center">Kulüp Adı</span>
          <span className="justify-self-center">Katılımcı Sayısı</span>
          <span className="justify-self-end">Etkinlik Durumu</span>
          <span className="justify-self-end">İşlemler</span>
        </div>
        <div className="event-list grid gap-3">
          {filteredEvents?.map((event) => (
            <LeaderEventBox event={event} key={event.id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LeaderEvents;
