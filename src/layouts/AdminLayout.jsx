import React from 'react'
import Container from '../containers/Container'
import { Outlet } from 'react-router-dom'
import AdminContainer from '../containers/AdminContainer'
import AdminSideBar from '../components/Admin/AdminSidebar/AdminSideBar'

const AdminLayout = () => {
    return (
        <AdminContainer>
            <AdminSideBar />
            <Outlet />
        </AdminContainer>
    )
}

export default AdminLayout