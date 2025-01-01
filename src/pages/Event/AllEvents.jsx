import React, { useEffect } from 'react'
import EventCard from '../../components/Events/EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActiveEvents } from '../../redux/slices/eventSlice'

const AllEvents = () => {

  const dispatch = useDispatch()
  const { events } = useSelector((state) => state.event)

  useEffect(() => {
    dispatch(fetchActiveEvents())
  }, [dispatch])


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 '>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

    </div>
  )
}

export default AllEvents