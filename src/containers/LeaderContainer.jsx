import React from 'react'

const LeaderContainer = ({children}) => {
  return (
    <div className='flex flex-row items-start justify-start min-h-screen'>{children}</div>
  )
}

export default LeaderContainer