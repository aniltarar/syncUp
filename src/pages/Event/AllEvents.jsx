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
        <div className="bg-neutral-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-2">Etkinlik Bulunamadı</h3>
            <p className="text-md text-center">Henüz etkinlik yayınlanmamış ya da aradığınız kriterlere uygun etkinlik bulunamadı.</p>
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