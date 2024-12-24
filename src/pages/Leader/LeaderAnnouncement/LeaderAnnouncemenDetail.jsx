import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeaderCreateAnnouncement from '../../../components/Modals/LeaderCreateAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncementsByClubID, fetchClubByClubID, resetAnnouncements, resetCurrentClub } from '../../../redux/slices/leaderSlice';
import LeaderAnnouncementBox from '../../../components/Leader/LeaderAnnouncementBox';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import autoAnimate from '@formkit/auto-animate';

const LeaderAnnouncementDetail = () => {
  const { clubID } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Varsayılan sıralama yönü (A-Z)
  const [sortBy, setSortBy] = useState('title'); // Varsayılan sıralama alanı
  const [sortField, setSortField] = useState('');

  const dispatch = useDispatch();
  const { currentClub, announcements } = useSelector((state) => state.leader);

  const announceRefBox = useRef(null);

  const toggleSortOrder = (field) => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc'); // Yeni alan seçildiğinde varsayılan olarak A-Z başlatılır
    }
  };

  const filteredAnnouncements = announcements
    ?.filter((announcement) => {
      return announcement.title.toLocaleLowerCase('tr').includes(search.trim().toLocaleLowerCase('tr'));
    })
    ?.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title, 'tr')
          : b.title.localeCompare(a.title, 'tr');
      } else if (sortBy === 'createdAt') {
        return sortOrder === 'asc'
          ? new Date(a.createdAt.seconds * 1000) - new Date(b.createdAt.seconds * 1000)
          : new Date(b.createdAt.seconds * 1000) - new Date(a.createdAt.seconds * 1000);
      }
      return 0;
    })
    ?.filter((announcement) => {
      if (sortField === 'active') {
        return announcement.status === 'active';
      } else if (sortField === 'passive') {
        return announcement.status === 'passive';
      }
      return true;
    });

  useEffect(() => {
    dispatch(resetCurrentClub());
    dispatch(resetAnnouncements());
    dispatch(fetchClubByClubID(clubID));
    dispatch(fetchAnnouncementsByClubID(clubID));
  }, [clubID, dispatch]);

  useEffect(() => {
    autoAnimate(announceRefBox.current, {
      duration: 300,
    });
  }, [filteredAnnouncements]);

  return (
    <>
      {isOpen && <LeaderCreateAnnouncement setIsOpen={setIsOpen} club={currentClub} />}

      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Duyurular</h1>
          <button
            className="p-2 text-lg font-semibold bg-primary rounded-lg text-white hover:bg-primary-hover"
            onClick={() => setIsOpen(true)}
          >
            Duyuru Oluştur
          </button>
        </div>
        <hr />
        <div className="grid grid-cols-5 gap-3 bg-neutral-100 p-3 rounded-lg shadow font-semibold">
          <input
            type="text"
            placeholder="Duyuru Başlığına Göre Ara"
            className="col-span-4 p-2 rounded-lg shadow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="col-span-1 p-2 rounded-lg shadow"
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="">Tümü</option>
            <option value="active">Aktif</option>
            <option value="passive">Pasif</option>
          </select>
        </div>
        <div className="grid grid-cols-6 gap-3 bg-neutral-100 p-3 place-items-center rounded-lg shadow font-semibold">
          <span
            onClick={() => toggleSortOrder('title')}
            className="cursor-pointer flex items-center gap-x-3 justify-self-start"
          >
            Duyuru Başlığı
            {sortBy === 'title' ? (
              sortOrder === 'asc' ? (
                <FaSortAlphaDown size={20} />
              ) : (
                <FaSortAlphaDownAlt size={20} />
              )
            ) : (
              <FaSortAlphaDownAlt size={20} />
            )}
          </span>
          <span
            onClick={() => toggleSortOrder('createdAt')}
            className="cursor-pointer flex items-center gap-x-3 justify-self-center"
          >
            Yayın Tarihi
            {sortBy === 'createdAt' ? (
              sortOrder === 'asc' ? (
                <FaSortAlphaDown size={20} />
              ) : (
                <FaSortAlphaDownAlt size={20} />
              )
            ) : (
              <FaSortAlphaDownAlt size={20} />
            )}
          </span>
          <span className="justify-self-center">Görsel</span>
          <span className="justify-self-center">Kulüp Adı</span>
          <span className="justify-self-center">Durum</span>
          <span className="justify-self-center">İşlemler</span>
        </div>
        <div ref={announceRefBox} className="grid gap-3">
          {filteredAnnouncements?.map((announcement) => (
            <LeaderAnnouncementBox key={announcement.id} announcement={announcement} />
          ))}
          {filteredAnnouncements?.length === 0 && (
            <div className="bg-neutral-100 p-3 rounded-lg shadow font-semibold">
              <h1 className="text-2xl text-center">Duyuru Bulunamadı</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaderAnnouncementDetail;
