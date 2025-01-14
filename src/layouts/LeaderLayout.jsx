import React from 'react'
import LeaderContainer from '../containers/LeaderContainer'
import LeaderSidebar from '../components/Leader/LeaderSidebar'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'



const LeaderLayout = () => {

  return (
    <LeaderContainer>
      <LeaderSidebar />
      <div className="w-full min-h-screen bg-white p-5"> {/* className düzeltildi */}
        <Toaster position="top-right" />
        <Outlet />
      </div>
    </LeaderContainer>
  )
}

export default LeaderLayout
