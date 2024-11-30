import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminContainer from '../containers/AdminContainer'
import AdminSideBar from '../components/Admin/AdminSidebar/AdminSideBar'
import { Toaster } from 'react-hot-toast'

const AdminLayout = () => {
    return (
        <AdminContainer>
            <AdminSideBar />
            <div className='w-full min-h-screen bg-white'>
                <Toaster position='top-right' />
                <Outlet />
            </div>

        </AdminContainer>
    )
}

export default AdminLayout