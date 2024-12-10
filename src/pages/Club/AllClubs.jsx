import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClubs } from '../../redux/slices/clubSlice';
import ClubCard from '../../components/Clubs/ClubCard';

const AllClubs = () => {
  const dispatch = useDispatch();

  const { clubs } = useSelector((state) => state.club)


  useEffect(() => {
    dispatch(fetchClubs())
  }, [dispatch])


  return (
    <div className="min-h-screen">
      <div className='grid grid-cols-1 gap-3   md:grid-cols-2 lg:grid-cols-3'>
        {
          clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))
        }
      </div>
    </div>
  )
}

export default AllClubs