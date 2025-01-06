import React from 'react'

const PopulerClubBox = ({club}) => {
    
  return (
    <div className='flex w-full bg-white rounded-lg p-5 items-center justify-between'>
        <span>{club.clubName}</span>
        <span>{club.members.length} Üye</span>
    </div>
  )
}

export default PopulerClubBox