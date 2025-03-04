import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from '../../redux/slices/announcementSlice';
import AnnouncementBox from '../../components/Announcements/AnnouncementBox';
import autoAnimate from '@formkit/auto-animate';
import LoaderSpinner from '../../components/Loaders/LoaderSpinner';

const Announcement = () => {
  const dispatch = useDispatch();
  const { announcements, status } = useSelector((state) => state.announcement);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // Varsayılan sıralama "En Yeni"




  // Filtreleme
  const filteredAnnouncements = announcements?.filter((announcement) =>
    announcement.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sıralama
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate()); // En yeni önce
    } else {
      return new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate()); // En eski önce
    }
  });

  const announcementBoxRef = useRef(null);


  useEffect(() => {
    if (announcementBoxRef.current) {
      autoAnimate(announcementBoxRef.current);
    }
  }, [announcementBoxRef]);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  if (status === 'loading') {
    return <LoaderSpinner />;
  }




  return (
    <div className="flex flex-col gap-y-3 mb-3 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Duyuru ara"
          className="border col-span-3 p-2 rounded-md"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="newest">En Yeni</option>
          <option value="oldest">En Eski</option>
        </select>
      </div>
      {
        sortedAnnouncements.length === 0 && (
          <div className="bg-neutral-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-2">Duyuru Bulunamadı</h3>
            <p className="text-md text-center">Henüz duyuru yayınlanmamış ya da aradığınız kriterlere uygun duyuru bulunamadı.</p>
          </div>
        )
      }

      <div ref={announcementBoxRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {sortedAnnouncements?.map((announcement) => (
          <AnnouncementBox key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  );
};

export default Announcement;
