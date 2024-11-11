import React from 'react'

const AdminContainer = ({children}) => {
  return (
    <div className='flex flex-row items-start justify-start min-h-screen'>{children}</div>
  )
}

export default AdminContainer