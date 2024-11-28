import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminContainer from '../containers/AdminContainer'
import AdminSideBar from '../components/Admin/AdminSidebar/AdminSideBar'

const AdminLayout = () => {
    return (
        <AdminContainer>
            <AdminSideBar />
            <div className='w-full min-h-screen bg-neutral-200'>
                <Outlet />
            </div>

        </AdminContainer>
    )
}

export default AdminLayout