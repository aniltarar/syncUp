import React from 'react'
import { Link } from 'react-router-dom'

const MyClubBox = ({ club }) => {
    const { clubName, clubLogo, clubDescription, } = club
    return (
        <div className='flex flex-col border rounded-md '>
            <img src={clubLogo} className='w-full h-40 object-cover border-b-2 rounded-t-md' alt={`${clubName} kulübünün logosu`} />
            <div className='p-3 w-full'>
                <h1 className='text-xl font-semibold'>{clubName}</h1>
                <p>{clubDescription.slice(0,120)}...</p>
            </div>
            <div className='flex justify-center mt-auto bg-primary hover:bg-primary-hover'>
                <Link to={`/clubs/${club.id}`} className=' px-4 py-1 w-full text-center text-white'>Detaylara git</Link>
            </div>


        </div>
    )
}

export default MyClubBox