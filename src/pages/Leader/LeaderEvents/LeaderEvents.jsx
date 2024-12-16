import React, { useEffect, useRef, useState } from 'react';
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
  const { clubs, events } = useSelector((state) => state.leader);

  const [search, setSearch] = useState('');
  const [selectClub, setSelectClub] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // A-Z veya Z-A sıralama
  const [isOpen, setIsOpen] = useState(false);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const eventBoxRef = useRef(null);


  // **Filtreleme ve Sıralama**
  const filteredEvents = events
    ?.filter((event) => {
      // Search filtresi
      const matchesSearch = event.eventName
        .toLowerCase()
        .includes(search.toLowerCase())|| event.clubName.toLowerCase().includes(search.toLowerCase());

      // Kulüp filtresi
      const matchesClub = selectClub
        ? event.clubName === selectClub
        : true;

      // Durum filtresi
      const matchesStatus = selectStatus
        ? event.status === selectStatus
        : true;

      return matchesSearch && matchesClub && matchesStatus;
    })
    ?.sort((a, b) => {
      // A-Z veya Z-A sıralama
      const comparison = a.eventName.localeCompare(b.eventName);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    useEffect(() => {
      dispatch(fetchLeaderClubsByUserID(user.uid));
      dispatch(fetchEventsByLeaderID(user.uid));
    }, [dispatch, user.uid]);

    useEffect(() => {
      autoAnimate(eventBoxRef.current, { duration: 300 });
    }, [events]);
  

  return (
    <>
      {isOpen && <CreateEvent clubs={clubs} setIsOpen={setIsOpen} />}

      <div ref={eventBoxRef} className="flex flex-col gap-y-3">
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
        <div className="grid grid-cols-6 gap-3 bg-neutral-100 p-3 place-items-center rounded-lg shadow font-semibold">
          <span
            onClick={toggleSortOrder}
            className={`cursor-pointer flex items-center gap-x-3 justify-self-start`}
          >
            Etkinlik Adı{' '}
            {sortOrder === 'asc' ? (
              <FaSortAlphaDown size={20} />
            ) : (
              <FaSortAlphaDownAlt size={20} />
            )}
          </span>
          <span className="justify-self-start">Etkinlik Afişi</span>
          <span className="justify-self-start">Etkinlik Tarihi</span>
          <span className="justify-self-start">Etkinlik Konumu</span>
          <span className="justify-self-start">Kulüp Adı</span>
          <span className="justify-self-start">Etkinlik Durumu</span>
        </div>

        {filteredEvents?.map((event) => (
          <LeaderEventBox event={event} key={event.id} />
        ))}
      </div>
    </>
  );
};

export default LeaderEvents;
