import React, { useEffect, useRef, useState } from 'react'
import { useAccount } from '../../hooks/useAccount'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventByUserID, resetEvents } from '../../redux/slices/eventSlice'
import PassedEventBox from '../../components/Events/PassedEventBox'
import autoAnimate from '@formkit/auto-animate'

const PassedEvents = () => {
  const user = useAccount()
  const dispatch = useDispatch()

  const { events } = useSelector(state => state.event)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [sortDate, setSortDate] = useState('newest')


  const filteredEvents = events.filter(event => {
    return event.eventName.toLowerCase().includes(search.toLowerCase())
  }).filter(event => {
    return event.status.includes(status)
  }).sort((a, b) => {
    if (sortDate === 'newest') {
      return new Date(b.eventDate) - new Date(a.eventDate)
    } else if (sortDate === 'oldest') {
      return new Date(a.eventDate) - new Date(b.eventDate)
    } else {
      return 0
    }
  })

  const eventBoxRef = useRef(null)
  useEffect(() => {
    autoAnimate(eventBoxRef.current)
  }, [filteredEvents])



  useEffect(() => {
    dispatch(resetEvents())
    dispatch(fetchEventByUserID(user.uid))
  }, [dispatch])
  return (
    <div className='flex flex-col gap-y-3 w-full'>
      <div className='w-full grid grid-cols-5 gap-x-2'>
        <input type="text" placeholder="Etkinlik Ara" className="col-span-3 p-2 border border-gray-300 rounded" onChange={(e) => setSearch(e.target.value)} />
        <select className="col-span-1 p-2 border border-gray-300 rounded " onChange={(e) => setStatus(e.target.value)}>
          <option value="">Tümü</option>
          <option value="pending">Planlanıyor</option>
          <option value="failed">İptal Edilmiş</option>
          <option value="finished">Tamamlanmış</option>
        </select>
        <select className="col-span-1 p-2 border border-gray-300 rounded " onChange={(e) => setSortDate(e.target.value)}>
          <option value="newest">Yeniden Eskiye</option>
          <option value="oldest">Eskiden Yeniye</option>
        </select>
      </div>
      <div ref={eventBoxRef} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {filteredEvents.map(event => (
          <PassedEventBox key={event.id} event={event} />
        ))}
      </div>
      

    </div>
  )
}

export default PassedEvents