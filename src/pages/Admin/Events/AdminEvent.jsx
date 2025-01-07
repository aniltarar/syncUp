import React, { useEffect, useRef, useState } from 'react'
import { useAccount } from '../../../hooks/useAccount'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../../redux/slices/adminSlice'
import EventBox from '../../../components/Admin/Events/EventBox'
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa'
import autoAnimate from '@formkit/auto-animate'

const AdminEvent = () => {
  const user = useAccount()
  const dispatch = useDispatch()
  const { events } = useSelector((state) => state.admin)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortType, setSortType] = useState('eventName')
  const [selectedClub, setSelectedClub] = useState('all')


  const filteredEvents = events?.filter((event) => {
    const matchSearch = event.eventName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = status === 'all' || event.status === status
    const matchClub = selectedClub === 'all' || event.clubName === selectedClub
    return matchSearch && matchStatus && matchClub
  })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleSort = (type) => {
    setSortType(type);
    toggleSortOrder();
  };

  const sortedEvents = filteredEvents?.sort((a, b) => {
    if (sortType === 'eventDate') {
      const dateA = new Date(a[sortType]);
      const dateB = new Date(b[sortType]);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc'
        ? a[sortType].localeCompare(b[sortType])
        : b[sortType].localeCompare(a[sortType]);
    }
  });

  const eventsContainerRef = useRef(null)

  useEffect(() => {
    if (eventsContainerRef.current) {
      autoAnimate(eventsContainerRef.current, { duration: 300 });
    }
  }, [eventsContainerRef])

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  return (
    <div className='flex flex-col gap-y-3' >
      <div className="w-full bg-neutral-100 p-3 rounded-lg">
        <h1 className='text-2xl'>
          Hoş Geldiniz, <span className='text-primary font-semibold'>{user?.displayName}</span>
        </h1>
        <p>
          Etkinlikler ile ilgili detayları buradan görebilirsiniz. Gerekli işlemleri yapabilirsiniz.
        </p>
      </div>
      <div className='grid grid-cols-5 bg-neutral-100 p-3 rounded-lg gap-x-3'>
        <input
          type="text"
          placeholder="Etkinlik Adı Ara"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-3 p-2 border rounded"
        />
        <select
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
          className="col-span-1 p-2 border rounded"
        >
          <option value="all">Tüm Kulüpler</option>
          {/* Benzersiz kulüp isimlerini filtrele ve ekle */}
          {[...new Set(events?.map((event) => event.clubName))].map((clubName, index) => (
            <option key={index} value={clubName}>
              {clubName}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="col-span-1 p-2 border rounded"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Planlanıyor</option>
          <option value="finished">Tamamlanmış</option>
          <option value="failed">İptal Edilmiş</option>
        </select>



      </div>

      <div className="grid grid-cols-5 gap-3 bg-neutral-100 p-3 ">
        <span
          className="cursor-pointer flex items-center gap-x-2 font-semibold"
          onClick={() => handleSort('eventName')}
        >
          Etkinlik Adı
          {sortType === 'eventName' ? (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />) : <FaSortAlphaDown />}
        </span>

        <span
          className="cursor-pointer flex items-center gap-x-2 font-semibold justify-self-center"
          onClick={() => handleSort('eventDate')}
        >
          Tarih
          {
            sortType === 'eventDate' ? (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />) : <FaSortAlphaDown />
          }
        </span>
        <span className='font-semibold justify-self-center'>Yer</span>
        <span className='font-semibold justify-self-center'>Kulüp</span>
        <span className='font-semibold justify-self-center'>Durum</span>
      </div>

      <div className='flex flex-col gap-y-3' ref={eventsContainerRef}>

        {sortedEvents?.map((event) => (
          <EventBox key={event.id} event={event} />
        ))}
      </div>



    </div>
  )
}

export default AdminEvent