import React, { useEffect } from 'react'
import EventCard from '../../components/Events/EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActiveEvents } from '../../redux/slices/eventSlice'
import LoaderSpinner from '../../components/Loaders/LoaderSpinner'

const AllEvents = () => {

  const dispatch = useDispatch()
  const { events,status } = useSelector((state) => state.event)

  useEffect(() => {
    dispatch(fetchActiveEvents())
  }, [dispatch])

  if (status === 'loading') {
    return <LoaderSpinner />
  }


  return (
    <div className='flex flex-col gap-y-3 w-full'>

      {
        events.length === 0 &&
        <div className='w-full bg-red-100 rounded-md p-3'>

          <p className='text-center w-full text-2xl font-semibold text-red-500'>Henüz planlama aşamasında etkinlik bulunamıyor.</p>
        </div>
      }
      

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>

        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

    </div>
  )
}

export default AllEvents