import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements } from '../../../redux/slices/adminSlice';
import AdminAnnouncementBox from '../../../components/Admin/AdminAnnouncement/AdminAnnouncementBox';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import autoAnimate from '@formkit/auto-animate';
import AdminCreateAnnouncementModal from '../../../components/Modals/AdminCreateAnnouncementModal';

const AdminAnnouncement = () => {
  const dispatch = useDispatch();
  const { announcements } = useSelector((state) => state.admin);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortType, setSortType] = useState('title'); // Varsayılan sıralama: Başlık
  const [selectedClub, setSelectedClub] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const announcementsContainerRef = useRef(null);

  useEffect(() => {
    if (announcementsContainerRef.current) {
      autoAnimate(announcementsContainerRef.current, { duration: 300 });
    }
  }, [announcementsContainerRef]);

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  const filteredAnnouncements = announcements?.filter((announcement) => {
    const matchSearch =
      announcement.title.toLowerCase().includes(search.toLowerCase()) ||
      announcement.content.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === 'all' || announcement.status === status;
    const matchClub = selectedClub === 'all' || announcement.publisher === selectedClub;
    return matchSearch && matchStatus && matchClub;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSort = (type) => {
    setSortType(type);
    toggleSortOrder();
  };

  const sortedAnnouncements = filteredAnnouncements?.sort((a, b) => {
    if (sortType === 'createdDate') {
      const dateA = new Date(a.createdAt.toDate());
      const dateB = new Date(b.createdAt.toDate());
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc'
        ? a[sortType].localeCompare(b[sortType])
        : b[sortType].localeCompare(a[sortType]);
    }
  });

  return (
    <>
    {
      isOpen && <AdminCreateAnnouncementModal setIsOpen={setIsOpen} />
    }

      <div className="flex flex-col gap-y-3">
        <div className="w-full flex justify-between items-center bg-neutral-100 p-3 rounded-lg">
          <div>
            <h1 className="font-semibold text-2xl">Duyurular</h1>
            <p className="text-sm">
              Kulüplerin yayınladığı duyuruları buradan görüntüleyebilir, yayına alabilir veya yayından kaldırabilirsiniz.
              SyncUp yönetimi olarak kullanıcılarınız için yeni duyurular yayına alabilirsiniz.
            </p>
          </div>
          <div className='flex items-center '>
            <button onClick={()=>setIsOpen(true)} className='px-4 py-1 bg-primary rounded-md text-lg text-white hover:bg-primary-hover'>Duyuru Oluştur</button>
          </div>
        </div>

        <div className="grid grid-cols-5 bg-neutral-100 p-3 rounded-lg gap-x-3">
          <input
            type="text"
            placeholder="Duyuru ara"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-span-3 p-2 rounded-sm"
          />

          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="p-2 rounded-sm col-span-1"
          >
            <option value="all">Yayınlayanı Seç</option>
            {[...new Set(announcements?.map((announcement) => announcement?.publisher))].map((publisher, index) => (
              <option key={index} value={publisher}>
                {publisher}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 rounded-sm col-span-1"
          >
            <option value="all">Yayın Durumu Seç</option>
            <option value="active">Aktif Duyurular</option>
            <option value="passive">Pasif Duyurular</option>
          </select>
        </div>

        <div className="grid grid-cols-5 bg-neutral-100 p-3 rounded-lg gap-x-3">
          <span
            className="cursor-pointer flex items-center gap-x-2 font-semibold"
            onClick={() => handleSort('title')}
          >
            Duyuru Adı
            {sortType === 'title' ? (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />) : <FaSortAlphaDown />}
          </span>

          <span
            className="cursor-pointer flex items-center gap-x-2 font-semibold justify-self-start"
            onClick={() => handleSort('createdDate')}
          >
            Tarih
            {sortType === 'createdDate' ? (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />) : <FaSortAlphaDown />}
          </span>

          <span className="font-semibold justify-self-center">Görsel</span>
          <span className="font-semibold justify-self-center">Kulüp Adı</span>
          <span className="font-semibold justify-self-center">Yayın Durumu</span>
        </div>

        <div className="flex flex-col gap-y-3" ref={announcementsContainerRef}>
          {sortedAnnouncements?.map((announcement) => (
            <AdminAnnouncementBox key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminAnnouncement;
